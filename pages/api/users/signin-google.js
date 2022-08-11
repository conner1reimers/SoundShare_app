import nc from "next-connect";
import db from '../../../server/util/queries'
import jwt from 'jsonwebtoken';
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
  .post(async (req, res, next) => {
    let email = req.body.email;

  let queryText = "SELECT * FROM users WHERE email = $1";
  let queryVals = [email];
  let foundUser;
  try {
    foundUser = await db.query(queryText, queryVals);
  } catch (err) {
    const error = HttpError("errrrr", 500, res);
    return next(error);
  }

  if (foundUser.rows.length > 0) {
    // There is a user 

    let token;
    try {
      
      let master = false;
      const id = foundUser.rows[0].id;
      const pass = foundUser.rows[0].password;

     
      if((email === process.env.NEXT_PUBLIC_ENV_MASTER_EMAIL) && (parseInt(id) == process.env.NEXT_PUBLIC_ENV_MASTER_ID) && (pass === process.env.NEXT_PUBLIC_REACT_APP_MASTER_PASS)) {
        master = true;
      } 
      token = await jwt.sign(
        { userId: id, email: email, master: master },
        process.env.NEXT_PUBLIC_JWTSECRET,
        { expiresIn: "60 days" }
      );
      req.session.set("sessioncook", {
        name: email,
        token: token
      })
      await req.session.save();
      
      res.status(200).json({
        res: foundUser.rows[0],
        token: token,
        msg: "user-found"
      });

      
    } catch (error) {
      const err = HttpError("Token creation failed...", 500, res);
      return next(err);
    }

  } else {
    // NO USER
    res.status(200).json({msg: "no-user"})
  }
  })
export default handler;

