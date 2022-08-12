import nc from "next-connect";
import db from '../../../../server/util/queries';
import HttpError from "../../../../server/models/http-error";
import checkAuth from "../../../../server/middleware/check-auth";
import { check, body, validationResult} from 'express-validator';


const handler = nc()
  .use(checkAuth)
  .use([
    check('name').isLength({min: 2, max: 60}),
    body('description').isLength({max: 999}),
  ])
  .post(async (req, res, next) => {
    const errors = validationResult(req).array();
  
  if (errors.length !== 0) {
    let err;
    errors.forEach(el => {
      if (el.param === 'name') {
        err = HttpError('Name must be 2-60 characters', 422, res);
      } else if (el.param === 'description') {
        err = HttpError('Description must be less than 3000 characters', 422, res);
      }
    })
    
    return next(err)
  }

  let {
    type,
    data,
    creator,
    bpm,
    category
  } = req.body;

  const decoded = req.userData;

  if (parseInt(decoded.userId) !== parseInt(creator)) {
    const error = HttpError(
      "You are not authorized",
      401, res
    );
    return next(error);
  }
  

  if (bpm == 0 && category != 'fx' && category != 'vocal') {
    const error = HttpError(
      "BPM Cannot be 0",
      500, res
    );
    return next(error);
  }



  let client;
  try {
    client = await db.connect();
  } catch (err) {
    const error = HttpError("errrrr", 500, res);
    deleteFiles();
    return next(error);
  }

  let foundSound;
  try {
    let findSoundQuery =
      "SELECT data from sounds WHERE data = $1 and type = $2";
    const soundValues = [data, type];
    foundSound = await client.query(findSoundQuery, soundValues);
    if (foundSound.rows.length > 0) {
      const error = HttpError("One of these exact sound already exists", 500, res);
      deleteFiles();
      client.release();
      return next(error);
    } else {
      res.status(200).json({result: true})
    }
  } catch (err) {
    return next (err);
  }

  })
export default handler;


