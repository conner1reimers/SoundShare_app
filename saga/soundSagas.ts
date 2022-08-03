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
      "FETCH_RECENT_CAT_ASYNC", null, false
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




///////////////////////////////////////////////////////////////////////////////////
// SINGLE SOUND SERVER

const fetchSingleSoundServer = async (soundId) => {

  let queryText = "SELECT * FROM sounds WHERE id = $1";

  let soundVal = [soundId];
  let response;
  let client;
  let finalSound = null;
  try {
    client = await db.connect();
  } catch (err) {
    client.release();
  }

  try {
    response = await client.query(queryText, soundVal);

    let commentQueryTxt = 
      "select c.id as com_id, c.comment_date, c.message, c.creator_id as comment_creator, \
      u.user_img_path, u.username from comments c join users u on u.id = c.creator_id WHERE \
      c.id = any ($1) ORDER BY comment_date DESC LIMIT 20";
    
    let comVals = [response.rows[0].comments] || null;
    const { rows } = await client.query(commentQueryTxt, comVals);



    if (response.rows) {
      return JSON.stringify({
        sound: response.rows[0],
        comments: rows,
        offset: rows.length,
        refreshFinished: rows.length !== 20
      }
      );
    }
    

  } catch (err) {
    throw err
  } finally {
    client.release();
  }
}

function* fetchSingleSoundServerAsync(action) {
  try {
    yield call(loadAndCall, fetchSingleSoundServer, startAction(action.type),
      stopAction(action.type), "FETCH_SINGLE_SOUND_SERVER_ASYNC", action.sid, true);
  } catch(err) {}
}



export function* watchFetchSingleSoundServer() {
  yield takeLatest("FETCH_SINGLE_SOUND_SERVER", fetchSingleSoundServerAsync);
}

///////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////
// SINGLE SOUND SERVER

function* fetchSingleSoundAsync(action) {
  console.log(action)
  try {
    yield call(loadAndCall, async () => await sendRequest(`/sounds/${action.sid}`), startAction(action.type),
      stopAction(action.type), "FETCH_SINGLE_SOUND_ASYNC", action.id, false);
  } catch(err) {}
}



export function* watchFetchSingleSound() {
  yield takeLatest("FETCH_SINGLE_SOUND", fetchSingleSoundAsync);
}

///////////////////////////////////////////////////////////////////////////////////