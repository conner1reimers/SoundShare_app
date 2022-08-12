import nc from "next-connect";
import db from '../../../../../server/util/queries'
import HttpError from "../../../../../server/models/http-error";
import checkAuth from "../../../../../server/middleware/check-auth";
import {check, body, validationResult} from 'express-validator';


const handler = nc()
  .use(checkAuth)
  .use([check('name').isLength({min: 2, max: 60})])
  .patch(async (req, res, next) => {
  
    const errors = validationResult(req).array();
  
  if (errors.length !== 0) {
    let err;
    errors.forEach(el => {
      if (el.param === 'name') {
        err = HttpError('Name must be 2-60 characters', 422, res);
        
      } 
    })
    
    return next(err)
    
  }
    let newName = req.body.name;
    let soundId = req.query.sid;
    let userId = req.query.uid;

    const decoded = req.userData;

    if (decoded.userId !== userId) {
      const error = HttpError(
        "You are not authorized",
        401, res
      );
      return next(error);
    }
  let queryText = "UPDATE sounds set name = $1 where id = $2";
  let queryVals = [newName, soundId];

  try {
    await db.query(queryText, queryVals);
  } catch (err) {
    const error = HttpError("errrrr", 500, res);

    return next(error);
  }

  res.status(200).json({ msg: "UPDATED" });

  })
export default handler;


