import nc from "next-connect";
import db from '../../../../server/util/queries'
import HttpError from "../../../../server/models/http-error";
import checkAuth from "../../../../server/middleware/check-auth";


const handler = nc()
  .get(async (req, res, next) => {
    const uid = req.query.userId;
  const queryText =
    "SELECT user_img_path FROM users WHERE id = $1";
  const queryVals = [uid];

  let userPic;
  try {
    userPic = await db.query(queryText, queryVals);
  } catch (err) {
    const error = HttpError("error", 500, res);

    return next(error);
  }
  res.status(200).json(userPic.rows[0]);
  })
export default handler;

