import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/reducers';


const SoundTypes = ({category}) => {
  const gpuTier = useSelector((state: RootState) => state.ui.gpuTier);
  // const category = useSelector((state: RootState) => state.recentSounds.category);
  const dispatch = useDispatch();


  const setRecentSounds = (e: any) => {
    e.preventDefault();
    dispatch({type: "RECENT_SOUND_CHANGE_CATEGORY", category: e.target.dataset.option});
  }

  return (
  <Fragment>
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
    </Fragment>
  )
}

export default SoundTypes
