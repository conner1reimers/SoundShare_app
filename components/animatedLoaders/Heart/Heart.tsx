import React, {
  useRef,
  useEffect,
  useCallback,
  useContext,
  Fragment,
} from "react";
import animationData from "../animationDatas/heart.json";
import lottie from "lottie-web";
import { useHttpClient } from "../../../util/hooks/http-hook";
import { useSelector, useDispatch } from "react-redux";
import { useGlobalMsg } from "../../../util/hooks/useGlobalMsg";
import BallLoader from "../BallLoader/BallLoader";
import { UserState } from '../../../store/reducers/user/user';
import { SoundState } from "../../../store/reducers/sounds/soundPageReducer";


interface RootStateConst {
  user: UserState,
  singleSound: SoundState
};

const Heart: React.FC = () => {
  let anim: any;
  const container = useRef<any>(null);
  const userId = useSelector((state: RootStateConst) => state.user.userId);
  const token = useSelector((state: RootStateConst) => state.user.token);
  const sid = useSelector((state: RootStateConst) => state.singleSound.sound.id);
  const isFavorited = useSelector((state: RootStateConst) => state.singleSound.sound.isFavorited);


  const { isLoading, sendRequest } = useHttpClient();
  const setGlobalMsgs = useGlobalMsg();
  const dispatch = useDispatch();

  const favSound = async (event: any) => {
    event.preventDefault();
    let response;
    if (userId) {
      try {
        response =
          await sendRequest(`/sounds/fav/${sid}/${userId}`,
          "POST",
          JSON.stringify({
            userId: userId,
            soundId: sid,
          }),
          { "Content-Type": "application/json",
            "Authorization": "Bearer "+token }
        );

        if (response.msg === "unfav") {
          dispatch({type: "USER_UNFAV_SOUND", id: sid});
          dispatch({ type: "SINGLESOUND_UNFAV", payload: userId });

        } else if (response.msg === "fav") {
          dispatch({type: "USER_FAV_SOUND", sid});
          dispatch({ type: "SINGLESOUND_NEW_FAV", payload: userId });
        }

      } catch (err) {}
    } else {
      setGlobalMsgs(`Please login to like a sound.`, 'error');
    }
  };

  useEffect(() => {
    anim = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    });

    if (isFavorited) {
      anim.setDirection(1);
      anim.play();
    }
    try {
      anim.addEventListener("enterFrame", enteredFrameHandler);
    } catch (error) {}

    if (!isFavorited) {
      anim.currentFrame = 55;
      anim.setDirection(-1);
      anim.play();
    }

    return () => {
      anim.destroy();
    };
  }, [isFavorited]);

  const enteredFrameHandler = () => {
    if (anim.currentFrame > 55 && isFavorited) {
      anim.pause();
    } else if (!isFavorited) {
      anim.setDirection(-1);
      anim.play();
    }
  };



  return (
    <Fragment>
      <BallLoader heart loading={isLoading} />
      <div className="single-sound--likes--lottie--contain">
        <div
          onClick={favSound}
          className="lottie single-sound--likes--lottie"
          ref={container}
        />
      </div>
    </Fragment>
  );
};

export default React.memo(Heart);
