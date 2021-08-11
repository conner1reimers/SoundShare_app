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
import { UserState } from '../../../store/reducers/user';

interface Props {
  soundInfo: any,
  soundId: any,
  setSoundInfo: any,
  setFav: any,
  fav: any

}

interface RootStateConst {
  user: UserState
};

const Heart: React.FC<Props> = ({soundId, soundInfo, setSoundInfo, setFav, fav}) => {
  let anim: any;
  const container = useRef<any>(null);
  const userId = useSelector((state: RootStateConst) => state.user.userId);
  const token = useSelector((state: RootStateConst) => state.user.token);
  const { isLoading, sendRequest } = useHttpClient();
  const setGlobalMsgs = useGlobalMsg();
  const dispatch = useDispatch();

  const favSound = async (event: any) => {
    event.preventDefault();
    let response;
    if (userId) {
      try {
        response = await sendRequest(
          `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/fav/${soundInfo.sound.id}/${userId}`,
          "POST",
          JSON.stringify({
            userId: userId,
            soundId: soundInfo.sound.id,
          }),
          { "Content-Type": "application/json",
            "Authorization": "Bearer "+token }
        );

        if (response.msg === "unfav") {
          dispatch({type: "USER_UNFAV_SOUND", id: soundId});

          setSoundInfo((prev: any) => {
            const newLikes = prev.sound.favs.filter((el: any) => {
              return el !== userId.toString();
            })
            return {
              ...prev,
              sound: {
                ...prev.sound,
                favs: newLikes
              }
            }
          })
        } else if (response.msg === "fav") {
          setSoundInfo((prev: any) => {
            const newFav = [...prev.sound.favs, userId.toString()];
            return {
              ...prev,
              sound: {
                ...prev.sound,
                favs: newFav
              }
            }
          })
          dispatch({type: "USER_FAV_SOUND", id: soundId});

        }
        setFav((prevState: any) => !prevState);

      } catch (err) {
       
      }
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

    if (fav) {
      anim.setDirection(1);
      anim.play();
    }
    try {
      anim.addEventListener("enterFrame", enteredFrameHandler);
    } catch (error) {}

    if (!fav) {
      anim.currentFrame = 55;
      anim.setDirection(-1);
      anim.play();
    }

    return () => {
      anim.destroy();
    };
  }, [fav]);

  const enteredFrameHandler = () => {
    if (anim.currentFrame > 55 && fav) {
      anim.pause();
    } else if (!fav) {
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
