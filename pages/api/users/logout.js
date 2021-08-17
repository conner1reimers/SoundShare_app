import nc from "next-connect";
import db from '../../../server/util/queries'

const handler = nc()
  .post(async (req, res, next) => {
    const sessCookie = req.cookies.sessioncook;

    if (sessCookie) {      
        const getCookieQueryTxt =
        "DELETE \
        FROM session \
        WHERE sid = $1";
        const getCookieVal = [sessCookie];
        
        try {
          await db.query(getCookieQueryTxt, getCookieVal);
        } catch (err) {
          const error = HttpError('Something went wrong..', 500, res);
          return next(error);
        }
        
      res.clearCookie("sessioncook");
      res.status(200).json({msg: "cookie cleared"});
    }
  })
export default handler;