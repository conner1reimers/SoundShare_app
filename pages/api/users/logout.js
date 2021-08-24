import nc from "next-connect";
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
        req.session.unset("sessioncook");
    }

    res.status(200).json({msg: "logged out"});
  })

export default handler;