import nc from "next-connect";
import db from '../../../../../server/util/queries'
import HttpError from "../../../../../server/models/http-error";
import checkAuth from "../../../../../server/middleware/check-auth";


const handler = nc()
  .use(checkAuth)
  .delete(async (req, res, next) => {
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

  try {
    client = await db.connect();
  } catch (err) {
    const error = HttpError("errrrr", 500, res);
    return next(error);
  }
  const followQuery = {
    name: "delete-follows",
    text: "DELETE FROM followers WHERE follower = $1 and following = $2",
    values: [followerId, followId],
  };

  let follows;
  let follows2;
  let follows3;

  try {
    await client.query("BEGIN");

    follows = await client.query(followQuery);
    const mainUserQuery = {
      name: "delete-follows-mainUser",
      text:
        "UPDATE users set following = array_remove(following, $1) where id = $2",
      values: [followId, followerId],
    };
    follows2 = await client.query(mainUserQuery);

    const followedUserQuery = {
      name: "delete-follows-followedUser",
      text:
        "UPDATE users set followers = array_remove(followers, $1) where id = $2",
      values: [followerId, followId],
    };
    follows3 = await client.query(followedUserQuery);

    const deleteAction =
      "DELETE FROM actions WHERE user_id = $1 AND type = $2 AND target_id = $3";
    const deleteActionActionVals = [followerId, "follow", followId];
    await client.query(deleteAction, deleteActionActionVals);

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    return next(err);
  } finally {
    client.release();
  }

  res.status(200).json({ msg: "UNFollowed" });
  })
export default handler;

