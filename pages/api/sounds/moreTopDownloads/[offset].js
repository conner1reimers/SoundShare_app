import nc from "next-connect";
import db from '../../../../server/util/queries'
import HttpError from "../../../../server/models/http-error";
import { v4 as uuid } from 'uuid';



const handler = nc()
  .get(async (req, res, next) => {
    
    let client;
    let offset = parseInt(req.query.offset);
    const getDownloadsTxt = 'SELECT * from sounds order by downloads desc offset $1 limit 20';
  
    try {
      client = await db.connect();
    } catch (err) {
      const error = HttpError("errrrr", 500, res);
  
      return next(error);
    }
  
    const refreshQuery = {
      name: "refresh-downloads" + uuid(),
      text: getDownloadsTxt,
      values: [offset],
    };
  
    let foundSound;
    try {
      foundSound = await client.query(refreshQuery);
    } catch (err) {
      return next(err);
    } finally {
      client.release();
    }
  
    res.status(200).json({ results: foundSound.rows });

  })
export default handler;


