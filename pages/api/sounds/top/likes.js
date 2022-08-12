import nc from "next-connect";
import db from '../../../../server/util/queries'
import HttpError from "../../../../server/models/http-error";


const handler = nc()
  .get(async (req, res, next) => {
    let result;

    const queryText = 'SELECT * FROM sounds \
    WHERE array_length(favs, 1) != 0 \
    ORDER BY array_length(favs, 1) DESC \
    fetch first 20 rows only';
  
    try {
      result = await db.query(queryText);
    } catch (err) {
      const error = HttpError("errrrr", 500, res);
  
      return next(error);
    }

    res.status(200).json(result.rows);
  
})
export default handler;