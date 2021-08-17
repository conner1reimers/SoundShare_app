import nc from "next-connect";
import db from '../../../server/util/queries'

const handler = nc()
  .get(async (req, res, next) => {
    const getLikesQueryTxt =
    "SELECT * FROM sounds \
    WHERE array_length(favs, 1) != 0 \
    ORDER BY array_length(favs, 1) DESC \
    fetch first 5 rows only";

  const getSoundsQueryTxt =
    "SELECT * \
    FROM sounds \
    ORDER BY date_time DESC LIMIT 30";  

  const getDownloadsTxt = 'SELECT * from sounds order by downloads desc limit 5';


  let foundLikes;
  let foundSounds;
  let foundDownload;
  let response;

  let client;
  try {
    client = await db.connect();
  } catch (err) {
    const error = HttpError("errrrr", 500, res);
    return next(error);
  }

  try {
    foundSounds = await client.query(getSoundsQueryTxt);
    foundLikes = await client.query(getLikesQueryTxt);
    foundDownload = await client.query(getDownloadsTxt);

    response = {
      sounds: foundSounds.rows,
      topLiked: foundLikes.rows,
      topDownloaded: foundDownload.rows,
    };
  } catch (err) {
    const error = HttpError(err.message, 500, res);

    return next(error);
  } finally {
    client.release();
  }
  res.status(200).json(response);
  })
export default handler;