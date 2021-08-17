import nc from "next-connect";
import db from '../../../../server/util/queries'
import HttpError from "../../../../server/models/http-error";
import checkAuth from "../../../../server/middleware/check-auth";


const handler = nc()
  .get(async (req, res, next) => {
    const uid = req.query.uid;

  const notificationQuery = {
    name: "fetch-notifications2",
    text:
      "select n.target_user_id, n.target_id, n.user_id, n.extra_data, n.date, n.type, n.checked, s.name, s.img_path, s.id as sound_id, \
    u.username, u.user_img_path from notifications n inner join sounds s on s.id = n.target_id inner join users u on u.id = n.user_id \
    WHERE n.target_user_id = $1 ORDER BY n.date DESC",
    values: [uid],
  };
  let notifications;

  try {
    notifications = await db.query(notificationQuery);
  } catch (err) {
    const error = HttpError("errrrr", 500, res);

    return next(error);
  }
  res.status(200).json(notifications.rows);
  })
export default handler;


