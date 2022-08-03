import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';
import PlayPauseBtns from '../../common_reusable/playPauseBtn/PlayPauseBtns';
import ProgressBar from '../../globalSoundControls/ProgressBar';


const SoundPlayer = (props: any) => {
  const sound = useSelector((state: RootState) => state.singleSound.sound);
  
  return (
    <div className="single-sound--player">
      <div className="single-sound--player--container">
        <div className="single-sound--player--controls">
          <PlayPauseBtns global singleSound sound={sound}/>
        </div>
        <div className="single-sound--player--progress">
          <ProgressBar key={sound.id} singleSound global small2={props.matches.small}/>
        </div>
      </div>
    </div>
  )
}

export default SoundPlayer;