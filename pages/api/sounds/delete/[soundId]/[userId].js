import nc from "next-connect";
import db from '../../../../../server/util/queries'
import HttpError from "../../../../../server/models/http-error";
import s3fileUpload from '../../../../../server/middleware/file-upload';
import checkAuth from "../../../../../server/middleware/check-auth";

const handler = nc()
  .use(checkAuth)
  .delete(async (req, res, next) => {
    
    let client;
    let soundId = req.query.soundId;
    let userId = req.query.userId;
  
    const decoded = req.userData;
  
  
    if ((decoded.userId !== userId) && !decoded.master) {
      const error = HttpError(
        "You are not authorized",
        401, res
      );
      return next(error);
    }
  
    let oldpath = req.body.path;
    let oldimg = req.body.imgpath;
  
  
    try {
      client = await db.connect();
    } catch (err) {
      const error = HttpError("errrrr", 500, res);
  
      return next(error);
    }
  
    const deleteSoundQuery = {
      text: "DELETE FROM sounds WHERE id = $1",
      values: [soundId],
    };
    const deleteSoundCommentsQuery =
      "DELETE FROM comments WHERE sound_id = $1 RETURNING id";
    const deleteSoundFavsQuery = "DELETE FROM favorites WHERE sound_id = $1";
    const deleteSoundRepostsQuery = "DELETE FROM reposts WHERE sound_id = $1";
  
    const deleteSoundActionsQuery = {
      text: "DELETE FROM actions WHERE target_id = $1 and type != $2",
      values: [soundId, "follow"],
    };
    const deleteSoundfromUserQuery = {
      text: "update users set sounds = array_remove(sounds, $1) where id = $2",
      values: [soundId, userId],
    };
    const deleteSoundfromUserFavsQuery =
      "update users set favs = array_remove(favs, $1) where $1 = any (favs)";
    const deleteSoundfromUserRepostsQuery =
      "update users set reposts = array_remove(reposts, $1) where $1 = any (reposts)";
    // const deleteSoundfromUserComsQuery = "update users set comments = array_remove(comments, (select array_agg(id) from comments where sound_id = $1)) where comments && any (select array_agg(id) from comments where sound_id = $1)";
  
    let deleteComment;
  
    try {
      await client.query("BEGIN");
  
  
      await client.query(
        deleteSoundfromUserQuery.text,
        deleteSoundfromUserQuery.values
      );
      await client.query(deleteSoundfromUserFavsQuery, deleteSoundQuery.values);
      await client.query(
        deleteSoundfromUserRepostsQuery,
        deleteSoundQuery.values
      );
      await client.query(
        deleteSoundActionsQuery.text,
        deleteSoundActionsQuery.values
      );
  
      await client.query(deleteSoundCommentsQuery, deleteSoundQuery.values);
      await client.query(deleteSoundFavsQuery, deleteSoundQuery.values);
      await client.query(deleteSoundRepostsQuery, deleteSoundQuery.values);
  
      // Final deletion of sound
      await client.query(deleteSoundQuery.text, deleteSoundQuery.values);
      await client.query(deleteSoundCommentsQuery, deleteSoundQuery.values);
  
      s3fileUpload.deleteFileFallback(oldpath, next);
  
      if (oldimg) {
        s3fileUpload.deleteFileFallback(oldimg, next);
  
      }
  
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      return next(err);
    } finally {
      client.release();
    }
  
    res.status(200).json({ msg: "DELETED" });

  })
export default handler;


