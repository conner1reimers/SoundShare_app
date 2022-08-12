import nc from "next-connect";
import db from '../../../../../server/util/queries'
import s3fileUpload from  '../../../../../server/middleware/file-upload';
import HttpError from "../../../../../server/models/http-error";


const handler = nc()
  .get(async (req, res, next) => {
  const soundPath = req.query.soundPath;
  const soundId = req.query.soundId;

  const regExHash = /%23/gi;
  const regExAt = /%40/gi;

  const hasAt = regExAt.test(soundPath);
  const hasHash = regExHash.test(soundPath);

  if (hasHash) {
    soundPath = soundPath.replace(regExHash, "#");
  }
  if (hasAt) {
    soundPath = soundPath.replace(regExAt, "@");
  }

  let params = {
    Bucket: 'soundshare-bucket', 
    Key: soundPath
  };

  let client;
  try {
    client = await db.connect();
  } catch (err) {
    const error = HttpError("errrrr", 500, res);

    return next(error);
  }

  const getFeedDataFollowsQuery = {
    name: "download-sound",
    text: "update sounds set downloads = downloads + 1 where id = $1",
    values: [soundId],
  };

  try {
    await client.query(getFeedDataFollowsQuery);
    const fileStream = s3fileUpload.s3.getObject(params).createReadStream();
    res.attachment(soundPath)
    fileStream.pipe(res);
  } catch (err) {
    return next(err);
  } finally {
    client.release();
  }
  
})
export default handler;

  