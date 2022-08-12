import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttpClient } from "../../util/hooks/http-hook";
import repost from "../../public/item-repost.svg";
import repostRed from "../../public/repost-red.svg";
import MouseOverLabel from "../shared/MouseOverLabel";
import BallLoader from "../animatedLoaders/BallLoader/BallLoader";

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
  username?: any,
  creator?: any,
  setCount?: any,
  singlesound?: any,
  isReposted?: any,
  global?: any
}

const RepostButton: React.FC<Props> = ({soundId, username, creator: creatorProp, setCount, singlesound, isReposted: isRepostedProp,  global}) => {
  const reposts = useSelector((state: any) => state.user.full.reposts);
  const userId = useSelector((state: any) => state.user.userId);
  const token = useSelector((state: any) => state.user.token);
  const { isLoading, sendRequest } = useHttpClient();
  const [isReposted, setIsReposted] = useState<any>(false);
  const dispatch = useDispatch();

  const repostSound = async (e: any) => {
    if (!singlesound && reposts) {
      let response;
      let creator: any;
      e.preventDefault();
      e.stopPropagation();
      if (!creatorProp) {
        creator = 1;
      } else {
        creator = creatorProp;
      }
      try {
        
        response = await sendRequest(
          `/sounds/repost/${userId}/${soundId}/${creator}/`,
          "POST",
          null,
          { "Authorization": "Bearer "+token}
        );
        if (response.msg === "removed") {
          setIsReposted(false);
          setCount((prevState: any) => prevState - 1);
          dispatch({type: "USER_UNREPOST_SOUND", id: soundId});

        } else if (response.msg === "reposted") {
          setIsReposted(true);
          setCount((prevState: any) => prevState + 1);
          dispatch({type: "USER_REPOST_SOUND", id: soundId});
        }
        
      } catch (err) {}
    }
  };

  useEffect(() => {
    if (reposts) {
      if (reposts.indexOf(soundId.toString()) !== -1) {
        setIsReposted(true);
      } else if (isReposted) {
        setIsReposted(false);
      }
    }
  }, [reposts, userId, soundId]);

  useEffect(() => {
    if (isRepostedProp && !isReposted) {
      setIsReposted(true);
    } else if (!isRepostedProp && isReposted) {
      setIsReposted(true);
    } else if (!isRepostedProp && !isReposted) {
      setIsReposted(false);
    } 
  }, [isReposted]);


  useEffect(() => {
    let try1: any = document.querySelector('.single-sound--repost');

    let element: any;

    if (try1) {
      element = try1.querySelector('.action-heart-img-contain');

    }
      
      if (element) {
        let el: any = element.childNodes[0];
        el.style.overflow = "visible";
        
        }
    }, []);



  return (
    <Fragment>
      <div className="load-absolute action-ball-load">
        <BallLoader loading={isLoading} repost global={global}/>
      </div>

      <MouseOverLabel
        singlesound={singlesound}
        circle
        label="Repost sound"
        labelClass="circle-btn-mouseover--label"
        classname="circle-btn-mouseover"
      >
        <button
          onClick={repostSound}
          type="button"
          className={`btn nohover ${
            isReposted && "reposted-active active"
          } ${!singlesound ? 'heart-absolute' : ''}`}
        >
          <AnimatePresence exitBeforeEnter>
            {isReposted && (
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
                    src={repostRed}
                    alt=""
                    className="circle-img"
                    layout="fill"
                    />
                </div>

              
              </motion.div>
            )}
            {!isReposted && (
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
                    src={repost}
                    alt=""
                    className="circle-img"
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

export default React.memo(RepostButton);
