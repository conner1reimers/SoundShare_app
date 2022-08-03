import { fork } from "redux-saga/effects";

import { 
  watchCheckForCookie, watchFetchUserServer, 
  watchFetchUser, watchFetchLoggedUser,
  watchFetchFollowers, watchFetchFeed
} from "./userSagas";

import { 
  watchFetchRecentSounds, watchFetchRecentSoundsServer, 
  watchrecentSoundsFetchMore, watchFetchRecentSoundsCategory,
  watchFetchTopDownloads, watchRefreshAllDownloads,
  watchFetchTopLiked, watchRefreshAllLikes, watchFetchSingleSound, watchFetchSingleSoundServer 
} from "./soundSagas";

import { 
  watchBPMSearch, watchFetchBrowse, 
  watchRefreshBrowse 
} from "./browseFilterSagas";




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
  yield fork(watchFetchSingleSound);
  yield fork(watchFetchSingleSoundServer);

}

export default rootSaga;
