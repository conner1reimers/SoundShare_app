import nc from "next-connect";
import db from '../../../server/util/queries'
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import HttpError from "../../../server/models/http-error";

const handler = nc()
  .post(async (req, res, next) => {
    const {email} = req.body;

  const queryText = 'select * from users where email = $1';
  const queryVals = [email]
  try {
    const user = await db.query(queryText, queryVals);

    if (!user.rows[0]) {
      const error = HttpError('No user exists with that email', 422, res);
      return next(error)
    }
    

  } catch {
    const error = HttpError('Something went wrong', 422, res);
    return next(error);
  }

  try {
    const emailToken = await jwt.sign(
      {user: email},
      process.env.NEXT_PUBLIC_JWTSECRET,
      {expiresIn: '1d'});

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.NEXT_PUBLIC_ENV_EMAIL,
          pass: process.env.NEXT_PUBLIC_ENV_PASSWORD
        }
      });
          
    const url = `https://soundshare.cc/password-reset/${emailToken}`;

    let mailOptions = {
        from: 'soundsharehelp1@gmail.com',
        to: email,
        subject: "RESET PASSWORD - SoundShare",
        html: `To reset your password, follow this link: <a href="${url}">${url}</a>`
      }
          
        
        
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          const error = HttpError('Error sending password recovery email', 422, res);
         
          res.status(200).json({err})
        } else {
          res.status(200).json({msg: 'success'});
        }
      })
  } catch (err) {
    const error = HttpError('Something went wrong with the JWT', 500, res)
    return next(error);
  }
  })
export default handler;

