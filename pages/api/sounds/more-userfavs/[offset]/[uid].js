import nc from "next-connect";
import db from '../../../../../server/util/queries'

const handler = nc()
  .get(async (req, res, next) => {
    let offset = parseInt(req.query.offset);
  let soundId = req.query.uid;

  const getFavsTxt =  'SELECT * FROM favorites f inner join sounds s on s.id = f.sound_id WHERE f.user_id = $1 ORDER BY f.fav_date DESC LIMIT 17 OFFSET $2';
  const getFavsVals = [soundId, offset];


  let foundSound;
  try {
    foundSound = await db.query(getFavsTxt, getFavsVals);
    res.status(200).json({sounds: foundSound.rows, msg: "success" });

  } catch (err) {
    res.status(200).json({ msg: "error" });

    return next(err);
  }

  })
export default handler;

