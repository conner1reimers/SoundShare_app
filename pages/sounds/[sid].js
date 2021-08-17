import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Router, useRouter } from 'next/router'
import React, { useState, useRef, useCallback, useEffect,  } from 'react';
import Media from 'react-media';
import { useSelector, useDispatch } from 'react-redux';
import Heart from '../../components/animatedLoaders/Heart/Heart';
import LoadingAnimation from '../../components/animatedLoaders/LoadingAnimation/LoadingAnimation';
import DropSinglesound from '../../components/singleSound/SingleSoundMain/DropSingleSound';
import PlayPauseBtns from '../../components/common_reusable/playPauseBtn/PlayPauseBtns';
import ProgressBar from '../../components/globalSoundControls/ProgressBar';
import FollowerModal from '../../components/shared/Modals/FollowerModal';
import BPMComponent from '../../components/singleSound/BPMComponent';
import CommentSection from '../../components/singleSound/Comments/CommentSection';
import DescriptionModal from '../../components/singleSound/DescriptionModal';
import Download from '../../components/singleSound/Download';
import EditImage from '../../components/singleSound/EditComponents/ChangeImage';
import EditDesc from '../../components/singleSound/EditComponents/EditDesc';
import EditSoundName from '../../components/singleSound/EditComponents/EditSoundName';
import LikeSoundList from '../../components/singleSound/SingleSoundMain/LikeSoundList';
import ReportSound from '../../components/singleSound/SingleSoundMain/ReportSound';
import SingleSoundRepostButton from '../../components/singleSound/SingleSoundMain/SingleSoundRepostButton';
import SoundTags from '../../components/singleSound/SingleSoundMain/SoundTags';
import { resetGlobalSound } from '../../store/actions';
import { setGlobalSound } from '../../store/actions/globalSound';
import { UiState } from '../../store/reducers/uiStateReducer';
import { UserState } from '../../store/reducers/user';
import { useChangePage } from '../../util/hooks/changePage';
import { useHttpClient } from '../../util/hooks/http-hook';
import MouseOverLabel from '../../util/MouseOverLabel';
import music from "../../public/loop-background.svg";
import game from "../../public/game-background.svg";
import more from "../../public/more2.svg";
import Licesnse from '../../components/singleSound/Licesnse';

// interface Root {
//   user: UserState,
//   ui: UiState
// }

// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { sid: '341' } },
//       { params: { sid: '22' } }
//     ],
//     fallback: false 
//   };
// }



// export const getServerSideProps = wrapper.getServerSideProps(async (store) =>
//   ({req, res, reduxStore}) => {
//       return {props: {...reduxStore}};
//       // store.dispatch({type: 'TICK', payload: 'was set in other page'});
//   }
// );

export default function Sounds(props) {
  const { isLoading, sendRequest } = useHttpClient();
  const router = useRouter();

  let soundId = router.query;



  const [soundInfo, setSoundInfo] = useState(props.response);
  const [faved, setFaved] = useState(false);
  const [isMyPage, setIsMyPage] = useState(false);
  const [moveBtnDown, setMoveBtnDown] = useState(false);
  const [smallDesc, setSmallDesc] = useState(false);
  const [descOpen, setDescOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [likeModalOpen, setLikeModalOpen] = useState(false);
  const [reportComment, setReportComment] = useState(false);
  

  const myPageOptionsOpen = useSelector((state) => state.ui.singlesoundOptionsOpen);
  const gpuTier = useSelector((state) => state.ui.gpuTier);
  const userId = useSelector((state) => state.user.userId);
  const isMaster = useSelector((state) => state.user.master);


  const dispatch = useDispatch();

  const { goToUserPage } = useChangePage();
  const descRef = useRef();


  const fetchSoundInfo = useCallback(async () => {
    if (soundId.sid) {
      let response;

      try {
        response = await sendRequest(
          `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/${soundId.sid}`
        );
        setSoundInfo({
          sound: response.sound,
          comments: response.comments,
          offset: response.comments.length,
          refreshFinished: response.comments.length !== 20
        });

        if (!gpuTier.isMobile) {
          dispatch(setGlobalSound(response.sound));
        } 
        
        if (userId) {
          if (response.sound.favs.indexOf(userId.toString()) !== -1) {
            setFaved(true);
          }
        }
      } catch (err) {}
    }
  }, [soundId.sid, userId, gpuTier, dispatch, sendRequest]);
  
  useEffect(() => {
    if (gpuTier) {
      if (!soundInfo) {
        fetchSoundInfo();
      } else if (soundId.sid != soundInfo.sound.id) {
        fetchSoundInfo();
      } 
    }
  }, [gpuTier, soundId, soundInfo, fetchSoundInfo]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch({type: "MAIN_LOADER_FINISH"})
    return () => {
      dispatch(resetGlobalSound());
      setSoundInfo(null);
    };
  }, [dispatch]);

  const gotoCategory = () => {
    const category = soundInfo.sound.category;

    if (category === 'loops') {
      router.push('/browseloops');
    } else if (category === 'fx') {
      router.push('/browsefx');
    } else if (category === 'vocal') {
      router.push('/browsevocal');
    }
    
  }

  useEffect(() => {
    if (soundInfo) {
      if (soundInfo.sound.creator_id == userId) {
        if (!isMyPage) setIsMyPage(true);
      } else if (isMaster) {
        if (!isMyPage) setIsMyPage(true);
      }

      document.title = `${soundInfo.sound.name} - Soundshare`
    }
  }, [soundId, soundInfo, userId, isMaster]);

  const openMySoundOptions = useCallback(() => {
    if (isMyPage && !myPageOptionsOpen) {
      dispatch({type: "OPEN_SINGLESOUND_OPTIONS"})
    } else if (isMyPage && myPageOptionsOpen) {
      dispatch({type: "CLOSE_SINGLESOUND_OPTIONS"});
    }
  }, [isMyPage, myPageOptionsOpen]);

  const closeMySoundOptions = useCallback((e) => {
    if (myPageOptionsOpen) {
      dispatch({type: "CLOSE_SINGLESOUND_OPTIONS"});
    }
  }, [myPageOptionsOpen]);

  let name;
  let last;
  let nameLong = false;

  if (soundInfo && soundInfo.sound) {
    if (soundInfo.sound.name.length > 25) {
      nameLong = true;
      name = soundInfo.sound.name.substring(0, 25); //cuts to 25
      last = name.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
      name = name.substring(0, last); //cuts from last space (to avoid cutting the middle of a word)
      name = name + `...`; //adds (...) at the end to show that it's cut
    } else {
      name = soundInfo.sound.name;
    }
  }


  const seeLikes = () => {
    setLikeModalOpen('likes');
  }
  const seeReposts = () => {
    setLikeModalOpen('reposts');
  }

  const closeLikesModal = () => {
    setLikeModalOpen(false);
  };

  
  const openDescription = () => {
    setDescOpen(true);
  }
  const closeDescription = () => {
    setDescOpen(false);
  }


  useEffect(() => {
    if (descRef.current) {
      if (descRef.current.offsetHeight > 159) {
        setMoveBtnDown(true);
      } else if (descRef.current.offsetHeight < 61) {
        setSmallDesc(true);
      }
    }
  }, [soundInfo, descRef]);


  const reportSound = () => {
    setReportComment(true);
  }
  const closeReportSound = () => {
    setReportComment(false);
  }
  const myLoader = ({ src, width, quality }) => {
      return `https://soundshare-bucket.s3.us-east-2.amazonaws.com/${soundInfo.sound.img_path}`;
  }

  useEffect(() => {
    let try1 = document.querySelector('.singlesound-img-container');

    if (try1) {
      let el = try1.children[0];
      el.style.overflow = "visible";
      let newImg = el.querySelector('img');
      if (newImg) {
        newImg.style.boxShadow = 'none';
      }
    }

    

  }, [soundInfo]);
  

  useEffect(() => {
    if (gpuTier && !gpuTier.isMobile && soundInfo) {
        dispatch(setGlobalSound(soundInfo.sound));
      } 
          
    if (userId) {
      if (soundInfo.sound.favs.indexOf(userId.toString()) !== -1) {
        if (!faved) {
          setFaved(true);
        }
        
      }
    }
  }, [userId, gpuTier, dispatch, faved, soundInfo])
  

  return (
    <>
      {isLoading && <LoadingAnimation loading={isLoading} />}
      {soundInfo && (
        <Media
          queries={{
            smaller: "(max-width: 500px)",
            small: "(max-width: 1099px)",
            big: "(min-width: 1100px)"
          }}
        >
          {(matches) => (
            <>
              
                <div className="single-sound">
                  <div className="single-sound--info">
                    <div className="singlesound-img">
                      <div className="singlesound-img-container">
                      {soundInfo.sound.img_path ? (
                        <Image
                            height={450}
                            width={450}
                            objectFit="fill"
                            className="singlesoundimg"
                            src={`https://soundshare-bucket.s3.us-east-2.amazonaws.com/${soundInfo.sound.img_path}`}
                            loader={myLoader}
                            alt=""
                          />) : (
                          <Image
                            height={450}
                            width={450}
                            objectFit="fill"
                            className="singlesoundimg"
                            src={soundInfo.sound.category === "fx" ? game : music }
                            alt=""
                          />)}
                          </div>
                    </div>
                    

                    <EditImage
                      open={editMode === "image"}
                      id={soundInfo.sound.id}
                      setEditMode={setEditMode}
                      setSoundInfo={setSoundInfo}
                      oldpath={soundInfo.sound.img_path}
                      imgSrc={
                        soundInfo.sound.img_path
                          ? `https://soundshare-bucket.s3.us-east-2.amazonaws.com/${soundInfo.sound.img_path}`
                          : music
                      }
                    />

                    <div className={`single-sound--info--title ${isMyPage ? 'singlesound-title-mypage' : ''}`}>
                      {editMode !== "name" && name && (
                        <h1 className="">{name}</h1>
                      )}
                      {isMyPage && editMode !== "name" && (
                        <div className="delete-btn-singlesound">
                          <div className="delete-btn-singlesound--btn-activator invisible-btn-div">
                            <MouseOverLabel
                              seemore
                              classname="circle-btn-mouseover singlesound-options-mouseover"
                              labelClass="singlesound-options-mouseover--label"
                              label="See options"
                            >
                              <button
                                onClick={openMySoundOptions}
                                className="btn nohover invisible-btn"
                              >
                                <Image src={more} alt="" />
                              </button>
                            </MouseOverLabel>
                          </div>

                          <AnimatePresence exitBeforeEnter>
                            <DropSinglesound 
                                soundId={soundId.sid} 
                                isMyPage={isMyPage} 
                                soundInfo={soundInfo} 
                                setEditMode={setEditMode}
                                cancel={closeMySoundOptions}
                              />
                          </AnimatePresence>
                        </div>
                      )}
                    </div>

                    <EditSoundName
                      open={editMode === "name"}
                      name={soundInfo.sound.name}
                      id={soundInfo.sound.id}
                      setEditMode={setEditMode}
                      setSoundInfo={setSoundInfo}
                    />

                    <div className="single-sound--info--username-contain">
                      {editMode !== "name" && (
                        <>
                          <span>Uploaded by:</span>
                          <span
                            onClick={(e) =>
                              goToUserPage(e, soundInfo.sound.creator_id)
                            }
                            className="single-sound--info--username-contain--name"
                          >
                            {soundInfo.sound.username}
                          </span>
                          {matches.smaller && (
                            <>
                            
                            <div className="singlesound-likes-smaller-contain">
                              <div className="singlesound-likes-smaller">
                                <Heart
                                    soundInfo={soundInfo}
                                    soundId={soundInfo.sound.id}
                                    fav={faved}
                                    setSoundInfo={setSoundInfo}
                                    setFav={setFaved}
                                  />
                                
                                  
                              </div>
                            </div>
                            </>
                          
                          )}
                        </>
                      )}
                    </div>

                    {editMode !== "desc" && (
                      <div className={`single-sound--info--desc ${smallDesc ? 'single-sound--info--desc--small-desc' : ''} ${(moveBtnDown && nameLong) ? 'single-sound--info--desc-longname-desc' : ''}`}>
                        {soundInfo.sound.description ? (
                          <div>
                            {soundInfo.sound.name.length > 24 && (
                              <span className="single-sound-longname">{soundInfo.sound.name}</span>
                            )}
                            <p className="single-description" ref={descRef} onClick={openDescription}>{soundInfo.sound.description}</p>
                            {moveBtnDown && (
                              <div className="seemore-desc-btn-singlesound">
                                <div className="outline-btn">
                                  <button onClick={openDescription} className="btn nohover">SEE MORE</button>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div>
                            {soundInfo.sound.name.length > 24 && (
                              <span>{soundInfo.sound.name}</span>
                            )}
                            <p>
                              The user did not give a description for this
                              sound.
                            </p>
                          </div>
                        )}
                        {(soundInfo.sound.tags && soundInfo.sound.tags.length > 0) ? (
                          <div className="sound-tags">
                            <span className="tagword">Tags: </span>
                            {soundInfo.sound.tags.map((el, i) => (
                              <SoundTags category={soundInfo.sound.category} key={el} tag={el} notLast={soundInfo.sound.tags[i + 1]} />
                            ))}
                          </div>
                        ) : (
                          <div></div>
                        )}
                        <div className="counter-singlesound">
                          <span>{soundInfo.sound.downloads} Downloads</span>
                          <span onClick={seeReposts} className="repost-singlesound-count">{soundInfo.sound.reposts.length} Reposts</span>
                          {matches.smaller && (
                            <span onClick={seeLikes} className="like-txt-single likesingle"> {soundInfo.sound.favs.length} Likes</span>
                          )}
                          {soundInfo.sound.category !== 'fx' && (
                            <BPMComponent category={soundInfo.sound.category} bpm={soundInfo.sound.bpm}/>
                          )}
                          {!matches.smaller && (
                            <span onClick={gotoCategory} className="repost-singlesound-count">Category: {soundInfo.sound.category}</span>
                          )}
                        </div>
                        
                        {matches.smaller && (
                          <div className="counter-singlesound singlesound-small-category">
                            <span onClick={gotoCategory} className="repost-singlesound-count">Category: {soundInfo.sound.category}</span>
                          </div>
                        )}
                        
                      </div>
                    )}

                    <EditDesc
                      setEditMode={setEditMode}
                      id={soundInfo.sound.id}
                      desc={soundInfo.sound.description}
                      open={editMode === "desc"}
                      setSoundInfo={setSoundInfo}
                    />

                    <Download 
                      soundInfo={soundInfo} 
                      further={moveBtnDown} 
                      moveDown={nameLong && !moveBtnDown}
                     />

                    {(!matches.smaller && gpuTier)? <div className="single-sound--likes">
                      <div className={`outline-btn outline-btn--heart ${moveBtnDown ? 'move-down' : ''} ${(moveBtnDown && nameLong) ? 'move-down-more' : ''} ${(!moveBtnDown && nameLong) ? 'move-down-other' : ''}`}>
                        <Heart
                          soundInfo={soundInfo}
                          fav={faved}
                          soundId={soundInfo.sound.id}
                          setSoundInfo={setSoundInfo}
                          setFav={setFaved}

                        />
                        <span onClick={seeLikes} className="like-txt-single likesingle"> {soundInfo.sound.favs.length} Likes</span>
                        
                      </div>
                    </div> : null}


                    <SingleSoundRepostButton
                      moveDown={nameLong && !moveBtnDown}
                      id={soundInfo.sound.id}
                      creator2={soundInfo.sound.creator_id}
                      setSoundInfo={setSoundInfo}
                      further={moveBtnDown}
                    />

                    <Licesnse reportSound={reportSound}/>
                  
                  </div>


                  <div className="single-sound--player">
                    <div className="single-sound--player--container">
                      <div className="single-sound--player--controls">
                        <PlayPauseBtns global singleSound sound={soundInfo.sound}/>
                      </div>
                      <div className="single-sound--player--progress">
                        <ProgressBar singleSound global small2={matches.small}/>
                      </div>
                    </div>
                  </div>

                  <CommentSection setSoundInfo={setSoundInfo} soundInfo={soundInfo} />
                </div>
              
            </>
          )}
        </Media>
      )}
      {soundInfo && (
        <>

          <FollowerModal likeList closeModal={closeLikesModal} header={likeModalOpen} open={likeModalOpen}>
              <LikeSoundList closeModal={closeLikesModal} option={likeModalOpen} favs2={soundInfo.sound.favs} reposts={soundInfo.sound.reposts}/>
          </FollowerModal>

          <DescriptionModal 
            desc={soundInfo.sound.description} 
            cancel={closeDescription} 
            open={descOpen} 
          />

          {reportComment && <ReportSound id={soundInfo.sound.id} close={closeReportSound}/>}

        </>)
      }

      

    </>
  );
}

const sendRequest = async (url, method = 'GET', body = null, headers = {}) => {
  try {       
    const response = await fetch(new URL(url), {
        method,
        body,
        headers,
        credentials: 'same-origin'

    }, );
    const responseData = await response.json();
   
    if (!response.ok) {
        throw new Error(responseData.message);
    }
    return responseData;
}
    // CATCH
    catch (err) {
      throw err;
  }
}

export async function getStaticPaths() {
  const soundList = await sendRequest(`${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/getids`);
  
  const pathList = soundList.sounds.map(el => {
    return {
      params: {sid: el.id}
    }
  })

  return {
    paths: pathList,
    fallback: 'blocking'
  }
}

export async function getStaticProps(context){
    const soundId = context.params.sid;
    // regular stuff

    // store.dispatch(fetchRecentSounds());
    // end the saga

    // store.dispatch(END);
    // await store.sagaTask.toPromise();
    

    const fetchSoundInfo = async () => {
      if (soundId) {
        let response;
  
        try {
          response = await sendRequest(
            `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/${soundId}`
          );



          // setSoundInfo({
          //   sound: response.sound,
          //   comments: response.comments,
          //   offset: response.comments.length,
          //   refreshFinished: response.comments.length !== 20
          // });
  
          // if (!gpuTier.isMobile) {
          //   dispatch(setGlobalSound(response.sound));
          // } 
          
          // if (userId) {
          //   if (response.sound.favs.indexOf(userId.toString()) !== -1) {
          //     setFaved(true);
          //   }
          // }
          return JSON.stringify({
            sound: response.sound,
            comments: response.comments,
            offset: response.comments.length,
            refreshFinished: response.comments.length !== 20
          })
        } catch (err) {}
      }
    };
    let response;
    try {
      response = await fetchSoundInfo();
    
      return {
        props: JSON.parse(
          {
            response
          }),
        revalidate: 3
        };
    } catch (err) {
      throw err;
    }
    


    
};




// export const getServerSideProps = (async ({  req, res, ...ctx }) => {
//     const soundId = ctx.query.sid;
//     // regular stuff

//     // store.dispatch(fetchRecentSounds());
//     // end the saga

//     // store.dispatch(END);
//     // await store.sagaTask.toPromise();
//     const sendRequest = async (url, method = 'GET', body = null, headers = {}) => {
//       try {       
//         const response = await fetch(url, {
//             method,
//             body,
//             headers,
//             credentials: 'same-origin'

//         }, );
//         const responseData = await response.json();
       
//         if (!response.ok) {
//             throw new Error(responseData.message);
//         }
//         return responseData;
//     }
//         // CATCH
//         catch (err) {
//           throw err;
//       }
//     }




//     const fetchSoundInfo = async () => {
//       if (soundId) {
//         let response;
  
//         try {
//           response = await sendRequest(
//             `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/${soundId}`
//           );



//           // setSoundInfo({
//           //   sound: response.sound,
//           //   comments: response.comments,
//           //   offset: response.comments.length,
//           //   refreshFinished: response.comments.length !== 20
//           // });
  
//           // if (!gpuTier.isMobile) {
//           //   dispatch(setGlobalSound(response.sound));
//           // } 
          
//           // if (userId) {
//           //   if (response.sound.favs.indexOf(userId.toString()) !== -1) {
//           //     setFaved(true);
//           //   }
//           // }
//           return {
//             sound: response.sound,
//             comments: response.comments,
//             offset: response.comments.length,
//             refreshFinished: response.comments.length !== 20
//           }
//         } catch (err) {}
//       }
//     };


//     let response = await fetchSoundInfo();
//     return {props: {response}};


    
//   }
// );
