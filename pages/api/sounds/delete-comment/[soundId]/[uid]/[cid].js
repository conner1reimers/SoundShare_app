import nc from "next-connect";
import db from '../../../../../../server/util/queries'
import HttpError from "../../../../../../server/models/http-error";
import checkAuth from "../../../../../../server/middleware/check-auth";


const handler = nc()
  .use(checkAuth)
  .delete(async (req, res, next) => {
    
    const commentId = req.query.cid;
  const userId = req.query.uid;
  const soundId = req.query.soundId;
  const decoded = req.userData;

  if (decoded.userId !== userId) {
    const error = HttpError(
      "You are not authorized",
      401, res
    );
    return next(error);
  }

  let client;

  try {
    client = await db.connect();
  } catch (err) {
    const error = HttpError("errrrr", 500);

    return next(error);
  }



  let foundComment;

    const deleteCommentText =
      "DELETE FROM comments WHERE id = $1";
    const deleteCommentVals = [commentId]

    const removeUserComText =
      "UPDATE users SET comments = array_remove(comments ,$1) WHERE id = $2";
    const removeUserComVals = [commentId, userId];

    const removeSoundCommentText =
      "UPDATE sounds SET comments = array_remove(comments, $1) WHERE id = $2";
    const removeSoundCommentVals = [commentId, soundId];

    const deleteAction =
      "DELETE FROM actions WHERE user_id = $1 AND type = $2 AND second_target_id = $3";
    const deleteActionActionVals = [userId, "comments", commentId];

    const deleteNotification =
      "DELETE FROM notifications WHERE user_id = $1 AND type = $2 AND second_target_id = $3";
    const deleteNotificationActionVals = [userId, "comments", commentId];

    try {

        await client.query("BEGIN");
        await client.query(deleteCommentText, deleteCommentVals);
        await client.query(removeUserComText, removeUserComVals);
        await client.query(removeSoundCommentText, removeSoundCommentVals);
        await client.query(deleteAction, deleteActionActionVals);
        await client.query(deleteNotification, deleteNotificationActionVals);
        await client.query("COMMIT");
        res.status(200).json({ msg: "comment-deleted" });
    } catch (err) {
      const error = HttpError(err, 500);
      await client.query("ROLLBACK");
      return next(error);
    } finally {
      client.release();
    }

  })
export default handler;


