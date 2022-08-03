import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttpClient } from "../../util/hooks/http-hook";
import { useGlobalMsg } from "../../util/hooks/useGlobalMsg";
import heartItem from "../../public/item-heart.svg";
import redHeart from "../../public/red-heart.svg";
import { AnimatePresence, motion } from "framer-motion";
import MouseOverLabel from "../../util/MouseOverLabel";
import BallLoader from "../animatedLoaders/BallLoader/BallLoader";
import Image from "next/image";

const redVariants = {
  initial: {
    z: "-100%",
    scale: 1.6,
  },
  out: {
    z: "-100%",
    scale: 1.6,
  },
  in: {
    z: "0%",
    scale: 1.6,
  },
};

const redTransition = {
  type: "spring",
  mass: 0.5,
  damping: 90,
  stiffness: 1000,
  velocity: 0.1,
};

const pageVariants = {
  initial: {
    scale: 0,
  },
  out: {
    scale: 0,
  },
  in: {
    scale: 1,
  },
};

const pageTransition = {
  type: "spring",
  mass: 0.5,
  damping: 40,
  stiffness: 500,
  velocity: 1,
};


interface Props {
  soundId: any,
  setCount?: any,
  global?: any
}

const FavButton: React.FC<Props> = ({soundId, setCount, global}) => {
  const favs = useSelector((state: any) => state.user.full.favs);
  const token = useSelector((state: any) => state.user.token);
  const userId = useSelector((state: any) => state.user.userId);
  const { isLoading, sendRequest } = useHttpClient();
  const setGlobalMsgs = useGlobalMsg();
  const dispatch = useDispatch(); 

  const [isLiked, setIsLiked] = useState(false);

  const favSound = async (event: any) => {
    event.stopPropagation();
    event.preventDefault();

    let response;

    if (token) {
      try {
        
        response = await sendRequest(
          `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/fav/${soundId}/${userId}`,
          "POST",
          JSON.stringify({
            userId: userId,
            soundId: soundId,
          }),
          { 
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token
      
          }
        );
        if (response.msg === "unfav") {
          setIsLiked(false);
          setCount((prevState: any) => prevState - 1);
          dispatch({type: "USER_UNFAV_SOUND", id: soundId});
        } else if (response.msg === "fav") {
          setIsLiked(true);
          setCount((prevState: any) => prevState + 1);
          dispatch({type: "USER_FAV_SOUND", id: soundId});

        }
        
      } catch (err) {}
    } else {
      setGlobalMsgs(`Please login to like a sound.`, 'error');
    }
  };

  useEffect(() => {
    if (token) {
      if (favs) {
        if (favs.indexOf(soundId.toString()) !== -1) {
          setIsLiked(true);
        } else if ((isLiked)) {
          setIsLiked(false);
        }
      }
    }
  }, [userId, favs, soundId]);

  return (
    <Fragment>
      <div className="load-absolute action-ball-load">
        <BallLoader global={global} loading={isLoading} />
      </div>

      <MouseOverLabel
        label="Favorite sound"
        labelClass="circle-btn-mouseover--label"
        classname="circle-btn-mouseover"
        circle
      >
        <button
          onClick={favSound}
          type="button"
          className={`btn nohover ${
            isLiked && "reposted-active active"
          } heart-absolute`}
        >
          <AnimatePresence exitBeforeEnter>
            {isLiked && (
              <motion.div
                className="action-heart-img action-heart-img-contain"
                initial="initial"
                animate="in"
                exit="out"
                variants={redVariants}
                transition={redTransition}
                key="red"
              >
                <div className="circle-img-wrapper2">
                  <Image 
                    src={redHeart}
                    alt=""
                    className="action-heart-img"
                    layout="fill"
                    />
                </div>
              </motion.div>
            )}
            {!isLiked && (
              <motion.div
                className="action-heart-img action-heart-img-contain"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                key="blue"
              >
                <div className="circle-img-wrapper2">
                  <Image
                    className="action-heart-img"
                    src={heartItem}
                    alt=""
                    layout="fill"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </MouseOverLabel>
    </Fragment>
  );
};

export default React.memo(FavButton);
