import nc from "next-connect";
import db from '../../../../../server/util/queries'
import HttpError from "../../../../../server/models/http-error";

const handler = nc()
  .get(async (req, res, next) => {
    const userId = req.query.uid;
  const following = req.query.following.split(",");

  let client;
  try {
    client = await db.connect();
  } catch (err) {
    const error = HttpError("errrrr", 500, res);
    return next(error);
  }

  const getFeedQuery = {
    name: "get-feed",
    text: "SELECT * FROM actions WHERE user_id = any ($1) ORDER BY date DESC",
    values: [following],
  };
  const getFeedDataQuery = {
    name: "get-feed-data",
    text:
      "select distinct s.id, s.img_path, s.reposts, s.favs, s.name, s.downloads, s.path, s.username, s.description, s.creator_id as sound_creator_id, s.date_time, \
            s.type, c.sound_id, c.message, c.creator_id, c.id as com_id from sounds s \
            full outer join comments c on c.sound_id = s.id \
            where s.id = any(SELECT target_id FROM actions WHERE user_id = any ($1) and type != 'follow') \
            or c.id = any(SELECT second_target_id FROM actions WHERE user_id = any ($1) and type = 'comments') ORDER BY s.date_time DESC",

    values: [following],
  };
  const getRepostIds = {
    name: "get-repost-data",
    text: "select * from reposts where user_id = any($1)",

    values: [following],
  };
  const getFeedDataFollowsQuery = {
    name: "get-feed-data-follows",
    text:
      "select distinct * from users u where id = any(SELECT target_id FROM actions WHERE user_id = any ($1) and type = 'follow') or id = any($1);",
    values: [following],
  };
  let gotFeed;
  let gotFeedData;
  let gotFeedDataFollowers;
  let repostData;
  try {
    gotFeed = await client.query(getFeedQuery);
    gotFeedData = await client.query(getFeedDataQuery);
    repostData = await client.query(getRepostIds);
    gotFeedDataFollowers = await client.query(getFeedDataFollowsQuery);
  } catch (err) {
    return next(err);
  } finally {
    client.release();
  }
  res.status(200).json({
    actions: gotFeed.rows,
    soundData: gotFeedData.rows,
    userData: gotFeedDataFollowers.rows,
    repostData: repostData.rows,
  });
  })
export default handler;

