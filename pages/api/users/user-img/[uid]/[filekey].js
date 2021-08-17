import nc from "next-connect";
import db from '../../../../../server/util/queries'
import HttpError from "../../../../../server/models/http-error";
import checkAuth from "../../../../../server/middleware/check-auth";
import fileUpload from '../../../../../server/middleware/file-upload';

const handler = nc()
  .use(checkAuth)
  .use(fileUpload.userPicUpload.single('image'))
  .post(async (req, res, next) => {
    const userId = req.query.uid;
    let client;
    let oldpath = req.query.filekey;

    const decoded = req.userData;

    if (decoded.userId !== userId) {
      const error = HttpError(
        "You are not authorized",
        401, res
      );
      return next(error);
    }

    try {
      client = await db.connect();
    } catch (err) {
      const error = HttpError("errrrr", 500, res);
      return next(error);
    }

    const postPicQuery = {
      name: "post-user-img",
      text: "UPDATE users SET user_img_path = $1 WHERE id = $2",
      values: [req.file.Key, userId],
    };
    let postPic;

    // try {
    //   postPic = await client.query(postPicQuery);
    // } catch (err) {
    //   return next(err);
    // } finally {
    //   client.release();
    // }

    try {
      await client.query("BEGIN");
      await client.query(postPicQuery);
      if (oldpath) {
        fileUpload.deleteFileFallback(oldpath, next)
      }
      await client.query("COMMIT");
    } catch (err) {
      const error = HttpError("errrrr", 500);
      fileUpload.deleteFileFallback(req.file.Key, next)
      await client.query("ROLLBACK");
      return next(error);
    } finally {
      client.release();
    }

    res.status(200).json({response: req.file.Key});
  })
export default handler;

