import { useRouter } from 'next/router'
import React, { useState, useRef, useCallback, useEffect,  } from 'react';
import Media from 'react-media';
import { useSelector, useDispatch } from 'react-redux';
import LoadingAnimation from '../../components/animatedLoaders/LoadingAnimation/LoadingAnimation';
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
import { resetGlobalSound} from '../../store/actions';
import { setGlobalSound } from '../../store/actions/globalSound';
import { useHttpClient } from '../../util/hooks/http-hook';
import music from "../../public/loop-background.svg";
import Licesnse from '../../components/singleSound/Licesnse';
import db from '../../server/util/queries';
import SoundImg from '../../components/singleSound/SoundInfo/SoundImg';
import SoundName from '../../components/singleSound/SoundInfo/SoundName';
import SoundUsername from '../../components/singleSound/SoundInfo/SoundUsername';
import SoundLikes from '../../components/singleSound/SoundInfo/SoundLikes';
import SoundPlayer from '../../components/singleSound/SingleSoundMain/SoundPlayer';
import { END } from 'redux-saga';
import { wrapper } from '../../store/wrapper';


export default function Sounds() {
  const { isLoading, sendRequest } = useHttpClient();
  const router = useRouter();
  let soundId = router.query;

  const [faved, setFaved] = useState(false);
  const [isMyPage, setIsMyPage] = useState(false);
  const [moveBtnDown, setMoveBtnDown] = useState(false);
  const [smallDesc, setSmallDesc] = useState(false);
  const [descOpen, setDescOpen] = useState(false);
  const [editMode, setEditMode] = useState<any>(null);
  const [likeModalOpen, setLikeModalOpen] = useState<any>(false);
  const [reportComment, setReportComment] = useState(false);
  
  const dispatch = useDispatch();

  const gpuTier = useSelector((state: any) => state.ui.gpuTier);
  const userId = useSelector((state: any) => state.user.userId);
  const isMaster = useSelector((state: any) => state.user.master);
  const mainLoader = useSelector((state: any) => state.ui.mainLoader);
  const soundInfo = useSelector((state: any) => state.singleSound.sound);

  

  const descRef: any = useRef();

  

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch({type: "MAIN_LOADER_FINISH"});
    dispatch({type: "UNDO_RESET_SINGLE"})

    return () => {
      dispatch(resetGlobalSound());
      dispatch({ type: "RESET_SINGLE_SOUND" });
    };
  }, [dispatch]);


  const gotoCategory = () => {
    const category = soundInfo.category;
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
      if (soundInfo.creator_id == userId) {
        if (!isMyPage) setIsMyPage(true);
      } else if (isMaster) {
        if (!isMyPage) setIsMyPage(true);
      }

      document.title = `${soundInfo.name} - Soundshare`
    }
  }, [soundId, soundInfo, userId, isMaster]);



  let name;
  let last;
  let nameLong = false;

  if (soundInfo && soundInfo) {
    if (soundInfo.name.length > 25) {
      nameLong = true;
      name = soundInfo.name.substring(0, 25); //cuts to 25
      last = name.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
      name = name.substring(0, last); //cuts from last space (to avoid cutting the middle of a word)
      name = name + `...`; //adds (...) at the end to show that it's cut
    } else {
      name = soundInfo.name;
    }
  }


  const seeLikes = () => setLikeModalOpen('likes');
  const seeReposts = () => setLikeModalOpen('reposts');
  const openDescription = () => setDescOpen(true);
  const closeLikesModal = () => setLikeModalOpen(false);
  const closeDescription = () => setDescOpen(false);
  const reportSound = () => setReportComment(true);
  const closeReportSound = () => setReportComment(false);


  useEffect(() => {
    if (descRef.current) {
      if (descRef.current.offsetHeight > 159) {
        setMoveBtnDown(true);
      } else if (descRef.current.offsetHeight < 61) {
        setSmallDesc(true);
      }
    }
  }, [soundInfo, descRef]);


  
  
  

  useEffect(() => {
    let try1: any = document.querySelector('.singlesound-img-container');
    if (try1) {
      let el: any = try1.children[0];
      el.style.overflow = "visible";
      let newImg = el.querySelector('img');
      if (newImg) {
        newImg.style.boxShadow = 'none';
      }
    }
  }, [soundInfo]);


  useEffect(() => {
    if (gpuTier && !gpuTier.isMobile && soundInfo) {
        dispatch(setGlobalSound(soundInfo));
    } 
          
    if (userId && soundInfo) {
      if (soundInfo.favs.indexOf(userId.toString()) !== -1) {
        if (!faved) {
          setFaved(true);
        }
      }
    }
  }, [userId, gpuTier, dispatch, faved, soundInfo]);


  useEffect(() => {
    if (soundInfo && (soundId.sid != soundInfo.id)) 
      dispatch({ type: "FETCH_SINGLE_SOUND", sid: soundId.sid });
    if(mainLoader) 
      dispatch({type: "MAIN_LOADER_FINISH"})
  }, [soundId, soundInfo, dispatch, mainLoader])
  

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
                    
                    <SoundImg img={soundInfo.img_path} category={soundInfo.category}/>
                    
                    <EditImage open={editMode === "image"} setEditMode={setEditMode}/>

                    <SoundName setEditMode={setEditMode} editMode={editMode} isMyPage={isMyPage}/>

                    <EditSoundName open={editMode === "name"} setEditMode={setEditMode}/>

                    <div className="single-sound--info--username-contain">
                      {editMode !== "name" && <SoundUsername  setFaved={setFaved} faved={faved} smaller={matches.smaller}/>}
                    </div>

                    {editMode !== "desc" && (
                      <div className={`single-sound--info--desc ${smallDesc ? 'single-sound--info--desc--small-desc' : ''} ${(moveBtnDown && nameLong) ? 'single-sound--info--desc-longname-desc' : ''}`}>
                        {soundInfo.description ? (
                          <div>
                            {soundInfo.name.length > 24 && (
                              <span className="single-sound-longname">{soundInfo.name}</span>
                            )}
                            <p className="single-description" ref={descRef} onClick={openDescription}>{soundInfo.description}</p>
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
                            {soundInfo.name.length > 24 && (
                              <span>{soundInfo.name}</span>
                            )}
                            <p>
                              The user did not give a description for this
                              sound.
                            </p>
                          </div>
                        )}
                        {(soundInfo.tags && soundInfo.tags.length > 0) ? (
                          <div className="sound-tags">
                            <span className="tagword">Tags: </span>
                            {soundInfo.tags.map((el, i) => (
                              <SoundTags category={soundInfo.category} key={el} tag={el} notLast={soundInfo.tags[i + 1]} />
                            ))}
                          </div>
                        ) : (
                          <div></div>
                        )}
                        <div className="counter-singlesound">
                          <span>{soundInfo.downloads} Downloads</span>
                          <span onClick={seeReposts} className="repost-singlesound-count">{soundInfo.reposts.length} Reposts</span>
                          {matches.smaller && (
                            <span onClick={seeLikes} className="like-txt-single likesingle"> {soundInfo.favs.length} Likes</span>
                          )}
                          {soundInfo.category !== 'fx' && (
                            <BPMComponent category={soundInfo.category} bpm={soundInfo.bpm}/>
                          )}
                          {!matches.smaller && (
                            <span onClick={gotoCategory} className="repost-singlesound-count">Category: {soundInfo.category}</span>
                          )}
                        </div>
                        
                        {matches.smaller && (
                          <div className="counter-singlesound singlesound-small-category">
                            <span onClick={gotoCategory} className="repost-singlesound-count">Category: {soundInfo.category}</span>
                          </div>
                        )}
                        
                      </div>
                    )}

                    <EditDesc setEditMode={setEditMode} id={soundInfo.id}
                      desc={soundInfo.description} open={editMode === "desc"}
                      
                    />

                    <Download soundInfo={soundInfo}  further={moveBtnDown} 
                      moveDown={nameLong && !moveBtnDown}
                    />

                    {(!matches.smaller && gpuTier)? <SoundLikes setFaved={setFaved} soundInfo={soundInfo} seeLikes={seeLikes} faved={faved}  nameLong={nameLong} moveBtnDown={moveBtnDown}/> : null}


                    <SingleSoundRepostButton moveDown={nameLong && !moveBtnDown} further={moveBtnDown}/>

                    <Licesnse reportSound={reportSound}/>
                  
                  </div>


                  <SoundPlayer matches={matches} soundInfo={soundInfo}/>

                  <CommentSection />
                </div>
              
            </>
          )}
        </Media>
      )}
      {soundInfo && (
        <>

          <FollowerModal likeList closeModal={closeLikesModal} header={likeModalOpen} open={likeModalOpen}>
              <LikeSoundList closeModal={closeLikesModal} option={likeModalOpen} favs2={soundInfo.favs} reposts={soundInfo.reposts}/>
          </FollowerModal>

          <DescriptionModal 
            desc={soundInfo.description} 
            cancel={closeDescription} 
            open={descOpen} 
          />

          {reportComment && <ReportSound id={soundInfo.id} close={closeReportSound}/>}

        </>)
      }

      

    </>
  );
}

export async function getStaticPaths() {
  const getSoundsQueryTxt = "SELECT id FROM sounds";  

    let foundSounds;
    let soundList;
  
    try {
      foundSounds = await db.query(getSoundsQueryTxt);
  
      soundList = {
        sounds: foundSounds.rows
      };
    } catch (err) { }
  
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

export const getStaticProps = wrapper.getStaticProps((store: any) =>
  async (test: any) => {
    // regular stuff
    store.dispatch({ type: "FETCH_SINGLE_SOUND_SERVER", sid: test.params.sid });
    // end the saga
    store.dispatch(END);
    await store.sagaTask.toPromise();

    return {
      props: {so: "hi"},
      revalidate: 1
    }
  }
);

