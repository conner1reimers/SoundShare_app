import nc from "next-connect";
import db from '../../../server/util/queries'
import HttpError from "../../../server/models/http-error";

const handler = nc()
  .get(async (req, res, next) => {
    const getUsers = "SELECT id FROM users";  

      let foundUsers;
      let response;

      try {
        foundUsers = await db.query(getUsers);
      } catch (err) {
        const error = HttpError(err, 500, res);
        return next(error);
      }
      res.status(200).json(foundUsers.rows);
  })
export default handler;