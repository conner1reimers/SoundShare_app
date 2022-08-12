import nc from "next-connect";
import db from '../../../../server/util/queries'
import HttpError from "../../../../server/models/http-error";
import checkAuth from "../../../../server/middleware/check-auth";
import { body, validationResult} from 'express-validator';


const handler = nc()
  .use(checkAuth)
  .use(body("link").custom((value, { req }) => {
		let reg =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

		if (reg.test(value)) {
			return true;
		}
	})
    )
  .patch(async (req, res, next) => {
    const errors = validationResult(req);

  if (!errors.isEmpty()){
    const err = HttpError('Invalid inputs passed... make sure you are entering the correct link', 422, res)
    return next(err)
  }


  const { uid } = req.query;
  const newLink = req.body.link;


  let queryText;
  let queryVals;

  
  const regExHttps = /https:/gi;
  const hasHttps = regExHttps.test(newLink);

  if (hasHttps) {
    queryVals = [newLink, uid];
  } else {
    const newLinkHttps = 'https://' + newLink
    queryVals = [newLinkHttps, uid];

  }

  queryText = "UPDATE users set store_link = $1 where id = $2";


  try {
    await db.query(queryText, queryVals);
  } catch (err) {
    const error = HttpError("errrrr", 500, res);

    return next(error);
  }

  res.status(200).json({ msg: "UPDATED" });
  })
export default handler;

