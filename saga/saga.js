import { put, takeLatest, call, fork } from "redux-saga/effects";
import {
  refreshActionStart,
  startAction,
  refreshActionStop,
  stopAction,
} from "../store/actions/uiActions";
import safeJsonStringify from 'safe-json-stringify';
import db from '../server/util/queries';



const sendRequest = async (url, method = "GET", body = null, headers = {}) => {
  // TRY CATCH BLOCK FOR SENDING REQUEST WITH THE METHOD, BODY, AND HEADERS WE GIVE IT

  // const httpAbortController = new AbortController();
  // activeHttpRequest.current.push(httpAbortController);
  try {
    const response = await fetch(url, {
      method,
      body,
      headers,
    });
    const responseData = await response.json();

    // activeReq = activeHttpRequest.current.filter(reqCtrl => reqCtrl !== httpAbortController);

    if (!response.ok) {
      throw new Error(responseData.message);
    }


    return responseData;
  } catch (err) {
    
    // CATCH
    throw err;
  }
};

// activeHttpRequest.current.forEach(abortCtrll => abortCtrll.abort())

const fetchSound = async () => {
  let result;
  try {
    result = await sendRequest(`${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds`);
    return result;
  } catch (err) {

  }
};

const fetchSoundServer = async () => {
  const getLikesQueryTxt =
    "SELECT * FROM sounds \
    WHERE array_length(favs, 1) != 0 \
    ORDER BY array_length(favs, 1) DESC \
    fetch first 5 rows only";

  const getSoundsQueryTxt =
    "SELECT * \
    FROM sounds \
    ORDER BY date_time DESC LIMIT 30";  

  const getDownloadsTxt = 'SELECT * from sounds order by downloads desc limit 5';


  let foundLikes;
  let foundSounds;
  let foundDownload;
  let response;

  let client;
  try {
    client = await db.connect();
  } catch (err) {
    return err;

  }

  try {
    foundSounds = await client.query(getSoundsQueryTxt);
    foundLikes = await client.query(getLikesQueryTxt);
    foundDownload = await client.query(getDownloadsTxt);

    response = {
      sounds: foundSounds.rows,
      topLiked: foundLikes.rows,
      topDownloaded: foundDownload.rows,
    };

  } catch (err) {
    return err;
  } finally {
    client.release();
  }

  return JSON.stringify(response);
};




const fetchSoundCategory = async (category) => {
  let result;
  try {
    result = await sendRequest(`${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/recent-more/${category}`);
    return result;
  } catch (err) {
  }
};



const fetchUser = async (id) => {
  let result;
  try {
    result = await sendRequest(`${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/users/getUser/${id}`);
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

const fetchUserServer = async (userId) => {
  let result;
  

  let client;


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

const refreshBrowse = async (query, val, offset, order) => {
  let result;
  let insertVal;

  if (val.length === 0) {
    insertVal = "none";
  } else {
    insertVal = val;
  }

  try {
    result = await sendRequest(
      `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/refreshbrowse/${offset}`, 'POST', 
      JSON.stringify({
        query: query,
        vals: val,
        order: order
        }), 
      {'Content-Type': 'application/json'});

    return result;
  } catch (err) {
    
  }
};

const refreshAllLikes = async (offset) => {
  let result;

  try {
    result = await sendRequest(
      `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/moreTopLikes/${offset}`
    );

    return result.results;
  } catch (err) {
    ;
  }
};

const refreshAllDownloads = async (offset) => {
  let result;

  try {
    result = await sendRequest(
      `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/moreTopDownloads/${offset}`
    );

    return result.results;
  } catch (err) {
    ;
  }
};


const fetchBrowse = async (params) => {
  let response;
  

  if (params.type.text || params.genre.text || params.time.text) {
    try {
      
      let time = params.time.text ? params.time.text.split(" ").join("") : "alltime";
      
      response = await sendRequest(
        `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/browse/${params.category}/${params.genre.text}/${params.type.text}/${time}`
      );
      
      return response;
    } catch (err) {
      
    }
  }
};

const filterBrowse = async (params, lastQuery) => {
  let response;
  const order = lastQuery.lastOrder ? lastQuery.lastOrder : 'none';

  try {
    response = await sendRequest(
      `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/users/filtersoundswquery/${params.category}/${params.keyword}/${params.author}/${params.bpm1}/${params.bpm2}/${params.activeOrderbyOption}`,
      "POST",
      JSON.stringify({
        query: lastQuery.text,
        vals: lastQuery.vals,
        lastOrder: order
      }),
      {'Content-Type': 'application/json'}
      );
    

    return response;
  } catch (err) {
    return err;
  }
};

const fetchFollowers = async (followers) => {
  let result;

  if (followers.length > 0) {
    try {
      result = await sendRequest(
        `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/users/followers/${followers.join(',')}`
      );
      return result.followers;
    } catch (err) {
      ;
    }
  } else {
    return [];
  }
  
};

const fetchFeed = async (uid, following) => {
  let result;
  
  try {
    result = await sendRequest(
      `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/users/feed/${uid}/${following}`
    );
    return result;
  } catch (err) {
    ;
  }
};

const fetchLoggedUser = async (uid) => {
  let result;
  try {
    result = await sendRequest(
      `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/users/getLoggedUser/${uid}`
    );
    return {
      user: result.gotUser[0],
      notifications: result.notifications,
    };
  } catch (err) {
    ;
  }
};

const recentSoundsFetchMore = async (offset, category) => {
  let response;

  try {
    response = await sendRequest(
      `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/moresounds/${category}/${offset}`
    );
    return response;
  } catch (err) {}
};

// takeEvery runs each time the action is dispatched,

// takeEvery provides an in built "debounce" that will only allow state to update one time once the action is finished completely,

function* fetchRecentAsync() {
  const fetched = yield call(fetchSound);

  yield put({
    type: "FETCH_RECENT_ASYNC",
    recents: fetched.sounds,
    topLiked: fetched.topLiked,
    topDownloaded: fetched.topDownloaded
  });
}

function* fetchRecentServerAsync() {
  const fetched = JSON.parse(yield call(fetchSoundServer));

  yield put({
    type: "FETCH_RECENT_SERVER_ASYNC",
    recents: fetched.sounds,
    topLiked: fetched.topLiked,
    topDownloaded: fetched.topDownloaded
  });
}


function* fetchRecentCategoryAsync(action) {
  const fetched = yield call(fetchSoundCategory, action.category);
  yield put({
    type: "FETCH_RECENT_CAT_ASYNC",
    recents: fetched.sounds
    
  });
}


const fetchTopLikedSounds = async () => {
  let result;
  try {
    result = await sendRequest(`${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/top/likes`);
    return result;
  } catch (err) {
    ;
  }
};

const fetchTopDownloadedSounds = async () => {
  let result;
  try {
    result = await sendRequest(`${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/top/downloads`);
    return result;
  } catch (err) {
    ;
  }
};


const checkForCookie = async () => {
  let result;
  try {
    result = await sendRequest(`${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/users/checkForCookie`);
    
    return result;
  } catch (err) {
    ;
  }
};


export function* watchFetchRecentSounds() {
  yield takeLatest("FETCH_RECENT", fetchRecentAsync);
}

export function* watchFetchRecentSoundsServer() {
  yield takeLatest("FETCH_RECENT_SERVER", fetchRecentServerAsync);
}

function* fetchUserAsync(action) {
  try {
    yield put(startAction(action.type));
    const fetched = yield call(fetchUser, action.id);
    yield put({ type: "FETCH_USER_ASYNC", result: fetched });
  } catch (err) {
    ;
  } finally {
    yield put(stopAction(action.type));
  }
}
function* fetchUserServerAsync(action) {
  try {
    yield put(startAction(action.type));
    const fetched = JSON.parse(yield call(fetchUserServer, action.id));

    yield put({ type: "FETCH_USER_SERVER_ASYNC", result: fetched });
  } catch (err) {
  } finally {
    yield put(stopAction(action.type));
  }
}

export function* watchFetchUser() {
  yield takeLatest("FETCH_USER", fetchUserAsync);
}

export function* watchFetchUserServer() {
  yield takeLatest("FETCH_USER_SERVER", fetchUserServerAsync);
}




export function* watchFetchRecentSoundsCategory() {
  yield takeLatest("FETCH_RECENT_CATEGORY", fetchRecentCategoryAsync);
}


function* fetchBrowseAsync({ type, payload }) {
  const { refreshing } = payload;
  try {
    yield put(refreshing ? refreshActionStart(type) : startAction(type));

    let fetched;
    if (payload.browseType === "filterWquery") {
      fetched = yield call(filterBrowse, payload.params, payload.lastQuery);
    } else {
      fetched = yield call(fetchBrowse, payload.params);
    }

    yield put({ type: "FETCH_BROWSE_ASYNC", results: fetched });
  } catch (err) {
    ;
  } finally {
    yield put(refreshing ? refreshActionStop(type) : stopAction(type));
  }
}

export function* watchFetchBrowse() {
  yield takeLatest("FETCH_BROWSE", fetchBrowseAsync);

}

function* fetchFollowersAsync(action) {
  try {
    yield put(startAction(action.type));
    const fetched = yield call(fetchFollowers, action.followers);
    yield put({ type: "FETCH_FOLLOWERS_ASYNC", results: fetched });
  } catch (err) {
    ;
  } finally {
    yield put(stopAction(action.type));
  }
}

export function* watchFetchFollowers() {
  yield takeLatest("FETCH_FOLLOWERS", fetchFollowersAsync);
}

function* fetchLoggedUserAsync(action) {
  try {
    yield put(startAction(action.type));
    const fetched = yield call(fetchLoggedUser, action.uid);
    yield put({ type: "FETCH_LOGGED_USER_ASYNC", results: fetched });
  } catch (err) {
    ;
  } finally {
    yield put(stopAction(action.type));
  }
}

export function* watchFetchLoggedUser() {
  yield takeLatest("FETCH_LOGGED_USER", fetchLoggedUserAsync);
}

function* fetchFeedAsync(action) {
  try {
    yield put(startAction(action.type));
    const fetched = yield call(fetchFeed, action.uid, action.following);
    yield put({ type: "FETCH_FEED_ASYNC", results: fetched });
  } catch (err) {
    ;
  } finally {
    yield put(stopAction(action.type));
  }
}

export function* watchFetchFeed() {
  yield takeLatest("FETCH_FEED", fetchFeedAsync);
}

function* refreshBrowseAsync(action) {
  try {
    yield put(startAction(action.type));
    const fetched = yield call(
      refreshBrowse,
      action.query,
      action.vals,
      action.offset,
      action.order
    );
    yield put({ type: "REFRESH_BROWSE_ASYNC", results: fetched });
  } catch (err) {
    ;
  } finally {
    yield put(stopAction(action.type));
  }
}

export function* watchRefreshBrowse() {
  yield takeLatest("REFRESH_BROWSE", refreshBrowseAsync);
}

function* recentSoundsFetchMoreAsync(action) {
  try {
    yield put(startAction(action.type));
    const fetched = yield call(recentSoundsFetchMore, action.offset, action.category);
    yield put({ type: "FETCH_RECENT_MORE_ASYNC", results: fetched });
  } catch (err) {} 
  finally {
    yield put(stopAction(action.type));
  }
}

export function* watchrecentSoundsFetchMore() {
  yield takeLatest("FETCH_RECENT_MORE", recentSoundsFetchMoreAsync);
}


function* fetchTopDownloadsAsync(action) {
  try {
    yield put(startAction(action.type));
    const fetched = yield call(fetchTopDownloadedSounds);
    yield put({ type: "FETCH_TOP_DOWNLOADS_ASYNC", result: fetched });
  } catch (err) {
    ;
  } finally {
    yield put(stopAction(action.type));
  }
}

export function* watchFetchTopDownloads() {
  yield takeLatest("FETCH_TOP_DOWNLOADS", fetchTopDownloadsAsync);
}

function* fetchTopLikedAsync(action) {
  try {
    yield put(startAction(action.type));
    const fetched = yield call(fetchTopLikedSounds);
    yield put({ type: "FETCH_TOP_LIKED_ASYNC", result: fetched });
  } catch (err) {
    ;
  } finally {
    yield put(stopAction(action.type));
  }
}

export function* watchFetchTopLiked() {
  yield takeLatest("FETCH_TOP_LIKED", fetchTopLikedAsync);
}



function* refreshAllLikesAsync(action) {
  try {
    yield put(startAction(action.type));
    const fetched = yield call(
      refreshAllLikes,
      action.offset
    );
    yield put({ type: "REFRESH_ALL_LIKES_ASYNC", results: fetched });
  } catch (err) {
    ;
  } finally {
    yield put(stopAction(action.type));
  }
}

export function* watchRefreshAllLikes() {
  yield takeLatest("REFRESH_ALL_LIKES", refreshAllLikesAsync);
}

function* refreshAllDownloadsAsync(action) {
  try {
    yield put(startAction(action.type));
    const fetched = yield call(
      refreshAllDownloads,
      action.offset
    );
    yield put({ type: "REFRESH_ALL_DOWNLOADS_ASYNC", results: fetched });
  } catch (err) {
    ;
  } finally {
    yield put(stopAction(action.type));
  }
}

export function* watchRefreshAllDownloads() {
  yield takeLatest("REFRESH_ALL_DOWNLOADS", refreshAllDownloadsAsync);
}


function* checkForCookieAsync(action) {
  try {
    yield put(startAction(action.type));
    const fetched = yield call(checkForCookie);
    yield put({ type: "CHECK_COOKIE_ASYNC", results: fetched });
  } catch (err) {
    ;
  } finally {
    yield put(stopAction(action.type));
  }
}

export function* watchCheckForCookie() {
  yield takeLatest("CHECK_COOKIE", checkForCookieAsync);
}

const BPMSearch = async (bpm) => {
  let response;

    try {
      response = await sendRequest(
        `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/search-bpm/${bpm}`
      );
      
      return response;
    } catch (err) {}
};


function* BPMSearchAsync(action) {
  try {
    yield put({ type: "MAIN_LOADER_START" });
    const fetched = yield call(BPMSearch, action.bpm);
    yield put({ type: "FETCH_BROWSE_ASYNC", results: fetched });
  } catch (err) {} finally {
    yield put({ type: "MAIN_LOADER_FINISH" });
  }
}

export function* watchBPMSearch() {
  yield takeLatest("SEARCH_BPM", BPMSearchAsync);
}


function* rootSaga() {
  yield fork(watchFetchRecentSounds);
  yield fork(watchFetchRecentSoundsCategory);
  yield fork(watchFetchUser);
  yield fork(watchFetchBrowse);
  yield fork(watchFetchFollowers);
  yield fork(watchFetchLoggedUser);
  yield fork(watchFetchFeed);
  yield fork(watchRefreshBrowse);
  yield fork(watchrecentSoundsFetchMore);
  yield fork(watchFetchTopDownloads);
  yield fork(watchFetchTopLiked);
  yield fork(watchRefreshAllDownloads);
  yield fork(watchRefreshAllLikes);
  yield fork(watchCheckForCookie);
  yield fork(watchBPMSearch);
  yield fork(watchFetchRecentSoundsServer);
  yield fork(watchFetchUserServer);


}

export default rootSaga;
