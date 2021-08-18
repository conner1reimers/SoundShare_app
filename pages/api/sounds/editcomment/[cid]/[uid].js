import nc from "next-connect";
import db from '../../../../../server/util/queries'
import HttpError from "../../../../../server/models/http-error";
import checkAuth from "../../../../../server/middleware/check-auth";


const handler = nc()
  .use(checkAuth)
  .patch(async (req, res, next) => {
    const commentId = req.query.cid;
    let userId = req.query.uid;


    const newComment = req.body.msg;
    const decoded = req.userData;
  
    if (decoded.userId !== userId) {
      const error = HttpError(
        "You are not authorized",
        401, res
      );
      return next(error);
    }
  
    
    let queryText = "UPDATE comments set message = $1 where id = $2";
    let queryVals = [newComment, commentId];
  
    try {
      await db.query(queryText, queryVals);
    } catch (err) {
      const error = HttpError("errrrr", 500, res);
      return next(error);
    }
  
    res.status(200).json({ msg: "UPDATED" });

  })
export default handler;


