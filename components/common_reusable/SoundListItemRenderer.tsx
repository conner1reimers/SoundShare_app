import React, { useState, useEffect, Fragment, useRef, useCallback } from "react";
import { useChangePage } from "../../util/hooks/changePage";
import playBtn from "/public/newplay.svg";
import pause from "/public/newpause.svg";
import music from "/public/loop-background.svg";
import game from "/public/game-background.svg";
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


const SoundListItemRenderer: React.FC = (props: any) => {
  const item = props.data[props.index];

  const { gotoSingleSoundPage, goToUserPage } = useChangePage();
  const [activeSound, setActiveSound] = useState<any>(null);
  const [lastActiveSound, setLastActiveSound] = useState<any>(null);
  const dispatch = useDispatch();
  const globalSoundPlaying = useSelector((state: any) => state.globalSound);
  const playRef = useRef<any>();

  const [repostCount, setRepostCount] = useState<any>(parseInt(item.reposts.length));
  const [favCount, setFavCount] = useState<any>(parseInt(item.favs.length));
  const [downloadCount, setDownloadCount] = useState<any>(parseInt(item.downloads));
  const [playing, setPlaying] = useState<boolean>(false);

  const playSound = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!globalSoundPlaying.active) {
      dispatch(openAndPlayGlobalSound(item, location));
    } else {
      if (globalSoundPlaying.sound.id === item.id) {
        if (globalSoundPlaying.playing) {
          dispatch(pauseGlobalSound());
          if (activeSound) {
            setActiveSound(null);
            setPlaying(false);
          }
        } else {
          dispatch(playGlobalSound());
        }
      } else {
        dispatch(changeGlobalSound(item, location));
      }
    }
    setPlaying(true);
  
  }, [item, globalSoundPlaying.sound.id, globalSoundPlaying.active, globalSoundPlaying.playing]);


  useEffect(() => {
    if (activeSound && item.id !== globalSoundPlaying.sound.id) {
      setPlaying(false);
      setActiveSound(null);
    } else if (!globalSoundPlaying.playing && activeSound) {
      setPlaying(false);
      setLastActiveSound(activeSound);
      setActiveSound(null);
    } else if (
      !activeSound &&
      lastActiveSound &&
      globalSoundPlaying.playing &&
      item.id === globalSoundPlaying.sound.id
    ) {
      setActiveSound(lastActiveSound);
      setPlaying(true);
      setLastActiveSound(null);
    } else if (
      globalSoundPlaying.playing &&
      !activeSound &&
      !lastActiveSound &&
      item.id === globalSoundPlaying.sound.id
    ) {
      setActiveSound(playRef.current);
      playRef.current.children[0].children[1].src = pause;
      setPlaying(true);
    }
  }, [globalSoundPlaying.sound.id, globalSoundPlaying.playing]);


  useEffect(() => {
    if (globalSoundPlaying.sound.id === item.id) {
      setPlaying(true);
    } else {
      setPlaying(false)
    }
  }, [item, globalSoundPlaying.sound]);


  
  let daysText = getDaysSince(item.date_time);

  let name: any;
  let last;
  let shorterName: any;
  let shorterLast
  if (item.name) {
    if (item.name.length > 32) {
      name = item.name.substring(0, 32); //cuts to 25
      last = name.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
      name = name.substring(0, last); //cuts from last space (to avoid cutting the middle of a word)
      name = name + `...`; //adds (...) at the end to show that it's cut

    } else {
      name = item.name;
    }

    if (item.name.length > 20) {
      shorterName = item.name.substring(0, 20); //cuts to 25
      shorterLast = shorterName.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
      shorterName = shorterName.substring(0, shorterLast); //cuts from last space (to avoid cutting the middle of a word)
      shorterName = shorterName + `...`; //adds (...) at the end to show that it's cut
    } else {
      shorterName = item.name
    }

  }
  



  const goToSound = useCallback((e) => {
    gotoSingleSoundPage(e, item.id)
  }, [item.id, gotoSingleSoundPage]);

  const goToUser = useCallback((e) => {
    goToUserPage(e, item.creator_id);
  }, [item.creator_id, goToUserPage]);

  const myLoader = ({ src, width, quality }) => {
    return `https://soundshare-bucket.s3.us-east-2.amazonaws.com/${item.img_path}`;
  }

  return (
    <div style={props.style}>
    <Media queries={{
      smaller: "(max-width: 525px)",
      small: "(max-width: 1099px)",
      big: "(min-width: 1100px)"
      }}>
        {matches => (
        <Fragment>
      
        {!props.feed ? (
          <li
            className={`user-page--loopList--item ${
              props.browse && "browse-soundlist"
            }`}
            onClick={goToSound}
          >
            <div
              className={`recent-sounds--list--item--player user-page--loopList--item--player ${
                props.browse && "browse-soundlist--play"
              }`}
            >
              <button
                ref={playRef}
                onClick={playSound}
                className="btn nohover user-loops-play"
              >
                    {playing ? (<Image height={20} width={20} src={pause} alt="" />) : (<Image height={20} width={20} src={playBtn} alt="" />)}
              </button>
            </div>
  
            <div className="user-page--loopList--item--img">
                  {item.img_path && item.img_path !== "none" ? (
                  <div className="img-shine">
                    <Image
                      layout="fill" 
                      className="img-shine"
                      src={`https://soundshare-bucket.s3.us-east-2.amazonaws.com/${item.img_path}`}
                      loader={myLoader}
                      unoptimized={true}  
                      alt=""
                      
                    />
                  </div>)
                  : item.category === "fx" ? (
                      <div className="img-shine"> 
                        <Image layout="fill" className="img-shine" src={game} alt="" />
                      </div>
                    ) : (
                      <div className="img-shine">
                        <Image layout="fill" className="img-shine" src={music} alt="" />
                      </div>
                  )}
            </div>
  
            <div className="user-page--loopList--item--name-contain">
              <span>{name}</span>
              
                <span className="upload-txt">
                  Uploaded by {item.username} {daysText}
                </span>
              
              
  
            </div>
  
            {matches.big && <div
              className={`sound-list-item--btn-contain ${
                props.userPage && "user-page-action-container"
              }`}
            >
              <div className="sound-list-item--circle">
                <RepostButton
                  soundId={item.id}
                  username={item.username}
                  creator={item.creator_id}
                  setCount={setRepostCount}
                />
                <span className="followerLength">{repostCount} reposts</span>
              </div>
  
              <div className="sound-list-item--circle">
                <FavButton
                  soundId={item.id}
                  setCount={setFavCount}
                />
                <span className="followerLength info-likes">
                      {favCount} likes
                    </span>
              </div>
  
              <div className="sound-list-item--circle sound-list-item--download-btn">
                <DownloadButton
                  soundId={item.id}
                  name={name}
                  path={item.path}
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
              {item.img_path && item.img_path !== "none" ? (
                <div className="feedlist-img-contain">
                <Image
                  className="img-shine"
                  width={35}
                  height={35}
                  src={`https://soundshare-bucket.s3.us-east-2.amazonaws.com/${item.img_path}`}
                  loader={myLoader}
                  unoptimized={true}
                  alt=""
                  
                />
                </div>
              ) : (
                <div className="feedlist-img-contain">
                  <Image className="img-shine" src={music} alt="" layout="fill" />
                </div>
              )}
              <div className="feedlist-item-playbtn-contain">
                <div className={`recent-sounds--list--item--player user-page--loopList--item--player 
                  ${props.browse && "browse-soundlist--play"
                  } feed-soundlist--play`}>
                    <button
                      ref={playRef}
                      onClick={playSound}
                      className={`btn nohover user-loops-play ${props.feedUpload ? 'feed-playbtn-repost' : 'feed-playbtn-norepost'}`}
                    >
                      <Image height={21} width={21} src={playing ? pause : playBtn} alt="" />
                    </button>
                </div>
              </div>
            </div>
  
            <div
              className="user-page--loopList--item--name-contain feed-soundlist--username"
              onClick={goToSound}
            >
              {!props.feedUpload ? (
                <Fragment>
                  <span>{name}</span>
                  <span className="followerLength">Uploaded {daysText}</span>
                </Fragment>
              ) : (
                <Fragment>
                  <div className="feed-upload-name">
                    <span className="feed-soundname">{matches.smaller ? shorterName : name}</span>
                    <span className="repost-username">
                      Uploaded by: {item.username}
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
                props.feedUpload && "feed-list-btn-contain"
              }`}
            >
              <div className="feed-soundlist--btn--actions-container">
  
                <div className="feed-soundlist--btn--actions-container--btn">
                  <FavButton setCount={setFavCount} soundId={item.id} />
                </div>
  
                <div className="feed-soundlist--btn--actions-container--btn">
                  <RepostButton
                    soundId={item.id}
                    username={item.username}
                    creator={item.creator_id}
                    setCount={setRepostCount}
                  />
                  
                    
  
                </div>
  
                <div className="feed-soundlist--btn--actions-container--btn">
                  <DownloadButton
                    soundId={item.id}
                    name={name}
                    path={item.path}
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
    </div>
  )
}

export default SoundListItemRenderer