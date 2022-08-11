import safeJsonStringify from 'safe-json-stringify';
import HttpError from '../server/models/http-error';
import db from '../server/util/queries';

import { call, takeLatest } from 'redux-saga/effects';
import { startAction, stopAction } from '../store/actions/uiActions';
import { sendRequest, loadAndCall } from './util';

////////////////////////////////////////////////////////////////////////////////////
// CHECK COOKIE //
const checkForCookie = async () => {
  let result;
  try {
    result = await sendRequest('/users/checkForCookie');
    return result;
  } catch (err) {}
};


function* checkForCookieAsync(action) {
  try {
    yield call(loadAndCall, checkForCookie, startAction(action.type),
      stopAction(action.type), "CHECK_COOKIE_ASYNC", null, false);
  } catch(err) {}
}

export function* watchCheckForCookie() {
  yield takeLatest("CHECK_COOKIE", checkForCookieAsync);
}

////////////////////////////////////////////////////////////////////////////////////





////////////////////////////////////////////////////////////////////////////////////
// GET USER //
const fetchUser = async (id) => {
  let result;
  try {
    result = await sendRequest(`/users/getUser/${id}`);
    const dateNow = new Date();
    const joinDate = new Date(result.user.join_date);
    const daysSince = Math.floor(
      (dateNow.getTime() - joinDate.getTime()) / (1000 * 3600 * 24)
    );

    return {
      ...result,
      user: {
        ...result.user,
        join_date: JSON.parse(safeJsonStringify(joinDate)),
        days: daysSince,
      },
      refreshOptions: {
        offsetSounds: result.soundsOnlyUser.length,
        offsetReposts: result.userReposts.length,
        offsetFavs: result.favSounds.length,
        soundFinished: result.soundsOnlyUser.length < 17,
        repostFinished: result.userReposts.length < 17,
        favFinished: result.favSounds.length < 17,


      },

      following: false,
      loading: false
      
    };
  } catch (err) {

    if (err.message === "Cannot read property 'sounds' of undefined") {
      
    }
  }
}; 


function* fetchUserAsync(action) {
  try {
    yield call(loadAndCall, fetchUser, startAction(action.type),
      stopAction(action.type), "FETCH_USER_ASYNC", action.id, false);
  } catch(err) {}
}

export function* watchFetchUser() {
  yield takeLatest("FETCH_USER", fetchUserAsync);
}

////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////
// GET USER SERVER //

const fetchUserServer = async (userId) => {
  let result;
  

  let client;


  try {
    client = await db.connect();
  } catch (err) {
    console.log(err);
    throw err;
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

    if (followedArray.length > 0) {
      const getFollowedQuery = {
        name: "fetch-recent-followed",
        text: "SELECT * FROM users WHERE id = any ($1) LIMIT 17",
        values: [followedArray],
      };
      followed = await client.query(getFollowedQuery);
    }
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }

  let followedFinal = followed ? followed.rows : [];
  let favSoundsFinal = favSounds.rows ? favSounds.rows : [];

  

  result = {
    user: user.rows[0],
    sounds: sounds.rows,
    soundsOnlyUser: soundsOnlyuser.rows,
    reposts: [...user.rows],
    userReposts: reposts.rows,
    favSounds: favSoundsFinal,
    actions: actions.rows,
    recentActivities: followedFinal,
  };


    const dateNow = new Date();
    const joinDate = new Date(result.user.join_date);
    const daysSince = Math.floor(
      (dateNow.getTime() - joinDate.getTime()) / (1000 * 3600 * 24)
    );

    return JSON.stringify({
      ...result,
      user: {
        ...result.user,
        join_date: JSON.parse(safeJsonStringify(joinDate)),
        days: daysSince,
      },
      refreshOptions: {
        offsetSounds: result.soundsOnlyUser.length,
        offsetReposts: result.userReposts.length,
        offsetFavs: result.favSounds.length,
        soundFinished: result.soundsOnlyUser.length < 17,
        repostFinished: result.userReposts.length < 17,
        favFinished: result.favSounds.length < 17,


      },

      following: false,
      loading: false
      
    });

};

function* fetchUserServerAsync(action) {
  try {
    yield call(loadAndCall, fetchUserServer, startAction(action.type),
      stopAction(action.type), "FETCH_USER_SERVER_ASYNC", action.id, true);
  } catch(err) {}
}



export function* watchFetchUserServer() {
  yield takeLatest("FETCH_USER_SERVER", fetchUserServerAsync);
}



////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////
// GET LOGGED IN USER //
const fetchLoggedUser = async (uid) => {
  let result = await sendRequest(`/users/getLoggedUser/${uid}`);
  return {
    user: result.gotUser[0],
    notifications: result.notifications,
  };
};

function* fetchLoggedUserAsync(action) {
  try {
    yield call(loadAndCall, fetchLoggedUser, startAction(action.type),
      stopAction(action.type), "FETCH_LOGGED_USER_ASYNC", action.uid, false);
  } catch(err) {}
}

export function* watchFetchLoggedUser() {
  yield takeLatest("FETCH_LOGGED_USER", fetchLoggedUserAsync);
}


////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////
// GET USER FOLLOWERS //
const fetchFollowers = async (followers) => {
  let result;

  if (followers.length > 0) {
    result = await sendRequest(`/users/followers/${followers.join(',')}`);
    return result.followers;

  } else return [];
  
};



function* fetchFollowersAsync(action) {
  try {
    yield call(loadAndCall, fetchFollowers, startAction(action.type),
      stopAction(action.type), "FETCH_FOLLOWERS_ASYNC", action.followers, false);
  } catch(err) {}
}

export function* watchFetchFollowers() {
  yield takeLatest("FETCH_FOLLOWERS", fetchFollowersAsync);
}

////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////
// GET USER FOLLOWERS //
function* fetchFeedAsync(action) {
  try {
    yield call(loadAndCall, async() => await sendRequest(`/users/feed/${action.uid}/${action.following}`), startAction(action.type),
      stopAction(action.type), "FETCH_FEED_ASYNC", null, false);
  } catch(err) {}
}

export function* watchFetchFeed() {
  yield takeLatest("FETCH_FEED", fetchFeedAsync);
}

////////////////////////////////////////////////////////////////////////////////////
