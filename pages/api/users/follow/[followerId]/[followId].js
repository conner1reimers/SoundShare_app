import nc from "next-connect";
import db from '../../../../../server/util/queries'
import HttpError from "../../../../../server/models/http-error";
import checkAuth from "../../../../../server/middleware/check-auth";


const handler = nc()
  .use(checkAuth)
  .post(async (req, res, next) => {
    const { followerId, followId } = req.query;
  let client;

  const decoded = req.userData;

  if (decoded.userId !== followerId) {
    const error = HttpError(
      "You are not authorized",
      401, res
    );
    return next(error);
  }

  if (followerId === followId) {
    const error = HttpError('You can not follow yourself!', 401, res);
    return next(error);
  }

  try {
    client = await db.connect();
  } catch (err) {
    const error = HttpError("errrrr", 500, res);
    return next(error);
  }

  const date = new Date();
  const followQuery = {
    name: "insert-follows",
    text:
      "INSERT INTO followers (follow_date, follower, following) VALUES ($1, $2, $3)",
    values: [date, followerId, followId],
  };
  

  let follows;
  let follows2;
  let follows3;

  try {
    await client.query("BEGIN");

    follows = await client.query(followQuery);

    const mainUserQuery = {
      name: "insert-follows-mainUser",
      text:
        "UPDATE users set following = array_append(following, $1) where id = $2 RETURNING username",
      values: [followId, followerId],
    };
    follows2 = await client.query(mainUserQuery);

    const followedUserQuery = {
      name: "insert-follows-followedUser",
      text:
        "UPDATE users set followers = array_append(followers, $1) where id = $2",
      values: [followerId, followId],
    };
    follows3 = await client.query(followedUserQuery);
    let insertAction =
      "INSERT INTO actions (user_id, target_id, type, date) VALUES ($1, $2, $3, $4)";
    const insertActionVals = [followerId, followId, "follow", date];
    await client.query(insertAction, insertActionVals);

    let insertNotif =
      "INSERT INTO notifications (user_id, target_id, target_user_id, type, date, username) VALUES ($1, $2, $3, $4, $5, $6)";
    const insertNotifVals = [
      followerId,
      followId,
      followId,
      "follow",
      date,
      follows2.rows[0].username,
    ];
    await client.query(insertNotif, insertNotifVals);

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    return next(err);
  } finally {
    client.release();
  }

  res.status(200).json({ msg: "Followed" });
  })
export default handler;

