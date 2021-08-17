import nc from "next-connect";
import db from '../../../server/util/queries'

const handler = nc()
  .get(async (req, res, next) => {
    let offset = parseInt(req.query.offset);
  let soundId = req.query.uid;

  const getRepostTxt = 
  'SELECT * from reposts r inner join sounds s on s.id = r.sound_id where r.user_id = $1 ORDER BY repost_date DESC LIMIT 17 OFFSET $2';

  const getRepostVals = [soundId, offset];


  let foundSound;
  try {
    foundSound = await db.query(getRepostTxt, getRepostVals);
    res.status(200).json({sounds: foundSound.rows, msg: "success" });

  } catch (err) {
    res.status(200).json({ msg: "error" });

    return next(err);
  }

  })
export default handler;

