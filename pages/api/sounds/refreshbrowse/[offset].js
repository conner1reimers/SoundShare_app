import nc from "next-connect";
import db from '../../../../server/util/queries'
import HttpError from "../../../../server/models/http-error";
import { v4 as uuid } from "uuid";

const handler = nc()
  .post(async (req, res, next) => {
    
    let client;

  const regEx = /LIMIT 15/gi;
  let soundVals = req.body.vals;
  let offset = parseInt(req.query.offset);


  let finalVals;

  let findSoundQuery = req.body.query.replace(regEx, "");
  let order = req.body.order;


  if (soundVals === "none") {
    finalVals = [];
  } else {
    finalVals = soundVals;
  }

  if (order === "none") {
    order = ""
  }


  try {
    client = await db.connect();
  } catch (err) {
    const error = HttpError("errrrr", 500, res);

    return next(error);
  }

  const refreshQuery = {
    name: "refresh-browse" + uuid(),
    text: findSoundQuery + " OFFSET " + offset + " LIMIT 15",
    // text: findSoundQuery + " LIMIT 15",
    values: finalVals,
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





