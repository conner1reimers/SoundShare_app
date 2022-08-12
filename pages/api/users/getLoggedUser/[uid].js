import nc from "next-connect";
import db from '../../../../server/util/queries'
import HttpError from "../../../../server/models/http-error";

const handler = nc()
  .get(async (req, res, next) => {
    const userId = req.query.uid;
  let client;
  try {
    client = await db.connect();
  } catch (err) {
    const error = HttpError("errrrr", 500, res);
    return next(error);
  }

  const getUserQ = {
    name: "get-user-logged",
    text: "SELECT * FROM users WHERE id = $1",
    values: [userId],
  };

  let gotUser;
  let notifications;
  try {
    gotUser = await client.query(getUserQ);
    const notificationQueryText = "select n.target_user_id, n.target_id, n.user_id, n.extra_data, n.date, n.type, n.checked, s.name, s.img_path, s.id as sound_id, \
      u.username, u.user_img_path from notifications n inner join sounds s on s.id = n.target_id inner join users u on u.id = n.user_id \
      WHERE n.target_user_id = $1 ORDER BY n.date DESC LIMIT 6";
    const notificationQueryVals = [userId];


    notifications = await client.query(notificationQueryText, notificationQueryVals);
  } catch (err) {
    return next(err);
  } finally {
    client.release();
  }

  res
    .status(200)
    .json({ gotUser: gotUser.rows, notifications: notifications.rows });
  })
export default handler;

