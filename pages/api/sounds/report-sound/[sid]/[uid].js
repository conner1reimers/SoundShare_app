import nc from "next-connect";
import db from '../../../../../server/util/queries'
import HttpError from "../../../../../server/models/http-error";
import checkAuth from "../../../../../server/middleware/check-auth";
import {check, body} from 'express-validator';


const handler = nc()
  .use(checkAuth)
  .use([
    check('msg').isLength({min: 0, max: 350})
  ])
  .post(async (req, res, next) => {
    
    const errors = validationResult(req).array();
  
  if (errors.length !== 0) {
    let err = HttpError('Must be 0-350 characters', 422, res);
    return next(err)
  }

  let userId = req.query.uid;
  let comId = req.query.cid;
  let msg = req.body.msg;

  const decoded = req.userData;

  if (decoded.userId !== userId) {
    const error = HttpError(
      "You are not authorized",
      401, res
    );
    return next(error);
  }

  const reportTxt = 'INSERT INTO soundreports (com_id, user_id, msg) VALUES ($1, $2, $3)';
  const reportVals = [comId, userId, msg];

  let comReport;
  try {
    comReport = await db.query(reportTxt, reportVals);
    res.status(200).json({sounds: comReport.rows, msg: "success" });

  } catch (err) {
    if (err.message === 'duplicate key value violates unique constraint "reports_pkey"') {
      const error = HttpError('You have already reported this comment', 404, res);
      return next(error);
    } else {
      return next(err);
    }
    

    
  }

  })
export default handler;


