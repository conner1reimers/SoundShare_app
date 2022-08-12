import nc from "next-connect";
import db from '../../../../../server/util/queries'
import HttpError from "../../../../../server/models/http-error";
import checkAuth from "../../../../../server/middleware/check-auth";


const handler = nc()
  .use(checkAuth)
  .patch(async (req, res, next) => {
    
    let newDescription = req.body.description;
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
    let client;
    try {
      client = await db.connect();
    } catch (err) {
      const error = HttpError("errrrr", 500, res);
  
      return next(error);
    }
  
    let queryText = "UPDATE sounds set description = $1 where id = $2";
    let queryVals = [newDescription, soundId];
  
    try {
      await db.query(queryText, queryVals);
    } catch (err) {
      const error = HttpError("errrrr", 500, res);
  
      return next(error);
    }
  
    res.status(200).json({ msg: "UPDATED" });

  })
export default handler;


