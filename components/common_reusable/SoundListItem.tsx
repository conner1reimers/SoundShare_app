import React, { useState, useEffect, Fragment, useRef, useCallback } from "react";
import { useChangePage } from "../../util/hooks/changePage";
import playBtn from "../../util/img/newplay.svg";
import pause from "../../util/img/newpause.svg";
import music from "../../util/img/loop-background.svg";
import game from "../../util/img/game-background.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  changeGlobalSound,
  playGlobalSound,
  pauseGlobalSound,
  openAndPlayGlobalSound,
} from "../../store/actions";
import getDaysSince from "../../util/functions/getDaysSince";
import RepostButton from "./RepostButton";
import FavButton from "./FavButton";
import Media from "react-media";
import DownloadButton from "./DownloadButton";
import Image from "next/image";

interface Props {
  id?: any, 
  key?: any, 
  category: any, 
  sound_id: any, 
  img_path: any, 
  date: any, 
  name: any, 
  creator: any, 
  path: any, 
  el: any, 
  browse?: any,
  location: any,
  favCount: any,
  repostCount: any,
  downloadCount: any,
  feed?: any,
  userPage?: any,
  uploadUser?: any,
  feedUpload?: any
}
const SoundListItem: React.FC<Props> = ({id, key, category, sound_id, img_path, date, name: nameProp, creator, path, el, browse, location, favCount: propfavCount, repostCount: proprepostCount, downloadCount: propDownloadCount, feed, userPage, uploadUser, feedUpload}) => {
  const { gotoSingleSoundPage, goToUserPage } = useChangePage();
  const [activeSound, setActiveSound] = useState<any>(null);
  const [lastActiveSound, setLastActiveSound] = useState<any>(null);
  const dispatch = useDispatch();
  const globalSoundPlaying = useSelector((state: any) => state.globalSound);
  const playRef = useRef<any>();
  const [repostCount, setRepostCount] = useState<any>(parseInt(proprepostCount));
  const [favCount, setFavCount] = useState<any>(parseInt(propfavCount));
  const [downloadCount, setDownloadCount] = useState<any>(parseInt(propDownloadCount));

  const playSound = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!globalSoundPlaying.active) {
      dispatch(openAndPlayGlobalSound(el, location));
    } else {
      if (globalSoundPlaying.sound.id === el.id) {
        if (globalSoundPlaying.playing) {
          dispatch(pauseGlobalSound());
          if (activeSound) {
            activeSound.querySelector("img").src = playBtn;
            setActiveSound(null);
          }
        } else {
          dispatch(playGlobalSound());
        }
      } else {
        dispatch(changeGlobalSound(el, location));
      }
    }
  
    if (activeSound) {
      activeSound.querySelector("img").src = playBtn;
      setActiveSound(event.currentTarget);
      event.currentTarget.querySelector("img").src = pause;
    } else if (!activeSound) {
      setActiveSound(event.currentTarget);
      event.currentTarget.querySelector("img").src = pause;
    }
  }, [el, globalSoundPlaying.sound.id, globalSoundPlaying.active, globalSoundPlaying.playing]);


  useEffect(() => {
    if (activeSound && sound_id !== globalSoundPlaying.sound.id) {
      activeSound.querySelector("img").src = playBtn;
      setActiveSound(null);
    } else if (!globalSoundPlaying.playing && activeSound) {
      activeSound.querySelector("img").src = playBtn;
      setLastActiveSound(activeSound);
      setActiveSound(null);
    } else if (
      !activeSound &&
      lastActiveSound &&
      globalSoundPlaying.playing &&
      sound_id === globalSoundPlaying.sound.id
    ) {
      setActiveSound(lastActiveSound);
      lastActiveSound.querySelector("img").src = pause;
      setLastActiveSound(null);
    } else if (
      globalSoundPlaying.playing &&
      !activeSound &&
      !lastActiveSound &&
      sound_id === globalSoundPlaying.sound.id
    ) {
      setActiveSound(playRef.current);
      playRef.current.querySelector("img").src = pause;
    }
  }, [globalSoundPlaying.sound.id, globalSoundPlaying.playing]);

  
  let daysText = getDaysSince(date);

  let name: any;
  let last;
  let shorterName: any;
  let shorterLast
  if (nameProp) {
    if (nameProp.length > 32) {
      name = nameProp.substring(0, 32); //cuts to 25
      last = name.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
      name = name.substring(0, last); //cuts from last space (to avoid cutting the middle of a word)
      name = name + `...`; //adds (...) at the end to show that it's cut

    } else {
      name = nameProp;
    }

    if (nameProp.length > 20) {
      shorterName = nameProp.substring(0, 20); //cuts to 25
      shorterLast = shorterName.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
      shorterName = shorterName.substring(0, shorterLast); //cuts from last space (to avoid cutting the middle of a word)
      shorterName = shorterName + `...`; //adds (...) at the end to show that it's cut
    } else {
      shorterName = nameProp
    }

  }
  



  const goToSound = useCallback((e) => {
    gotoSingleSoundPage(e, sound_id)
  }, [sound_id, gotoSingleSoundPage]);

  const goToUser = useCallback((e) => {
    goToUserPage(e, creator);
  }, [creator, goToUserPage]);

  return (
  <Media queries={{
    smaller: "(max-width: 525px)",
    small: "(max-width: 1099px)",
    big: "(min-width: 1100px)"
    }}>
      {matches => (
      <Fragment>
    
      {!feed ? (
        <li
          className={`user-page--loopList--item ${
            browse && "browse-soundlist"
          }`}
          onClick={goToSound}
        >
          <div
            className={`recent-sounds--list--item--player user-page--loopList--item--player ${
              browse && "browse-soundlist--play"
            }`}
          >
            <button
              ref={playRef}
              onClick={playSound}
              className="btn nohover user-loops-play"
            >
              <Image src={playBtn} alt="" />
            </button>
          </div>

          <div className="user-page--loopList--item--img">
            {img_path && img_path !== "none" ? (
                <Image
                  width={50}
                  height={50}
                  className="img-shine"
                  src={`https://soundshare-bucket.s3.us-east-2.amazonaws.com/${img_path}`}
                  alt=""
              />
            ) : category === "fx" ? (
              <Image className="img-shine" src={game} alt="" />
              ) : (
                <Image className="img-shine" src={music} alt="" />
                )}
          </div>

          <div className="user-page--loopList--item--name-contain">
            <span>{name}</span>
            
              <span className="upload-txt">
                Uploaded by {el.username} {daysText}
              </span>
            
            

          </div>

          {matches.big && <div
            className={`sound-list-item--btn-contain ${
              userPage && "user-page-action-container"
            }`}
          >
            <div className="sound-list-item--circle">
              <RepostButton
                soundId={sound_id}
                username={uploadUser}
                creator={creator}
                setCount={setRepostCount}
              />
              <span className="followerLength">{repostCount} reposts</span>
            </div>

            <div className="sound-list-item--circle">
              <FavButton
                soundId={sound_id}
                setCount={setFavCount}
              />
              <span className="followerLength info-likes">
                    {favCount} likes
                  </span>
            </div>

            <div className="sound-list-item--circle sound-list-item--download-btn">
              <DownloadButton
                soundId={sound_id}
                name={name}
                path={path}
                setCount={setDownloadCount}
              />
              <span className="followerLength">
                    {downloadCount} downloads
                  </span>
            </div>
          </div>}
        
       
        
        </li>
      )

      : (
        <div className="user-page--loopList--item feed-soundlist">
          

          <div
            className="user-page--loopList--item--img feed-soundlist--img"
            onClick={goToSound}
          >
            {img_path && img_path !== "none" ? (
              <div className="feedlist-img-contain">
              <Image
                className="img-shine"
                width={50}
                height={50}
                src={`https://soundshare-bucket.s3.us-east-2.amazonaws.com/${img_path}`}
                alt=""
              />
              </div>
            ) : (
              <div className="feedlist-img-contain">
                <Image className="img-shine" src={music} alt="" />
              </div>
            )}
            <div className="feedlist-item-playbtn-contain">
              <div className={`recent-sounds--list--item--player user-page--loopList--item--player 
                ${browse && "browse-soundlist--play"
                } feed-soundlist--play`}>
                  <button
                    ref={playRef}
                    onClick={playSound}
                    className={`btn nohover user-loops-play ${feedUpload ? 'feed-playbtn-repost' : 'feed-playbtn-norepost'}`}
                  >
                    <Image src={playBtn} alt="" />
                  </button>
              </div>
            </div>
          </div>

          <div
            className="user-page--loopList--item--name-contain feed-soundlist--username"
            onClick={goToSound}
          >
            {!feedUpload ? (
              <Fragment>
                <span>{name}</span>
                <span className="followerLength">Uploaded {daysText}</span>
              </Fragment>
            ) : (
              <Fragment>
                <div className="feed-upload-name">
                  <span className="feed-soundname">{matches.smaller ? shorterName : name}</span>
                  <span className="repost-username">
                    Uploaded by: {uploadUser}
                  </span>
                </div>

                <div className="feed-upload-info">
                  <span className="followerLength">Uploaded {daysText}</span>
                </div>

                <div className="feed-upload-description">
                  <p>
                    The person who uploaded this sound gave it no
                    description....
                  </p>
                  <button onClick={goToUser} type="button" className="btn nohover profile-btn">
                    Visit this users profile.
                  </button>
                </div>
              </Fragment>
            )}
          </div>

          {/* <div className="user-page--loopList--item--likes feed-soundlist--likes">
                
            </div> */}

          {matches.big && <Fragment> 
            
            <div
            className={`user-page--loopList--item--days feed-soundlist--btn ${
              feedUpload && "feed-list-btn-contain"
            }`}
          >
            <div className="feed-soundlist--btn--actions-container">

              <div className="feed-soundlist--btn--actions-container--btn">
                <FavButton setCount={setFavCount} soundId={sound_id} />
              </div>

              <div className="feed-soundlist--btn--actions-container--btn">
                <RepostButton
                  soundId={sound_id}
                  username={uploadUser}
                  creator={creator}
                  setCount={setRepostCount}
                />
                
                  

              </div>

              <div className="feed-soundlist--btn--actions-container--btn">
                <DownloadButton
                  soundId={sound_id}
                  name={name}
                  path={path}
                  setCount={setDownloadCount}
                />
                
              </div>
            
            </div>
            
          </div>
          </Fragment>}
        </div>
      )}
    </Fragment>)}
    </Media>
  );
};

export default React.memo(SoundListItem);
