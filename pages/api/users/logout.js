import nc from "next-connect";
import db from '../../../server/util/queries'
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

    const sessCookie = req.session.get("sessioncook");

    if (sessCookie) {      
        req.session.destroy();
    }
  })

export default handler;