import nc from "next-connect";
import db from '../../../../server/util/queries';
import HttpError from "../../../../server/models/http-error";
import checkAuth from "../../../../server/middleware/check-auth";
import fileUpload from "../../../../server/middleware/file-upload";
import { check, body, validationResult} from 'express-validator';


const handler = nc()
  .use(checkAuth)
  .use(fileUpload.upload.any())
  .use([
    check('name').isLength({min: 2, max: 60}),
    body('description').isLength({max: 999})
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

  let soundPath;
  let imgPath;
  

  if (req.files.length === 1) {
    soundPath = req.files[0].Key;
    imgPath = null;
    

  } else if (req.files.length === 2) {

    soundPath = req.files[0].Key;
    imgPath = req.files[1].Key;
  }



  const deleteFiles = () => {
    
    if (!imgPath) {
      fileUpload.deleteFileFallback(soundPath, next);
    } else {
      fileUpload.deleteFileFallback(soundPath, next);
      fileUpload.deleteFileFallback(imgPath, next);
    }
  }
  

  let {
    name,
    type,
    data,
    username,
    creator,
    genre,
    description,
    xtra,
    bpm,
    category
  } = req.body;

  if(category === "loop") {
    category = "loops"
  }

  const decoded = req.userData;

  if (decoded.userId !== creator) {
    const error = HttpError(
      "You are not authorized",
      401,
      res
    );
    
    deleteFiles();
    return next(error);
  }
  

  if (bpm == 0 && category != 'fx' && category != 'vocal') {
    const error = HttpError(
      "BPM Cannot be 0",
      500,
      res
    );    
    deleteFiles();
    return next(error)
    // return next({message: 'BPM Cannot be 0', code: 500});
  }

  const date = new Date();


  if(xtra) {
    if (xtra.length && xtra.length > 1) {
      xtra = xtra.split(",");
    }
  }

  
  let tags = req.query.tags;

  tags = tags.split("zzzz");

  if (xtra) {
    if (xtra.length && xtra.length > 0) {
      tags = tags.concat(xtra);
    }
  }
  

  
  if (creator === "null") {
    creator = null;
  }

  tags = tags.filter((el) => {
    return el !== "";
  });

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
      const error = HttpError("This exact sound already exists", 500, res);
      deleteFiles();
      client.release();
      return next(error);
    }
  } catch {}

  let results;

  
  try {
    await client.query("BEGIN");
    const createSoundQueryText =
      "INSERT INTO sounds (name, path, type, data, username, creator_id, genre, img_path, date_time, tags, description, bpm, category) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id";
    const soundValues = [
      name,
      soundPath,
      type,
      data,
      username,
      creator,
      genre,
      imgPath,
      date,
      tags,
      description,
      bpm,
      category
    ];
    results = await client.query(createSoundQueryText, soundValues);
    if (creator) {
      const insertUserQuery =
        "UPDATE users SET sounds = array_append(sounds, $1) WHERE id = $2";
      const insertUserVals = [results.rows[0].id, creator];
      await client.query(insertUserQuery, insertUserVals);

      let insertAction = "INSERT INTO actions (user_id, target_id, type, date) VALUES ($1, $2, $3, $4)";
      const insertActionVals = [creator, results.rows[0].id, "sounds", date];
      await client.query(insertAction, insertActionVals);


  
    }
    

    await client.query("COMMIT");
    res.status(200).json(results);
  } catch (err) {
    const error = HttpError(err.message, 500, res);
    deleteFiles();

    await client.query("ROLLBACK");
    return next(error);
  } finally {
    client.release();
  }

  })
export default handler;


