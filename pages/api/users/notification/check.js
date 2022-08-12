import nc from "next-connect";
import db from '../../../../server/util/queries'
import HttpError from "../../../../server/models/http-error";
import checkAuth from "../../../../server/middleware/check-auth";


const handler = nc()
  .use(checkAuth)
  .patch(async (req, res, next) => {
    const uid = req.body.uid;
  const queryText =
    "update notifications set checked = true where target_user_id = $1 and checked = $2";
  const queryVals = [uid, false];
  const decoded = req.userData;

  if (decoded.userId !== uid) {
    const error = HttpError(
      "You are not authorized",
      401, res
    );
    return next(error);
  }
  try {
    await db.query(queryText, queryVals);
  } catch (err) {
    const error = HttpError("errrrr", 500, res);

    return next(error);
  }
  res.status(200).json({ msg: "UPDATED" });
  })
export default handler;


