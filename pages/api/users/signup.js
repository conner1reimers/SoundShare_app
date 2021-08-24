import nc from "next-connect";
import db from '../../../server/util/queries'
import jwt from 'jsonwebtoken';
import {body, validationResult} from 'express-validator';
import bcrypt from 'bcrypt';
import HttpError from "../../../server/models/http-error";
import { ironSession } from 'next-iron-session';



const session = ironSession({
  cookieName: "sessioncook",
  password: process.env.NEXT_PUBLIC_ENV_SESHSECRET,
  
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",

  },
});



const handler = nc().use(session)
  .use([
    body("email").normalizeEmail().isEmail(),
    body("username").isLength({ min: 5, max: 25 }),
    body("password").isLength({ min: 5, max: 255 }),
    ])
  .post(async (req, res, next) => {
    const errors = validationResult(req);

  if (!errors.isEmpty()){
    if (errors.errors[0].param === 'username') {
      const err = HttpError('Invalid username, must be 6-25 characters', 422, res)
      return next(err)
    } else if (errors.errors[0].param === 'password') {
      const err = HttpError('Invalid password, must be atleast 6 characters', 422, res)
      return next(err)
    }
    
  }


  let { email, username, password } = req.body;
  let client;
  try {
    client = await db.connect();
  } catch (err) {
    const error = HttpError("errrrr", 500, res);
    return next(error);
  }

  const queryText = "INSERT INTO users (email, username, password, join_date) VALUES ($1, $2, $3, $4)";

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = HttpError('Couldnt hash password', 500, res)
    return next(error)
  }
  const values = [email, username, hashedPassword, new Date()];


  const emailQuery = {
    name: "fetch-email",
    text: "SELECT * FROM users WHERE email = $1",
    values: [email],
  };

  let result;
  let token;


  const sessCookie = req.session.get("sessioncook");

  if (sessCookie) {      
     req.session.destroy()

  }
    try {
      await client.query("BEGIN");
      result = await client.query(queryText, values);
  
      const user = await client.query(emailQuery);
      const userId = user.rows[0].id;
  
      token = await jwt.sign(
        { userId: userId, email: email, master: false },
        process.env.NEXT_PUBLIC_JWTSECRET, 
        {
          expiresIn: "2 days",
        }
        );
  
    
        req.session.set("sessioncook", {
          name: email,
          token: token 

        })
      await req.session.save();
      await client.query("COMMIT");
      // res.cookie('sessioncook', req.session.id, { expires: new Date(Date.now() + 200000000), httpOnly: true });
      res.status(200).json({ user, token });
    } catch (err) {
      let error;

      await client.query("ROLLBACK");

      if (err.message === "duplicate key value violates unique constraint \"users_email_key\"") {
        error = HttpError("There is already an account with that email! Login!", 500, res);
      } else if (err.message === "duplicate key value violates unique constraint \"users_username_key\"") {
        error = HttpError("Sorry, there is already an account with that username.", 500, res);
      } else {
        error = HttpError("error here", 500, res)
      }
      return next(error);
    } finally {
      client.release();
    }
  })
export default handler;

