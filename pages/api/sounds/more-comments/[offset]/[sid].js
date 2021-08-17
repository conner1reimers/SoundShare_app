import nc from "next-connect";
import db from '../../../../server/util/queries'

const handler = nc()
  .get(async (req, res, next) => {
    let offset = parseInt(req.query.offset);
    let soundId = req.query.sid;

    const getComsTxt = 
    'select c.id as com_id, c.comment_date, c.message, c.creator_id as comment_creator, \
    u.user_img_path, u.username from comments c join users u on u.id = c.creator_id WHERE \
    c.sound_id = $1 ORDER BY comment_date DESC OFFSET $2 LIMIT 20';

    const getComsVals = [soundId, offset];


    let foundSound;
    try {
        foundSound = await db.query(getComsTxt, getComsVals);
        res.status(200).json({ sounds: foundSound.rows, msg: "success" });

    } catch (err) {
        res.status(200).json({ msg: "error" });

        return next(err);
    }

  })
export default handler;

