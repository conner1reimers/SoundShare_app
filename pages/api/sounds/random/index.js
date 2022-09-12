import nc from "next-connect";
import db from '../../../../server/util/queries';
import HttpError from "../../../../server/models/http-error";
import checkAuth from "../../../../server/middleware/check-auth";
import { check, body, validationResult} from 'express-validator';


const handler = nc()
  .get(async (req, res, next) => {
    

  let client;
  try {
    client = await db.connect();
  } catch (err) {
    const error = HttpError("errrrr", 500, res);
    return next(error);
  }

  let foundSounds;
  try {
    let findSoundsQuery = "select id from sounds ORDER BY random() LIMIT 30";
    foundSounds = await client.query(findSoundsQuery);
    res.status(200).json(foundSounds);
  } catch (err) {
    return next (err);
  }

  })
export default handler;


