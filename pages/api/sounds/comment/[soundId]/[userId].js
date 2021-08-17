import nc from "next-connect";
import db from '../../../../../server/util/queries'
import HttpError from "../../../../../server/models/http-error";
import checkAuth from "../../../../../server/middleware/check-auth";


const handler = nc()
  .use(checkAuth)
  .post(async (req, res, next) => {
    
    let comment = req.body.comment;
    let { soundId, userId } = req.query;
    let soundComments;
    let userComments;
  
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
      const error = HttpError("errrrr", 500, res);
  
      return next(error);
    }
  
    let foundUser;
    let foundSound;
    try {
      let findSoundQuery = "SELECT * from sounds WHERE id = $1";
      let findUserQuery = "SELECT * from users WHERE id = $1";
      const soundValues = [soundId];
      const userValues = [userId];
  
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
      userComments = foundUser.rows[0].comments;
      soundComments = foundSound.rows[0].comments;
    } catch {}
  
    let response;
    let returned;
    let returned2;
  
  
    try {
      await client.query("BEGIN");
      const queryCommentText =
        "INSERT INTO comments (message, sound_id, creator_id) VALUES ($1, $2, $3) RETURNING id";
      const insertCommentText = [comment, soundId, userId];
  
      response = await client.query(queryCommentText, insertCommentText);
  
      const newComId = response.rows[0].id;
  
      const insertComToSoundArray =
        "UPDATE sounds SET comments = array_append(comments, $1) WHERE id = $2";
      const insertComToSoundArrayVals = [newComId, soundId];
      returned = await client.query(
        insertComToSoundArray,
        insertComToSoundArrayVals
      );
  
      const date = new Date();
  
      const insertComToUserArray =
        "UPDATE users SET comments = array_append(comments, $1) WHERE id = $2";
      const insertComToUserArrayVals = [newComId, userId];
      returned2 = await client.query(
        insertComToUserArray,
        insertComToUserArrayVals
      );
  
        const creatorId = foundSound.rows[0].creator_id.toString();
        const foundUsername = foundUser.rows[0].username;
        const foundUserImg = foundUser.rows[0].user_img_path;
        
  
        if (creatorId !== userId.toString()) {
          const insertAction =
          "INSERT INTO actions (user_id, target_id, type, date, second_target_id) VALUES ($1, $2, $3, $4, $5)";
          const insertActionVals = [userId, soundId, "comments", date, newComId];
          const insertNotif =
            "INSERT INTO notifications (user_id, target_user_id, target_id, type, date, username, extra_data, second_target_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
          const insertNotifVals = [
            userId,
            creatorId,
            soundId,
            "comments",
            date,
            foundUsername,
            comment,
            newComId
          ];
          await client.query(insertNotif, insertNotifVals);
          await client.query(insertAction, insertActionVals);
        } else {
        }
  
        const returnObj = {
          msg: "comment-success",
          comment: {
            com_id: newComId,
            comment_creator: userId,
            comment_date: date,
            message: comment,
            user_img_path: foundUserImg,
            username: foundUsername
          }
  
        }
  
        await client.query("COMMIT");
        res.status(200).json(returnObj);
      
    } catch (err) {
      const error = HttpError(err, 500, res);
      await client.query("ROLLBACK");
      return next(error);
    } finally {
      client.release();
    }

  })
export default handler;


