import nc from "next-connect";
import db from '../../../../../../server/util/queries'
import HttpError from "../../../../../../server/models/http-error";
import checkAuth from "../../../../../../server/middleware/check-auth";
import fileUpload from '../../../../../../server/middleware/file-upload';

const handler = nc()
  .use(checkAuth)
  .use(fileUpload.upload.single('image'))
  .post(async (req, res, next) => {
    let client;
    let soundId = req.query.sid;
    let userId = req.query.uid;
    let oldpath = req.query.filekey;
  
  
    const decoded = req.userData;
  
    if (decoded.userId !== userId) {
      const error = HttpError(
        "You are not authorized",
        401,
        res
      );
      return next(error);
    }
  
    try {
      client = await db.connect();
    } catch (err) {
      const error = HttpError("errrrr", 500, res);
      return next(error);
    }
    let newpath = req.file.Key;
  
    const changeImgQuery = {
      text: "update sounds set img_path = $1 where id = $2",
      values: [newpath, soundId],
    };
  
    try {
      await client.query("BEGIN");
      await client.query(changeImgQuery);
      if (oldpath !== "none") {
        fileUpload.deleteFileFallback(oldpath, next);
      }
      await client.query("COMMIT");
    } catch (err) {
      const error = HttpError("errrrr", 500, res);
      fileUpload.deleteFileFallback(newpath, next)
      await client.query("ROLLBACK");
      return next(error);
    } finally {
      client.release();
    }
  
    res.status(200).json({ path: newpath });
  
})
export default handler;

  