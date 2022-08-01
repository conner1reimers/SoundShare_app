import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import Media from "react-media";
import RecentSide from "./RecentSide";
import { useSelector, useDispatch } from "react-redux";
import SoundList from "./SoundList";
import { RecentSoundState } from "../../store/reducers/recentSound";
import { UiState } from "../../store/reducers/uiStateReducer";
import { wrapper } from "../../store/wrapper";
import { fetchRecentSounds } from "../../store/actions";
import { END } from "@redux-saga/core";

interface Root {
  recentSounds: RecentSoundState,
  ui: UiState
}


const RecentSounds: React.FC = () => {
  const dispatch = useDispatch();
  const category = useSelector((state: Root) => state.recentSounds.category);
  const gpuTier = useSelector((state: Root) => state.ui.gpuTier);

  const setRecentSounds = (e: any) => {
    e.preventDefault();
    dispatch({type: "RECENT_SOUND_CHANGE_CATEGORY", category: e.target.dataset.option});
  }




  return (
    <div className="recent-sounds">
      <div className="recent-sounds--background"></div>

      <div className="recent-sounds--head-contain">
        <div className="recent-sounds--head">
          <Typography color="primary" variant="h1" component="h2">
            Sounds uploaded recently...
          </Typography>

          {gpuTier && (
          
          <div className={`recent-sound-options ${gpuTier.isMobile ? 'recent-sound-options-mobile' : ''}`}>
            <div className={`recent-sound-options--contain ${category === 'all' ? 'recent-sound-options--active' : ''}`} data-option="all" onClick={setRecentSounds}>
              <span>ALL SOUNDS</span>
            </div>
            <div className={`recent-sound-options--contain ${category === 'fx' ? 'recent-sound-options--active' : ''}`} data-option="fx" onClick={setRecentSounds}>
              <span>SHORT SOUNDS</span>
            </div>
            <div className={`recent-sound-options--contain ${category === 'loops' ? 'recent-sound-options--active' : ''}`} data-option="loops" onClick={setRecentSounds}>
              <span>MUSIC LOOPS</span>
            </div>
            <div className={`recent-sound-options--contain ${category === 'vocal' ? 'recent-sound-options--active' : ''}`} data-option="vocal" onClick={setRecentSounds}>
              <span>RAW VOCALS</span>
            </div>
          </div>)}
          
        </div>
      </div>

      <div className={`recent-sounds--listcontainer ${category === 'vocal' ? 'recent-sounds--listcontainer--vocal' : ''}`}>
        <SoundList />
      </div>

      <Media query="(min-width: 1100px)">
        <RecentSide />
      </Media>
    </div>
  );
};





export default React.memo(RecentSounds);
