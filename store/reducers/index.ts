import { combineReducers } from "redux";
import recentSoundReducer from "./recentSound";
import globalPlayingReducer from "./globalPlaying";
import userReducer from "./user";
import progressStateReducer from "./progressState";
import userPageReducer from "./userPageInfo";
import globalMsgReducer from "./globalMsg";
import uploadReducuer from "./uploadReducer";
import browseReducer from "./browseReducer";
import uiReducer from "./uiStateReducer";
import feedReducer from "./feedReducer";
import navbarReducer from "./navbarReducer";
import sideDrawerReducer from "./sideDrawerReducer";
import soundpageReducer from "./soundPageReducer";
import authReducer from "./authReducer";


export const allReducers = combineReducers({
  user: userReducer,
  recentSounds: recentSoundReducer,
  globalSound: globalPlayingReducer,
  progress: progressStateReducer,
  userPage: userPageReducer,
  globalMsg: globalMsgReducer,
  upload: uploadReducuer,
  browse: browseReducer,
  ui: uiReducer,
  feed: feedReducer,
  navbar: navbarReducer,
  sideDrawer: sideDrawerReducer,
  singleSound: soundpageReducer,
  auth: authReducer
});





export type RootState = ReturnType<typeof allReducers>;