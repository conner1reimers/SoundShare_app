import { call, takeLatest } from 'redux-saga/effects';
import { startAction, stopAction } from '../store/actions/uiActions';
import { sendRequest, loadAndCall } from './util';
import db from '../server/util/queries';

////////////////////////////////////////////////////////////////////////////////////
// RECENT SOUNDS //

function* fetchRecentAsync() {
  try {
    yield call(loadAndCall,
        async () => await sendRequest('/sounds'), startAction("FETCH_RECENT_ASYNC"),
      stopAction("FETCH_RECENT_ASYNC"), "FETCH_RECENT_ASYNC", null, false
    );
  } catch(err) {
    console.log(err)
  }
}


export function* watchFetchRecentSounds() {
  yield takeLatest("FETCH_RECENT", fetchRecentAsync);
}
////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////
// FETCH SOUNDS SERVER //
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


  return response;
};
 
function* fetchRecentServerAsync(action) {
  try {
    yield call(loadAndCall, fetchSoundServer, startAction(action.type),
      stopAction(action.type), "FETCH_RECENT_SERVER_ASYNC", null, true);
  } catch(err) {
    console.log(err)
  }
}


export function* watchFetchRecentSoundsServer() {
  yield takeLatest("FETCH_RECENT_SERVER", fetchRecentServerAsync);
}
////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////
// FETCH MORE RECENT SOUNDS //

function* recentSoundsFetchMoreAsync(action) {
  try {
    yield call(loadAndCall,
        async () => await sendRequest(`/sounds/moresounds/${action.category}/${action.offset}`),
        startAction(action.type), stopAction(action.type), "FETCH_RECENT_MORE_ASYNC", null, false
    );
  } catch(err) {
    console.log(err)
  }
}


export function* watchrecentSoundsFetchMore() {
  yield takeLatest("FETCH_RECENT_MORE", recentSoundsFetchMoreAsync);
}

////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////
// FETCH MORE RECENT SOUNDS //



function* fetchRecentCategoryAsync(action) {

  try {
    yield call(loadAndCall, async () => await sendRequest(`/sounds/recent-more/${action.category}`),
      startAction(action.type), stopAction(action.type),
      "FETCH_RECENT_MORE_ASYNC", null, false
    );

  } catch(err) {
    console.log(err)
  }
}


export function* watchFetchRecentSoundsCategory() {
  yield takeLatest("FETCH_RECENT_CATEGORY", fetchRecentCategoryAsync);
}

////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////
// FETCH TOP DOWNLOADS //

function* fetchTopDownloadsAsync(action) {
  try {
    yield call(loadAndCall, async () => await sendRequest('/sounds/top/downloads'),
      startAction(action.type), stopAction(action.type),
      "FETCH_TOP_DOWNLOADS_ASYNC", null, false
    );

  } catch(err) {
    console.log(err)
  }
}

export function* watchFetchTopDownloads() {
  yield takeLatest("FETCH_TOP_DOWNLOADS", fetchTopDownloadsAsync);
}


////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////
// REFRESH TOP DOWNLOADS //

function* refreshAllDownloadsAsync(action) {
  try {
    yield call(loadAndCall,
      async () => { let res = await sendRequest(`/sounds/moreTopDownloads/${action.offset}`); return res.results },
      startAction(action.type), stopAction(action.type),
      "REFRESH_ALL_DOWNLOADS_ASYNC", null, false
    );

  } catch(err) {
    console.log(err)
  }


}

export function* watchRefreshAllDownloads() {
  yield takeLatest("REFRESH_ALL_DOWNLOADS", refreshAllDownloadsAsync);
}

////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////
// REFRESH TOP LIKES //


function* refreshAllLikesAsync(action) {

  try {
    yield call(loadAndCall,
      async () => { let res = await sendRequest(`/sounds/moreTopLikes/${action.offset}`); return res.results },
      startAction(action.type), stopAction(action.type),
      "REFRESH_ALL_LIKES_ASYNC", null, false
    );

  } catch(err) {
    console.log(err)
  }
}

export function* watchRefreshAllLikes() {
  yield takeLatest("REFRESH_ALL_LIKES", refreshAllLikesAsync);
}

////////////////////////////////////////////////////////////////////////////////////


// FETCH TOP LIKES //

function* fetchTopLikedAsync(action) {
  try {
    yield call(loadAndCall, async () => await sendRequest('/sounds/top/likes'),
      startAction(action.type), stopAction(action.type),
      "FETCH_TOP_LIKED_ASYNC", null, false
    );
  } catch(err) {
    console.log(err)
  }
}

export function* watchFetchTopLiked() {
  yield takeLatest("FETCH_TOP_LIKED", fetchTopLikedAsync);
}


////////////////////////////////////////////////////////////////////////////////////
