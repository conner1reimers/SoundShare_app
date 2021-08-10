import { put, takeLatest, call, fork } from "redux-saga/effects";
import {
  refreshActionStart,
  startAction,
  refreshActionStop,
  stopAction,
} from "../store/actions/uiActions";

const sendRequest = async (url, method = "GET", body = null, headers = {}) => {
  // TRY CATCH BLOCK FOR SENDING REQUEST WITH THE METHOD, BODY, AND HEADERS WE GIVE IT

  const httpAbortController = new AbortController();
  // activeHttpRequest.current.push(httpAbortController);
  try {
    const response = await fetch(url, {
      method,
      body,
      headers,
      signal: httpAbortController.signal
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
    result = await sendRequest(`${process.env.REACT_APP_MY_ENV}/sounds`);
    return result;
  } catch (err) {}
};


const fetchSoundCategory = async (category) => {
  let result;
  try {
    result = await sendRequest(`${process.env.REACT_APP_MY_ENV}/sounds/recent-more/${category}`);
    return result;
  } catch (err) {
  }
};



const fetchUser = async (id) => {
  let result;
  try {
    result = await sendRequest(`${process.env.REACT_APP_MY_ENV}/users/getUser/${id}`);
    const dateNow = new Date();
    const joinDate = new Date(result.user.join_date);
    const daysSince = Math.floor(
      (dateNow.getTime() - joinDate.getTime()) / (1000 * 3600 * 24)
    );

    return {
      ...result,
      user: {
        ...result.user,
        join_date: joinDate,
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
      `${process.env.REACT_APP_MY_ENV}/sounds/refreshbrowse/${offset}`, 'POST', 
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
      `${process.env.REACT_APP_MY_ENV}/sounds/moreTopLikes/${offset}`
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
      `${process.env.REACT_APP_MY_ENV}/sounds/moreTopDownloads/${offset}`
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
        `${process.env.REACT_APP_MY_ENV}/sounds/browse/${params.category}/${params.genre.text}/${params.type.text}/${time}`
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
      `${process.env.REACT_APP_MY_ENV}/users/filtersoundswquery/${params.category}/${params.keyword}/${params.author}/${params.bpm1}/${params.bpm2}/${params.activeOrderbyOption}`,
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
        `${process.env.REACT_APP_MY_ENV}/users/followers/${followers.join(',')}`
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
      `${process.env.REACT_APP_MY_ENV}/users/feed/${uid}/${following}`
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
      `${process.env.REACT_APP_MY_ENV}/users/getLoggedUser/${uid}`
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
      `${process.env.REACT_APP_MY_ENV}/sounds/moresounds/${category}/${offset}`
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
    result = await sendRequest(`${process.env.REACT_APP_MY_ENV}/sounds/top/likes`);
    return result;
  } catch (err) {
    ;
  }
};

const fetchTopDownloadedSounds = async () => {
  let result;
  try {
    result = await sendRequest(`${process.env.REACT_APP_MY_ENV}/sounds/top/downloads`);
    return result;
  } catch (err) {
    ;
  }
};


const checkForCookie = async () => {
  let result;
  try {
    result = await sendRequest(`${process.env.REACT_APP_MY_ENV}/users/checkForCookie`);
    
    return result;
  } catch (err) {
    ;
  }
};


export function* watchFetchRecentSounds() {
  yield takeLatest("FETCH_RECENT", fetchRecentAsync);
}

export function* watchFetchRecentSoundsCategory() {
  yield takeLatest("FETCH_RECENT_CATEGORY", fetchRecentCategoryAsync);
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

export function* watchFetchUser() {
  yield takeLatest("FETCH_USER", fetchUserAsync);
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
        `${process.env.REACT_APP_MY_ENV}/sounds/search-bpm/${bpm}`
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

}

export default rootSaga;
