import nc from "next-connect";
import db from '../../../../../server/util/queries'
import HttpError from "../../../../../server/models/http-error";
import { body, validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const handler = nc()
  .use([body('password').isLength({ min: 5, max: 255 })])
  .post(async (req, res, next) => {
  
    const errors = validationResult(req);

  if (!errors.isEmpty()){
      const err = HttpError('Invalid password, must be atleast 6 characters', 422, res)
      return next(err)
  }
  
  const {password, token} = req.body;

  let client;
  try {
    client = await db.connect();
  } catch (err) {
    const error = HttpError("errrrr", 500, res);
    return next(error);
  }


  let decoded;
  try {
    decoded = await jwt.verify(token, process.env.NEXT_PUBLIC_JWTSECRET);
  } catch (err) {
    const error = HttpError('Error, there may not be an email with this request', res);
    return next(error);
  }
  
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = HttpError('Couldnt hash password', 500, res)
    return next(error)
  }


  const queryText = 'update users set password = $1 where email = $2 returning id, following, username';
  const queryVals = [hashedPassword, decoded.user];


  const sessCookie = req.cookies.sessioncook;

  if (sessCookie) {      
        const getCookieQueryTxt =
        "DELETE \
        FROM session \
        WHERE sid = $1";
        const getCookieVal = [sessCookie];
        try {
          await client.query(getCookieQueryTxt, getCookieVal);
        } catch {
          const error = HttpError('Something went wrong..', 500, res);
          return next(error);
        }
        
  }

  
  try {
    await client.query("BEGIN");
    const user = await client.query(queryText, queryVals);

    if (user.rows && user.rows.length > 0) {
      const userToken = await jwt.sign(
        { userId: user.rows[0].id, email: decoded.user, master: false  },
        process.env.NEXT_PUBLIC_JWTSECRET, 
        {expiresIn: "2 days"});

      req.session.jwt = userToken;
      
      await client.query("COMMIT");
      res.cookie('sessioncook', req.session.id, { expires: new Date(Date.now() + 200000000), httpOnly: true });
      res.status(200).json({ user: user.rows[0], userToken, msg: 'success'});
    } else {
      await client.query("ROLLBACK");
      const error = HttpError(`no user found with the email: ${decoded.user}, something went wrong`, 422, res);
      return next(error);
    }
  } catch (err) {
    await client.query("ROLLBACK");
    return next(err);
    
  } finally {
    client.release();
  }

  })
export default handler;


