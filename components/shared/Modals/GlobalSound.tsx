import React, {
  useEffect,
  Fragment,
  useState,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom";
import unknown from "../../../public/unknown.svg";
import downArrow from "../../../public/down-arrow.svg";
import Media from "react-media";
import { useSelector, useDispatch } from "react-redux";
import {
  hideGlobalSound,
  resetGlobalSound,
  changeGlobalVolume,
  muteGlobalSound,
} from "../../../store/actions/globalSound";
import { resetProgress } from "../../../store/actions";
import vol from "../../../public/volume.svg";
import mute from "../../../public/mute.svg";
import { Slider } from "@material-ui/core";
import blueX from "../../../public/x-blue.svg";
import { useChangePage } from "../../../util/hooks/changePage";
import { useHttpClient } from "../../../util/hooks/http-hook";
import Image from "next/image";
import GlobalSoundHidden from "./GlobalSoundHidden";
import RepostButton from "../../common_reusable/RepostButton";
import FavButton from "../../common_reusable/FavButton";
import PlayPauseBtns from "../../common_reusable/playPauseBtn/PlayPauseBtns";
import InPageLoadSpinner from "../../animatedLoaders/InPageLoad/InPageLoadSpinner";
import DownloadButton from "../../common_reusable/DownloadButton";
import ProgressBar from "../../globalSoundControls/ProgressBar";
import { styled } from '@material-ui/core/styles';

const optionsVariants = {
  initial: {
    y: "150%",
    opacity: 0.9,
  },
  out: {
    y: "200%",
    opacity: 0,
  },
  in: {
    y: "0%",
    opacity: 1,
  },
};

const optionsTransition = {
  type: "spring",
  mass: 0.5,
  damping: 27,
  stiffness: 220,
  velocity: 1,
};

const volumeVariants = {
  initial: {
    x: "-10%",
    y: "2%",
    opacity: 0.6,
  },
  out: {
    x: "-100%",
    y: "0%",
    opacity: 0,
  },
  in: {
    x: "20%",
    y: "0%",
    opacity: 1,
  },
};

const volumeTransition = {
  type: "spring",
  mass: 1,
  damping: 231,
  stiffness: 1250,
  velocity: 1,
};

const GlobalSound: React.FC = React.memo(() => {
  const { sound, active, playing, hiddenOpen, volume } = useSelector(
    (state: any) => state.globalSound
  );
  const aModalIsOpen = useSelector((state: any) => state.globalMsg.aModalIsOpen);
  const gpuTier = useSelector((state: any) => state.ui.gpuTier);

  const dispatch = useDispatch();

  const closePlayer = () => {
    dispatch(hideGlobalSound());
  };

  const [isVis, setIsVis] = useState(false);

  const complica = async () => {
    setTimeout(() => {
      setIsVis(false);
    }, 50);
  };

  const mouseOverHandler = (event: any) => {
    if (!isVis) setIsVis(true);
  };
  const mouseLeaveHandler = (event: any) => {
    complica();
  };

  useEffect(() => {
    return () => {
      dispatch(resetGlobalSound());
      dispatch(resetProgress());
    };
  }, []);

  const PrettoSlider = styled(Slider)({
    root: {
      color: "rgba(108, 121, 124, 0.24)",
      height: 8,
    },
    thumb: {
      height: 20,
      width: 20,
      backgroundColor: "#53C9CC",
      marginTop: -4,
      marginLeft: -12,
      "&:focus, &:hover, &$active": {
        boxShadow: "inherit",
      },
    },
    active: {
      color: "rgba(108, 121, 124, 1)",
      backgroundColor: "#9ac1d0",
      zIndex: 9,
      valueLabel: {
        left: "-10%",
        fontSize: "1.2rem",
        transform: "scale(2)",
        color: "1b1f1f",
        height: "20rem",
      },
    },
    valueLabel: {
      left: "-10%",
      bottom: "5vh",
      fontSize: "1.2rem",
      color: "rgb(10, 12, 12)",
      height: "20rem",
    },
    track: {
      height: 14,
      borderRadius: "10px",
    },
    rail: {
      height: 14,

      borderRadius: "10px",
      backgroundColor: "rgba(108, 121, 124, 0.24)",
    },
    mark: {
      color: "#CE665C",
      backgroundColor: "#4324",
    },
  });



  const valuetext = (e: any) => {
    return `${0} Degs`;
  };

  const muteVolume = () => {
    if (volume !== 0) {
      dispatch(muteGlobalSound());
    } else {
      dispatch(changeGlobalVolume(50));
    }
  };

  const closeHidden = () => {
    dispatch(resetGlobalSound());
  };

  const { gotoSingleSoundPage, goToUserPage } = useChangePage();

  let name: any;
  let last: any;
  if (sound.name) {
    if (sound.name.length > 25) {
      name = sound.name.substring(0, 25); //cuts to 25
      last = name.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
      name = name.substring(0, last); //cuts from last space (to avoid cutting the middle of a word)
      name = name + `...`; //adds (...) at the end to show that it's cut
    } else {
      name = sound.name;
    }
  }

  let final = process.browser ? ReactDOM.createPortal(
    <Media
      queries={{
        small: "(max-width: 1099px)",
        big: "(min-width: 1100px)",
      }}
    >
      {(matches) => (
        <Fragment>
          {matches.small && (
            <div className="sound-hook-container">
              <AnimatePresence exitBeforeEnter>
                {active && sound && !aModalIsOpen && (
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={optionsVariants}
                    transition={optionsTransition}
                    className={`global-player ${gpuTier && gpuTier.isMobile ? 'global-player-mobile' : ''}`}
                    data-rate="2"
                  >
                    <span className={`leftlength-global`}></span>

                    <div className="global-player--info">
                          <UserImg creator={sound.creator_id} />
                          <div className="global-player--info--name">
                            <span
                            className="globalsound--soundname"
                            onClick={(e) => gotoSingleSoundPage(e, sound.id)}
                            >
                            {name}
                          </span>
                            <span
                              className="globalsound--username"
                              onClick={(e) => goToUserPage(e, sound.creator_id)}
                            >
                              <p>Uploaded by: {sound.username}</p>
                            </span>
                            
                          </div>
                        </div>
                    
                    {/* <div className="global-player--info--sound">
                      <span onClick={(e) => gotoSingleSoundPage(e, sound.id)}>
                        {name}
                      </span>
                    </div> */}

                    <div className="global-player--controls">
                      <PlayPauseBtns global />
                    </div>

                    <button
                      onClick={closeHidden}
                      className="btn nohover global-player--hidebtn"
                    >
                      <Image src={downArrow} alt=""/>
                    </button>

                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={optionsVariants}
                      transition={optionsTransition}
                      className={`global-player--progress ${
                        !active &&
                        hiddenOpen &&
                        "global-player--progress--hidden"
                      } `}
                      key="progress"
                    >
                      <ProgressBar small2 hidden={hiddenOpen} />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence exitBeforeEnter>
                {!active && hiddenOpen && (
                  <Fragment>
                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={optionsVariants}
                      transition={optionsTransition}
                      key="bottom"
                      className={`global-player--bottom`}
                    >
                      <GlobalSoundHidden
                        username={sound.username}
                        creator={sound.creator_id}
                        id={sound.id}
                        name={sound.name}
                      />
                    </motion.div>
                  </Fragment>
                )}
              </AnimatePresence>

              {!active && hiddenOpen && (
                <div className="global-player--hiddenhalf"></div>
              )}
            </div>
          )}

          {matches.big && (
            <div
              className={`sound-hook-container ${
                !active && hiddenOpen && "sound-hook-container--hidden"
              }`}
            >
              <AnimatePresence exitBeforeEnter>
                {(active || hiddenOpen) && sound && !aModalIsOpen && (
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={optionsVariants}
                    transition={optionsTransition}
                    className={`global-player ${
                      !active && hiddenOpen && "global-player--hidden--contain"
                    }`}
                    data-rate="2"
                    key="main"
                    onMouseOverCapture={mouseOverHandler}
                    onMouseLeave={mouseLeaveHandler}
                  >
                    {!active && hiddenOpen && (
                      <div className="global-player--hidden--close">
                        <div>
                          <Image onClick={closeHidden} src={blueX} alt="" />
                        </div>
                      </div>
                    )}

                    <span className={`leftlength-global ${hiddenOpen ? 'leftlength-global--hidden' : ''}`}></span>

                    {active && sound && !aModalIsOpen && (
                      <Fragment>
                        <div className="global-player--volume">
                          <div className="global-player--volume--contain">
                            {/* <MouseOverHandler
                                            noSpan
                                            variants={volumeVariants}
                                            transition={volumeTransition}
                                            activatedClass="volume-activated"
                                            label='' */}

                            <div onClick={muteVolume}>
                              <Image src={volume === 0 ? mute : vol} alt="" />
                            </div>

                            {(isVis || (gpuTier && gpuTier.isMobile)) && (
                              <motion.div
                                className="global-player--volume--slider"
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={volumeVariants}
                                transition={volumeTransition}
                              >
                                <PrettoSlider
                                  getAriaValueText={valuetext}
                                  onChangeCommitted={(e, newval) =>
                                    dispatch(changeGlobalVolume(newval))
                                  }
                                  defaultValue={Math.floor(volume * 100)}
                                  valueLabelDisplay="auto"
                                  aria-label="pretto slider"
                                />
                              </motion.div>
                            )}
                            {/* </MouseOverHandler> */}
                          </div>
                        </div>

                        {/* <div className="global-player--info--sound">
                          <span
                            onClick={(e) => gotoSingleSoundPage(e, sound.id)}
                          >
                            {name}
                          </span>
                        </div> */}

                        <div className="global-player--info">
                          <UserImg creator={sound.creator_id} />
                          <div className="global-player--info--name">
                            <span
                              className="globalsound--soundname"
                              onClick={(e) => gotoSingleSoundPage(e, sound.id)}
                            >
                            {name}
                          </span>
                            <span
                              className="globalsound--username"
                              onClick={(e) => goToUserPage(e, sound.creator_id)}
                            >
                              <p>Uploaded by: {sound.username}</p>
                            </span>
                            
                          </div>
                        </div>

                        <button
                          onClick={closePlayer}
                          className="btn nohover global-player--hidebtn"
                        >
                          <Image src={downArrow} alt=""></Image>
                        </button>

                        <div className="global-player--controls">
                          <PlayPauseBtns global/>
                        </div>

                        <div className="global-actioncontain">
                          <div className="sound-list-item--btn-contain global-circle-btns feed-soundlist--btn--actions-container">
                            <div className="sound-list-item--circle global-circle-btns--inner">
                              <FavButton global soundId={sound.id} />
                              
                            </div>

                            <div className="sound-list-item--circle global-circle-btns--inner">
                              <RepostButton
                                soundId={sound.id}
                                username={sound.username}
                                creator={sound.creator_id}
                                global
                              />
                              
                            </div>

                            <div className="sound-list-item--circle sound-list-item--download-btn global-circle-btns--inner">
                              <DownloadButton
                                soundId={sound.id}
                                name={sound.name}
                                path={sound.path}
                              />
                              
                            </div>
                          </div>
                        </div>
                      
                      </Fragment>
                    )}

                    {!active && hiddenOpen && (
                      <Fragment>
                        <motion.div
                          initial="initial"
                          animate="in"
                          exit="out"
                          variants={optionsVariants}
                          transition={optionsTransition}
                          key="bottom"
                          className={`global-player--bottom`}
                        >
                          <GlobalSoundHidden
                            name={sound.name}
                            username={sound.username}
                            creator={sound.creator_id}
                            id={sound.id}

                          />
                        </motion.div>
                      </Fragment>
                    )}

                    <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={optionsVariants}
                      transition={optionsTransition}
                      className={`global-player--progress ${
                        !active &&
                        hiddenOpen &&
                        "global-player--progress--hidden"
                      } `}
                      key="progress"
                    >
                      <ProgressBar hidden={hiddenOpen} />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              {!active && hiddenOpen && (
                <div className="global-player--hiddenhalf"></div>
              )}
            </div>
          )}
        </Fragment>
      )}
    </Media>,
    document.getElementById("sound-hook") as HTMLElement) : null


 
  return final;
});

GlobalSound.displayName = "GlobalSound";

interface UserProps {
  creator: any
}
const UserImg: React.FC<UserProps> = ({creator}) => {
  const { isLoading, sendRequest } = useHttpClient();
  const [userImg, setUserImg] = useState(null);

  const fetchUserImg = useCallback(async () => {
    let result;
    try {
      result = await sendRequest(
        `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/users/userimg/${creator}`
      );
      setUserImg(result.user_img_path);
    } catch (err) {}
  }, [creator]);

  useEffect(() => {
    fetchUserImg();
    return () => {
      setUserImg(null);
    };
  }, [creator]);

  const myLoader = ({ src, width, quality }) => {
    return `https://soundshare-bucket.s3.us-east-2.amazonaws.com/${userImg}`;
  }
  
  useEffect(() => {
    let try1: any = document.querySelector('.global-player--info--user');
    let try2: any = document.querySelector('.global-player--info--user--unknown');

    if (try1) {
      let el: any = try1.children[0];
      el.style.overflow = "visible";
      el.style.position = "visible";
      
      let newImg: any = el.querySelector('img');
      if (newImg) {
        newImg.style.boxShadow = 'none';
      }
      if (try2 && newImg && el) {
        newImg.style.boxSizing = 'content-box';
        newImg.style.padding = '.5rem';
        newImg.style.boxSizing = 'content-box';
        newImg.style.display = 'none';

        let el2 = el.children[2];
        if (el2) {
          el2.style.minWidth = '35px';
          el2.style.minHeight = '35px';
        }
         

      }
    }

  }, [userImg, isLoading]);
  return (
    <div
      className={`global-player--info--user ${
        userImg ? "global-player--info--user--custom" : "global-player--info--user--unknown"
      }`}
    >
      {isLoading ? (
        <div className="global-user-img-loader">
          <InPageLoadSpinner loading={isLoading} />
        </div>
      ) : userImg ? (
          <Image
            src={`https://soundshare-bucket.s3.us-east-2.amazonaws.com/${userImg}`}
            alt=""
            width={45}
            height={45}
            loader={myLoader}
          />
      ) : (
            <Image
              width={45}
              height={45}
              src={unknown}
              alt=""
            />
      )}
    </div>
  );
};

UserImg.displayName = "UserImg";


export default GlobalSound;