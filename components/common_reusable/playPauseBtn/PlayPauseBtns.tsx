import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  playGlobalSound,
  pauseGlobalSound,
  pauseFx,
  playFx,
  playAndSetGlobalSound,
} from "../../../store/actions";
import { useChangeSound } from "../../../util/hooks/useChangeSound";
import { GlobalPlayingState } from "../../../store/reducers/global/globalPlaying";
import { UploadState } from "../../../store/reducers/ui/uploadReducer";
import { UiState } from "../../../store/reducers/ui/uiStateReducer";
import Image from "next/image";
import play from "../../../public/newplay.svg";
import pause from "../../../public/newpause.svg";
import FF from "../../../public/FF.svg";


interface Props {
  small?: any,
  noarrow?: any,
  global?: any,
  fxglobe?: any,
  fx?: any,
  uploadPrev?: any,
  sound?: any,
  singleSound?: any
}

interface Root {
  globalSound: GlobalPlayingState,
  ui: UiState,
  upload: UploadState
}




const PlayPauseBtns: React.FC<Props> = ({small, noarrow, global, fxglobe, fx, uploadPrev, sound, singleSound}) =>  {
  const { nextSound, prevSound } = useChangeSound();

  return (
    <div
      className={`recent-sounds--list--item--player 
                    ${small && "playerBtns-small"} 
                    ${global ? "globalPlay" : ""}
                    ${fxglobe ? "globalPlay-fx-overwrite" : ""}`}
    >
      {!noarrow && (
        <button
          className="btn nohover rotate"
          type="button"
          onClick={prevSound}
        >
          <Image src={FF} alt="" height={30} width={30}/>
        </button>
      )}

      {!fx && <PlayPause uploadPrev={uploadPrev} singleSound={singleSound} sound={sound} global={global} />}

      {fx && <PlayPauseFx global={global} />}

      {!noarrow && !fx && (
        <button
          className={`btn nohover ${global ? "globalPlay" : ""} right`}
          type="button"
          onClick={nextSound}
        >
          <Image src={FF} alt="" height={30} width={30}/>
        </button>
      )}
      {!noarrow && fx && (
        <button
          className={`btn nohover ${global ? "globalPlay" : ""} right-fx`}
          type="button"
          onClick={nextSound}
        >
          <Image height={30} width={30} src={FF} alt="" />
        </button>
      )}
    </div>
  );
};

const PlayPause: React.FC<Props> = React.memo(({global, sound, singleSound}) => {
  const isPlaying = useSelector((state: Root) => state.globalSound.playing);
  const dispatch = useDispatch();
  const gpuTier = useSelector((state: Root) => state.ui.gpuTier);
  const [singleStarted, setSingleStarted] = useState(false);

  const pauseOrPlay = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (gpuTier.isMobile && singleSound && !singleStarted) {
      setSingleStarted(true);
      dispatch(playAndSetGlobalSound(sound))
    }

    else {
      if (isPlaying) {
        dispatch(pauseGlobalSound());
      } else {
        dispatch(playGlobalSound());
      }
    }
  };
  
  

  return (
    <Fragment>
      {gpuTier && <Fragment>
        {!gpuTier.isMobile ? (<Fragment>
          {isPlaying ? (
          <button
            className={`btn nohover ${global ? "globalPlay" : ""}`}
            type="button"
            onClick={pauseOrPlay}
          >
            <Image height={45} width={45} src={pause} alt="yhy" />
          </button>
        ) : (
          <button className="btn nohover" type="button" onClickCapture={pauseOrPlay}>
            <Image src={play} alt="" height={45} width={45} />
          </button>
        )}
      </Fragment>) : (<Fragment>
          {isPlaying ? (
          <button
            className={`btn nohover ${global ? "globalPlay" : ""}`}
            type="button"
            onTouchStart={pauseOrPlay}
          >
            <Image height={20} width={20} src={pause} alt="mmm" />
          </button>
        ) : (
          <button className="btn nohover" type="button" onTouchStartCapture={pauseOrPlay}>
            <Image height={20} width={20} src={play} alt="vvv" />
          </button>
        )}
      </Fragment>)}
    </Fragment>}
  </Fragment>)
});

PlayPause.displayName = "DISPLAY";

const PlayPauseFx: React.FC<Props> = React.memo(({global}) => {
  const isPlaying = useSelector((state: Root) => state.upload.fxState.playing);
  const dispatch = useDispatch();

  const pauseOrPlay = (e: any) => {
    e.preventDefault();

    if (isPlaying) {
      dispatch(pauseFx());
    } else {
      dispatch(playFx());
    }
  };

  return isPlaying ? (
    <button
      className={`btn nohover ${global ? "globalPlay" : ""}`}
      type="button"
      onClick={pauseOrPlay}
    >
      <Image height={20} width={20} src={pause} alt="" />
    </button>
  ) : (
    <button className="btn nohover" type="button" onClick={pauseOrPlay}>
      <Image height={20} width={20} src={play} alt="" />
    </button>
  )



});

PlayPauseFx.displayName="playpausefx"


export default React.memo(PlayPauseBtns);

