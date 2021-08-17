import nc from "next-connect";
import db from '../../../../../server/util/queries'
import HttpError from "../../../../../server/models/http-error";


const handler = nc()
  .get(async (req, res, next) => {
    
const offset = req.query.offset;
const category = req.query.category;


let getSoundsQueryTxt;
let getSoundsQueryVals;

if (category === "all") {
  getSoundsQueryTxt = "SELECT * FROM sounds ORDER BY date_time DESC OFFSET $1 LIMIT 10";
  getSoundsQueryVals = [offset];

} else {
  getSoundsQueryTxt = "SELECT * FROM sounds WHERE category = $1 ORDER BY date_time DESC OFFSET $2 LIMIT 10";
  getSoundsQueryVals = [category, offset];
}

let foundSounds;
let client;

try {
  client = await db.connect();
} catch (err) {
  const error = HttpError("errrrr", 500, res);
  return next(error);
}

try {
  foundSounds = await client.query(getSoundsQueryTxt, getSoundsQueryVals);
} catch (err) {
  const error = HttpError("errrrr", 500, res);
  return next(error);
} finally {
  client.release();
}

res.status(200).json(foundSounds.rows);

  })
export default handler;


