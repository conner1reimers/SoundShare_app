import nc from "next-connect";
import db from '../../../../server/util/queries'
import HttpError from "../../../../server/models/http-error";


const handler = nc()
  .get(async (req, res, next) => {
    const userId = req.query.userId;

  let client;
  console.log(userId)


  try {
    client = await db.connect();
  } catch (err) {
    const error = HttpError("errrrr", 500, res);
    return next(error);
  }
  const userQuery = {
    name: "fetch-user",
    text:
      "SELECT u.username, u.id, u.bio, u.favs, u.instagram_link, u.store_link, u.twitter_link, u.facebook_link, u.youtube_link, \
         u.user_img_path, array_unique(u.followers) as followers, u.following, u.join_date, u.comments, \
        u.sounds, s.path, s.type, s.type, s.name, s.img_path, s.date_time, s.username as sound_username, \
        u.reposts, r.sound_id, r.user_id FROM users u \
        full join reposts r on r.sound_id = any (u.reposts) full join sounds s on r.sound_id = s.id \
        WHERE u.id = $1 ORDER BY s.date_time DESC LIMIT 17",
    values: [userId],
  };
  const repostsQuery = {
    name: "fetch-user-reposts",
    text:
      "SELECT * from reposts r inner join sounds s on s.id = r.sound_id where r.user_id = $1 ORDER BY repost_date DESC LIMIT 17",
    values: [userId],
  };

  const actionQuery = {
    name: "fetch-actions",
    text:
      "SELECT * from actions where user_id = $1 ORDER BY date DESC LIMIT 15",
    values: [userId],
  };

  let user;
  let sounds;
  let soundsOnlyuser;
  let favSounds;
  let actions;
  let recentActivities;
  let followed;
  let reposts;
  try {
    user = await client.query(userQuery);
    actions = await client.query(actionQuery);
    reposts = await client.query(repostsQuery);
    
    let soundVal = user.rows[0];

    
    const soundQuery = {
      name: "fetch-userSounds",
      text:
        "SELECT s.id, c.message, s.name, s.date_time, s.creator_id, s.path, s.img_path, s.type, c.sound_id, c.creator_id as com_user_id, s.username \
                FROM sounds s full join comments c on c.id = s.id WHERE s.id = any ($1) OR \
                s.id = any (SELECT target_id FROM actions WHERE user_id = $2 and type = 'comments') ORDER BY s.date_time DESC LIMIT 17",
      values: [soundVal.sounds, userId],
    };

    const soundQueryOnlyuser = {
      name: "fetch-userSounds-onlyuser",
      text:
        "SELECT * FROM sounds WHERE creator_id = $1 ORDER BY date_time DESC LIMIT 17",
      values: [userId],
    };

    sounds = await client.query(soundQuery);
    soundsOnlyuser = await client.query(soundQueryOnlyuser);


    const favsoundQuery = {
      name: "fetch-userSounds-favs",
      text: "SELECT * FROM favorites f inner join sounds s on s.id = f.sound_id WHERE f.user_id = $1 ORDER BY f.fav_date DESC LIMIT 17",
      values: [userId]
    };

    favSounds = await client.query(favsoundQuery);

    let followedArray = [];



    actions.rows.forEach((el) => {
      if (el.type === "follow") {
        followedArray.push(el.target_id);
      } 
    });

    // recentActivities = actions.rows.map(async (el) => {
    //     let response;
    //     if (el.type === 'follow') {
    //         response = await client.query('SELECT * FROM users WHERE id = $1', el.target_id)
    //         return response
    //     } else if (el.type === 'favs') {
    //         response = await client.query('SELECT * FROM sounds WHERE id = $1', el.target_id)
    //         return response
    //     } else if (el.type === 'reposts') {
    //         response = await client.query('SELECT * FROM sounds WHERE id = $1', el.target_id)
    //         return response
    //     }
    // });

    if (followedArray.length > 0) {
      const getFollowedQuery = {
        name: "fetch-recent-followed",
        text: "SELECT * FROM users WHERE id = any ($1) LIMIT 17",
        values: [followedArray],
      };
      followed = await client.query(getFollowedQuery);
    }
  } catch (err) {
    return next(err);
  } finally {
    client.release();
  }

  let followedFinal = followed ? followed.rows : [];
  let favSoundsFinal = favSounds.rows ? favSounds.rows : [];

  

  res.status(200).json({
    user: user.rows[0],
    sounds: sounds.rows,
    soundsOnlyUser: soundsOnlyuser.rows,
    reposts: [...user.rows],
    userReposts: reposts.rows,
    favSounds: favSoundsFinal,
    actions: actions.rows,
    recentActivities: followedFinal,
  });
  })
export default handler;

