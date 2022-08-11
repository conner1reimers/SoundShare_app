import nc from "next-connect";
import db from '../../../server/util/queries'
import jwt from 'jsonwebtoken';
import HttpError from "../../../server/models/http-error";
import { body, validationResult} from 'express-validator';
import { v4 as uuid } from "uuid";
import bcrypt from 'bcrypt'
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
    body("username").isLength({ min: 5, max: 25 }),
  ])
  .post(async (req, res, next) => {
    const errors = validationResult(req);


    if (!errors.isEmpty()){
      if (errors.errors[0].param === 'username') {
        const err = HttpError('Invalid username, must be 6-25 characters', 422, res)
        return next(err)
      }
    }

    const {email, username} = req.body;

    let client;
    let result;
    try {
      client = await db.connect();
    } catch (err) {
      const error = HttpError("errrrr", 500, res);
      return next(error);
    }

    let password;

    try {
      password = await bcrypt.hash(uuid(), 12);
    } catch (err) {
      const error = HttpError('Couldnt hash password', 500, res)
      return next(error)
    }

    const queryText = "INSERT INTO users (email, username, join_date, password) VALUES ($1, $2, $3, $4) RETURNING id, username, email, following";
    const values = [email, username, new Date(), password];


    const sessCookie = req.session.get("sessioncook");

    if (sessCookie) {      
        req.session.destroy();

    }

    try {
      await client.query("BEGIN");
      result = await client.query(queryText, values);
  
      const userId = result.rows[0].id;
      let token;
      token = await jwt.sign(
        { userId: userId, email: email, master: false },
        process.env.NEXT_PUBLIC_JWTSECRET, 
        {
          expiresIn: "60 days",}
        );
  
    
      req.session.set("sessioncook")
      
      await client.query("COMMIT");
      res.cookie('sessioncook', req.session.id, { expires: new Date(Date.now() + 200000000), httpOnly: true });
      res.status(200).json({ user: result.rows[0], token });
    } catch (err) {
      let error;
      await client.query("ROLLBACK");

      if (err.message === "duplicate key value violates unique constraint \"users_email_key\"") {
        error = HttpError("There is already an account with that email! Login!", 500, res);
      } else if (err.message === "duplicate key value violates unique constraint \"users_username_key\"") {
        error = HttpError("Sorry, there is already an account with that username.", 500, res);
      } else {
        error = HttpError(err.message, 500, res)
      }
      return next(error);
    } finally {
      client.release();
    }
  })
export default handler;

