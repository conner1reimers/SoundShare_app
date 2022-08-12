import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';


import loadable from '@loadable/component'

const PlayPauseBtns = loadable(() => import('../../common_reusable/playPauseBtn/PlayPauseBtns'));
const ProgressBar = loadable(() => import('../../globalSoundControls/ProgressBar'));

const SoundPlayer = (props: any) => {
  const sid = useSelector((state: RootState) => state.singleSound.sound.id);
  const path = useSelector((state: RootState) => state.singleSound.sound.path);
  const soundType = useSelector((state: RootState) => state.singleSound.sound.type);

  const gpuTier = useSelector((state: RootState) => state.ui.gpuTier);
  const dispatch = useDispatch();

  useEffect(() => {
    if (gpuTier && !gpuTier.isMobile) {
        dispatch({type: "SET_GLOBALSOUND_SINGLESOUND", sid, path, soundType});
    } 
  }, [dispatch, gpuTier, sid, path, soundType]);

  return (
    <div className="single-sound--player">
      <div className="single-sound--player--container">
        <div className="single-sound--player--controls">
          <PlayPauseBtns global singleSound sid={sid} path={path} soundType={soundType} />
        </div>
        <div className="single-sound--player--progress">
          <ProgressBar key={sid} singleSound global small2={props.matches.small}/>
        </div>
      </div>
    </div>
  )
}

export default SoundPlayer;