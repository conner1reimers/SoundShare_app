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
  .get(async (req, res, next) => {
    let client;
  


  const sessCookie = req.cookies.sessioncook;
  let cookieResult;
  

  if (sessCookie) {

    try {
      client = await db.connect();
    } catch (err) {
      const error = HttpError("errrrr", 500, res);
      return next(error);
    }
    

    // const getCookieQueryTxt =
    // "SELECT sess \
    // FROM session \
    // WHERE sid = $1";
    // const getCookieVal = [sessCookie];

    // try {
    //   cookieResult = await client.query(getCookieQueryTxt, getCookieVal);
    // } catch (err) {
    //   client.release();
    // }

    cookieResult = req.session.get("sessioncook");

    

    if (cookieResult) {
      const token = cookieResult.token;

      jwt.verify(token, process.env.NEXT_PUBLIC_JWTSECRET, async (err, decoded) => {
        if (err) {
                next(err);
        } else {
         
          const emailQuery = {
            name: "fetch-email",
            text: "SELECT * FROM users WHERE email = $1 OR username = $1 AND id = $2",
            values: [decoded.email, decoded.userId],
          };
          const notificationQuery = {
            name: "fetch-notifications",
            text:
              "select n.target_user_id, n.target_id, n.user_id, n.extra_data, n.date, n.type, n.checked, s.name, s.img_path, s.id as sound_id, \
            u.username, u.user_img_path from notifications n inner join sounds s on s.id = n.target_id inner join users u on u.id = n.user_id \
            WHERE n.target_user_id = $1 ORDER BY n.date DESC LIMIT 6",
            values: [decoded.userId],
          };
    
          let user;
          let notifications;
          try {
            user = await client.query(emailQuery);
            notifications = await client.query(notificationQuery);
            
            res.status(200).json({
              res: user.rows[0],
              msg: "LOGGED IN!",
              token: token,
              notifications: notifications.rows
            });
          } catch (error) {
            const err = HttpError("No token", 500, res);
            return next(err);
          } finally {
            client.release();
          }
          
        }
      })
    
    }
    


  } else {
    res.json({msg: 'No cookie'})
  }
  })
export default handler;