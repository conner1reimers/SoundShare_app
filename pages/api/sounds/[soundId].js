import nc from "next-connect";
import db from '../../../server/util/queries'
import HttpError from "../../../server/models/http-error";


const handler = nc()
  .get(async (req, res, next) => {
  const soundId = req.query.soundId;
  let queryText = "SELECT * FROM sounds WHERE id = $1";
  console.log(soundId)

  let soundVal = [soundId];
  let response;
  let client;
  try {
    client = await db.connect();
  } catch (err) {
    const error = HttpError("errrrr", 500, res);
    client.release();
    return next(error);
  }

  try {
    response = await client.query(queryText, soundVal);
    let commentQueryTxt =

      "select c.id as com_id, c.comment_date, c.message, c.creator_id as comment_creator, \
      u.user_img_path, u.username from comments c join users u on u.id = c.creator_id WHERE \
      c.id = any ($1) ORDER BY comment_date DESC LIMIT 20";
    let comVals = [response.rows[0].comments];
    const { rows } = await client.query(commentQueryTxt, comVals);

    if (response.rows) {
      res.status(200).json({ sound: response.rows[0], comments: rows });
    }
  } catch (err) {
    const error = HttpError("errrrr", 500);
    return next(error);
  } finally {
    client.release();
  }
  })
export default handler;