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
import { GlobalPlayingState } from "../../../store/reducers/globalPlaying";
import { UploadState } from "../../../store/reducers/uploadReducer";
import { UiState } from "../../../store/reducers/uiStateReducer";
import Image from "next/image";
import play from "../../../util/img/newplay.svg";
import pause from "../../../util/img/newpause.svg";
import FF from "../../../util/img/FF.svg";


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
          <Image src={FF} alt="" />
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
          <Image src={FF} alt="" />
        </button>
      )}
      {!noarrow && fx && (
        <button
          className={`btn nohover ${global ? "globalPlay" : ""} right-fx`}
          type="button"
          onClick={nextSound}
        >
          <Image src={FF} alt="" />
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
            <Image src={pause} alt="" />
          </button>
        ) : (
          <button className="btn nohover" type="button" onClickCapture={pauseOrPlay}>
            <Image src={play} alt="" />
          </button>
        )}
      </Fragment>) : (<Fragment>
          {isPlaying ? (
          <button
            className={`btn nohover ${global ? "globalPlay" : ""}`}
            type="button"
            onTouchStart={pauseOrPlay}
          >
            <Image src={pause} alt="" />
          </button>
        ) : (
          <button className="btn nohover" type="button" onTouchStartCapture={pauseOrPlay}>
            <Image src={play} alt="" />
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
      <Image src={pause} alt="" />
    </button>
  ) : (
    <button className="btn nohover" type="button" onClick={pauseOrPlay}>
      <Image src={play} alt="" />
    </button>
  )



});

PlayPauseFx.displayName="playpausefx"


export default React.memo(PlayPauseBtns);

