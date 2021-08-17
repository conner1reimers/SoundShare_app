import nc from "next-connect";
import db from '../../../../server/util/queries'
import HttpError from "../../../../server/models/http-error";


const handler = nc()
  .get(async (req, res, next) => {
    const category = req.query.category;

    const getSoundsQueryTxt =
      "SELECT * \
      FROM sounds \
      WHERE category = $1 \
      ORDER BY date_time DESC LIMIT 15";  
  
    const vals = [category];
  
  
    let foundSounds;
    let response;
    let client;
    try {
      client = await db.connect();
    } catch (err) {
      const error = HttpError("errrrr", 500, res);
      return next(error);
    }
  
    try {
      foundSounds = await client.query(getSoundsQueryTxt, vals);
  
      response = {
        sounds: foundSounds.rows
      };
    } catch (err) {
      const error = HttpError(err.message, 500, res);
  
      return next(error);
    } finally {
      client.release();
    }
    res.status(200).json(response);
  
})
export default handler;