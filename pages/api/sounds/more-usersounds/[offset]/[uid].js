import nc from "next-connect";
import db from '../../../../../server/util/queries'

const handler = nc()
  .get(async (req, res, next) => {
    let offset = parseInt(req.query.offset);
  let soundId = req.query.uid;

  const getSoundsTxt = 
  'SELECT * FROM sounds WHERE creator_id = $1 ORDER BY date_time DESC LIMIT 17 OFFSET $2';

  const getSoundsVals = [soundId, offset];


  let foundSound;
  try {
    foundSound = await db.query(getSoundsTxt, getSoundsVals);
    res.status(200).json({sounds: foundSound.rows, msg: "success" });

  } catch (err) {
    res.status(200).json({ msg: "error" });

    return next(err);
  }

  })
export default handler;

