import { combineReducers } from "redux";
import recentSoundReducer from "./sounds/recentSound";
import globalPlayingReducer from "./global/globalPlaying";
import userReducer from "./user/user";
import progressStateReducer from "./global/progressState";
import userPageReducer from "./user/userPageInfo";
import globalMsgReducer from "./global/globalMsg";
import uploadReducuer from "./ui/uploadReducer";
import browseReducer from "./sounds/browseReducer";
import uiReducer from "./ui/uiStateReducer";
import feedReducer from "./user/feedReducer";
import navbarReducer from "./user/navbarReducer";
import sideDrawerReducer from "./ui/sideDrawerReducer";
import soundpageReducer from "./sounds/soundPageReducer";
import authReducer from "./global/authReducer";


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