import nc from "next-connect";
import db from '../../../../server/util/queries'
import HttpError from "../../../../server/models/http-error";


const handler = nc()
  .get(async (req, res, next) => {
    const followerIds = req.query.followerIds.split(",");

  let client;
  try {
    client = await db.connect();
  } catch (err) {
    const error = HttpError("errrrr", 500, res);
    return next(error);
  }

  const followersQuery = {
    name: "find-follows",
    text: "SELECT * FROM USERS WHERE id = any ($1)",
    values: [followerIds],
  };
  let followers;

  try {
    followers = await client.query(followersQuery);
  } catch (err) {
    return next(err);
  } finally {
    client.release();
  }

  res.status(200).json({ followers: followers.rows });
  })
export default handler;

