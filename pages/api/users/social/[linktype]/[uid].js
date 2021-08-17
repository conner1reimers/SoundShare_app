import nc from "next-connect";
import db from '../../../../../server/util/queries'
import HttpError from "../../../../../server/models/http-error";
import checkAuth from "../../../../../server/middleware/check-auth";
import { body, validationResult} from 'express-validator';

const handler = nc()
  .use(checkAuth)
  .use(body("link").custom((value, { req }) => {
        let reg;
        if (req.query.linktype === "insta") {
            reg = /^(http(s)?:\/\/)?((w){3}.)?instagram?(\.com)?\/.+/gm;
        } else if (req.query.linktype === "youtube") {
            reg = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm;
        } else if (req.query.linktype === "facebook") {
            reg = /^(http(s)?:\/\/)?((w){3}.)?facebook?(\.com)?\/.+/gm;
        } else if (req.query.linktype === "twitter") {
            reg = /^(http(s)?:\/\/)?((w){3}.)?twitter?(\.com)?\/.+/gm;
        }

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


  const { linktype, uid } = req.query;
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

  if (linktype === "insta") {
    queryText = "UPDATE users set instagram_link = $1 where id = $2";
  } else if (linktype === "youtube") {
    queryText = "UPDATE users set youtube_link = $1 where id = $2";
  } else if (linktype === "twitter") {
    queryText = "UPDATE users set twitter_link = $1 where id = $2";
  } else if (linktype === "facebook") {
    queryText = "UPDATE users set facebook_link = $1 where id = $2";
  }

  try {
    await db.query(queryText, queryVals);
  } catch (err) {
    const error = HttpError("errrrr", 500, res);

    return next(error);
  }

  res.status(200).json({ msg: "UPDATED" });
  })
export default handler;

