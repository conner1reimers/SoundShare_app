import nc from "next-connect";
import db from '../../../server/util/queries'

const handler = nc()
  .get(async (req, res, next) => {
    const getSoundsQueryTxt = "SELECT id FROM sounds";  

    let foundSounds;
    let response;
  
    try {
      foundSounds = await db.query(getSoundsQueryTxt);
  
      response = {
        sounds: foundSounds.rows
      };
    } catch (err) {
      const error = HttpError(err.message, 500, res);
  
      return next(error);
    }
    res.status(200).json(response);
  })
export default handler;