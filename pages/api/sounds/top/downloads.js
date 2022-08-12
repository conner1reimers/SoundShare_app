import nc from "next-connect";
import db from '../../../../server/util/queries'
import HttpError from "../../../../server/models/http-error";


const handler = nc()
  .get(async (req, res, next) => {
    let result;

    const queryText = 'SELECT * FROM sounds ORDER BY downloads DESC LIMIT 20';

    try {
        result = await db.query(queryText);
    } catch (err) {
        const error = HttpError("errrrr", 500, res);

        return next(error);
    }

  res.status(200).json(result.rows);
  
})
export default handler;