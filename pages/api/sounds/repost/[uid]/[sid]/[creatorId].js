import nc from "next-connect";
import db from '../../../../../../server/util/queries'
import HttpError from "../../../../../../server/models/http-error";
import checkAuth from "../../../../../../server/middleware/check-auth";


const handler = nc()
  .use(checkAuth)
  .post(async (req, res, next) => {
    const { uid, sid, creatorId } = req.query;
    const date = new Date();


  
    const decoded = req.userData;
  
    if (decoded.userId !== uid) {
      const error = HttpError(
        "You are not authorized",
        401, res
      );
      return next(error);
    }
  
    let alreadyReposted = false;
    let client;
    try {
      client = await db.connect();
    } catch (err) {
      const error = HttpError("errrrr", 500, res);
  
      return next(error);
    }
  
    let foundUser;
    let foundSound;
    try {
      let findSoundQuery = "SELECT * from sounds WHERE id = $1";
      let findUserQuery = "SELECT * from users WHERE id = $1";
      const soundValues = [sid];
      const userValues = [uid];
  
      foundUser = await client.query(findUserQuery, userValues);
      foundSound = await client.query(findSoundQuery, soundValues);
  
      if (
        !foundUser.rows[0] ||
        !foundUser.rows[0].email ||
        !foundUser.rows[0].id
      ) {

        const error = HttpError("ERR", 500, res);
        client.release();
        return next(error);
      } else if (!foundSound.rows[0] || !foundSound.rows[0].id) {

        const error = HttpError("ERR", 500, res);

        client.release();
        return next(error);
      }
  
      if (
        foundUser.rows[0].reposts.length &&
        foundUser.rows[0].reposts.indexOf(sid) !== -1
      ) {

        alreadyReposted = true;
      }
    } catch (err) {
      client.release();
      return next(err)
    }
  
    let endMsg = "none";
    try {
      await client.query("BEGIN");

  
      if (!alreadyReposted) {
        let response;
        let returned;
        let returned2;

        const queryRepostText =
          "INSERT INTO reposts (user_id, sound_id) VALUES ($1, $2)";
        const insertRepostText = [uid, sid];
        response = await client.query(queryRepostText, insertRepostText);
  
        const insertRepostToUserArray =
          "UPDATE users SET reposts = array_append(reposts, $1) WHERE id = $2";
        const insertRepostToUserArrayVals = [sid, uid];
        returned = await client.query(
          insertRepostToUserArray,
          insertRepostToUserArrayVals
        );

  
        const insertRepostToSoundArray =
          "UPDATE sounds SET reposts = array_append(reposts, $1) WHERE id = $2";
        const insertRepostToSoundArrayVals = [uid, sid];
        returned2 = await client.query(
          insertRepostToSoundArray,
          insertRepostToSoundArrayVals
        );
  
        if (creatorId !== uid) {
          let insertAction =
          "INSERT INTO actions (user_id, target_id, type, date) VALUES ($1, $2, $3, $4)";
          const insertActionVals = [uid, sid, "reposts", date];
          await client.query(insertAction, insertActionVals);
  
          let insertNotif =
            "INSERT INTO notifications (user_id, target_id, target_user_id, type, date, username) VALUES ($1, $2, $3, $4, $5, $6)";
          const insertNotifVals = [
            uid,
            sid,
            creatorId,
            "reposts",
            date,
            foundUser.rows[0].username,
          ];
          await client.query(insertNotif, insertNotifVals);
        }
        endMsg = "reposted";
      } else {
        let response;
        let returned;
        let returned2;

        const queryRepostText =
          "DELETE FROM reposts WHERE user_id = $1 AND sound_id = $2";
        const insertRepostText = [uid, sid];
  
        response = await client.query(queryRepostText, insertRepostText);
  
  
  
        const insertRepostToUserArray =
          "UPDATE users SET reposts = array_remove(reposts, $1) WHERE id = $2";
        const insertRepostToUserArrayVals = [sid, uid];
        returned = await client.query(
          insertRepostToUserArray,
          insertRepostToUserArrayVals
        );
  
        const insertRepostToSoundArray =
          "UPDATE sounds SET reposts = array_remove(reposts, $1) WHERE id = $2";
        const insertRepostToSoundArrayVals = [uid, sid];
        returned2 = await client.query(
          insertRepostToSoundArray,
          insertRepostToSoundArrayVals
        );
        if (creatorId !== uid) {
          let insertAction =
          "DELETE FROM actions WHERE user_id = $1 AND target_id = $2 AND type = $3";
          const insertActionVals = [uid, sid, "reposts"];
  
          await client.query(insertAction, insertActionVals);
        }
  
  
        endMsg = "removed";
      }
  
      await client.query("COMMIT");
    } catch (err) {

      const error = HttpError(err, 500, res);
      await client.query("ROLLBACK");
      return next(error);
    } finally {
      client.release();
    }
  
    res.status(200).json({ msg: endMsg });
  
})
export default handler;

  