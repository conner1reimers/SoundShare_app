import nc from "next-connect";
import db from '../../../../../server/util/queries'
import HttpError from "../../../../../server/models/http-error";


const handler = nc()
  .get(async (req, res, next) => {
    let client;

    let searchTxt = req.query.searchTxt;
    let category = req.query.category;


    try {
        client = await db.connect();
    } catch (err) {
        const error = HttpError("errrrr", 500, res);

        return next(error);
    }

    const searchQuery = {
        name: "search-browse",
        text:
        "SELECT * FROM SOUNDS WHERE document_with_weights @@ plainto_tsquery('english', $1) AND category = $2 LIMIT 15",
        values: [searchTxt, category],
    };

    let foundSound;

    try {
        foundSound = await client.query(searchQuery);
    } catch (err) {
        return next(err);
        
    } finally {
        client.release();
    }

    let lastQuery = {
        text: searchQuery.text,
        vals: searchQuery.values,
    };

    res.status(200).json({ results: foundSound.rows, lastQuery: lastQuery });
  })
export default handler;

