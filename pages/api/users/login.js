import nc from "next-connect";
import db from '../../../server/util/queries'
import jwt from 'jsonwebtoken';
import HttpError from "../../../server/models/http-error";
import bcrypt from 'bcrypt';

const handler = nc()
  .post(async (req, res, next) => {
    const email = req.body.email.toLowerCase();
  const password = req.body.password;


  let client;
  try {
    client = await db.connect();
  } catch (err) {
    const error = HttpError("errrrr", 500, res);
    return next(error);
  }
  const emailQuery = {
    name: "fetch-email",
    text: "SELECT * FROM users WHERE email = $1 OR username = $1",
    values: [email],
  };

  let user;
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
    user = await client.query(emailQuery);
    if (!user.rows[0]) {
          const err = HttpError("No user found with that email/username", 500, res);
          return next(err);


    } else {
            let hashedPasswordInDb = user.rows[0].password;

            let isValidPassword;
            try {
              isValidPassword = await bcrypt.compare(password, hashedPasswordInDb);
            } catch (err) {
              return next(err);
            }

            if (isValidPassword) {
              let token;
              try {
                token = await jwt.sign(
                  { userId: user.rows[0].id, email: email, master: false  },
                  process.env.NEXT_PUBLIC_JWTSECRET,
                  { expiresIn: "2 days" }
                );
                req.session.jwt = token;
                res.cookie('sessioncook', req.session.id, { expires: new Date(Date.now() + 200000000), httpOnly: true });
                
                res.status(200).json({
                  res: user.rows[0],
                  token: token,
                  msg: "LOGGED IN!"
                });

                
              } catch (error) {
                const err = HttpError("Token creation failed...", 500, res);
                return next(err);
              }
              
            } else {
              const err = HttpError("Invalid password", 500, res);
              return next(err);
            }
            
          
            
          
    }
  } catch (error) {
        const err = HttpError("No user found with that email/username", 500, res);
        return next(err);
  } finally {
        client.release();
  }
  })
export default handler;