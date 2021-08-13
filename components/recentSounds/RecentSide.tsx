import React, { useCallback, useEffect, useState } from "react";
import folder from "../../public/sound-waves3.svg";
import eye from "../../public/eye.svg";
import { useSelector, useDispatch } from "react-redux";
import { useChangePage } from "../../util/hooks/changePage";
import EditImgModal from '../shared/Modals/EditImgModal';
import SoundListItem from "../common_reusable/SoundListItem";
import { RefreshTopDownloadsLoading, refreshTopLikedLoading } from "../../store/selectors";
import InPageLoadSpinner from "../animatedLoaders/InPageLoad/InPageLoadSpinner";
import { useGlobalMsg } from "../../util/hooks/useGlobalMsg";
import { RecentSoundState } from "../../store/reducers/recentSound";
import Image from "next/image";


interface Root {
  recentSounds: RecentSoundState
}


const RecentSide: React.FC = () => {
  const [openDownloads, setOpenDownloads] = useState(false);
  const [openLiked, setOpenLiked] = useState(false);

  const dispatch = useDispatch();
  const topLiked = useSelector((state: Root) => state.recentSounds.topLiked);
  const topDownloaded = useSelector((state: Root) => state.recentSounds.topDownloaded);

  const { gotoSingleSoundPage } = useChangePage();

  const allDownloads = () => {
    setOpenDownloads(true);
    dispatch({type: 'FETCH_TOP_DOWNLOADS'})
  }

  const allTopLiked = () => {
    setOpenLiked(true);
    dispatch({type: 'FETCH_TOP_LIKED'})

  }

  return (
    <div className="recent-sounds--side-big">
      <div className="recent-sounds--side-big--box">
        <div className="recent-sounds--side-big--box--head">
          <h1>Top Liked Sounds</h1>
        </div>
        <ul className="recent-sounds--side-big--box--list">
          {topLiked &&
            topLiked.map((el: any) => {
              let name;
              let last;
              if (el.name.length > 25) {
                name = el.name.substring(0, 25); //cuts to 25
                last = name.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
                name = name.substring(0, last); //cuts from last space (to avoid cutting the middle of a word)
                name = name + `...`; //adds (...) at the end to show that it's cut
              } else {
                name = el.name;
              }
              return (
                <li
                  key={el.id}
                  onClick={(event) => gotoSingleSoundPage(event, el.id)}
                  className="recent-sounds--side-big--box--list--item"
                >
                  <div className="recent-sounds--side-big--box--list--item--title">
                    <Image className="recent-img" src={folder} alt="" />
                    <p>{name}</p>
                  </div>
                  <div className="recent-sounds--side-big--box--list--item--info">
                    <p>{el.username}</p>
                  </div>
                </li>
              );
            })}
        </ul>
        <div className="sound-list-item--circle recent-side--circle">
          <div className="recent-sounds--side--more">
            <button onClick={allTopLiked} className="btn nohover">
              <span>See more</span>
              <div>
                <Image src={eye} alt=""/>
              </div>
            </button>
          </div>
        </div>
      </div>

      

      <div className="recent-sounds--side-big--box recent-sounds--side-big--box--notfirst">
        <div className="recent-sounds--side-big--box--head">
          <h1>Top Downloaded Sounds</h1>
        </div>
        <ul className="recent-sounds--side-big--box--list">
          {topDownloaded &&
            topDownloaded.map((el: any) => {
              let name;
              let last;
              if (el.name.length > 25) {
                name = el.name.substring(0, 25); //cuts to 25
                last = name.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
                name = name.substring(0, last); //cuts from last space (to avoid cutting the middle of a word)
                name = name + `...`; //adds (...) at the end to show that it's cut
              } else {
                name = el.name;
              }
              return (
                <li
                  key={el.id}
                  onClick={(event) => gotoSingleSoundPage(event, el.id)}
                  className="recent-sounds--side-big--box--list--item"
                >
                  <div className="recent-sounds--side-big--box--list--item--title">
                    <Image className="recent-img" src={folder} alt="" />
                    <p>{name}</p>
                  </div>
                  <div className="recent-sounds--side-big--box--list--item--info">
                    <p>{el.username}</p>
                  </div>
                </li>
              );
            })}
        </ul>
        
        <div className="sound-list-item--circle recent-side--circle">
          <div className="recent-sounds--side--more">
            <button onClick={allDownloads} className="btn nohover">
              <span>See more</span>
              <div>
                <Image src={eye} alt=""/>
              </div>
            </button>
          </div>
        </div>
        
      </div> 

      <div className="recent-sounds--side-big--box recent-sounds--side-big--box--notfirst">
        <div className="ad-hm-slot">
          <div id="div-gpt-ad-MPU-2" className="ad-slot">
          </div>
        </div>
      </div>

      <EditImgModal alldownloads open={openLiked} closeModal={() => setOpenLiked(false)}>
        <AllLikesList/>
      </EditImgModal>


     <EditImgModal alldownloads open={openDownloads} closeModal={() => setOpenDownloads(false)}>
       <AllDownloadsList/>
     </EditImgModal>
    </div>
  );
};

const AllDownloadsList = () => {
  const topDownloadedAll = useSelector((state: Root) => state.recentSounds.topDownloadedAll);
  const [refreshing, setRefreshing] = useState(false);
  const curOffset = useSelector((state: Root) => state.recentSounds.refreshTopList.topDownloadedOffset);
  const refreshFinish = useSelector((state: Root) => state.recentSounds.refreshTopList.refreshFinishedDownload);
  const msgShown = useSelector((state: Root) => state.recentSounds.refreshTopList.downloadMsgShown);

  const reduxDispatch = useDispatch();
  const setGlobalMsg = useGlobalMsg();

  const handleScroll = useCallback((e) => {
    const element: any = document.querySelector('.all-downloads');

    if (
      element.scrollTop + element.offsetHeight !==
      element.scrollHeight
    ) {
      return;
    } else {
      if (!refreshing && !refreshFinish) setRefreshing(true);
    }
  }, [refreshing, refreshFinish])

  useEffect(() => {
    const element: any = document.querySelector('.all-downloads');

    if (!refreshFinish) element.addEventListener("scroll", handleScroll)
    else {
      element.removeEventListener("scroll", handleScroll);

      if (!msgShown) {
        setGlobalMsg('No more sounds available.', 'error');
        reduxDispatch({type: 'TOP_DOWNLOAD_MSG_SHOWN'})
      }
    }

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [refreshFinish, handleScroll]);

  useEffect(() => {
    if (refreshing && !refreshFinish) {
      reduxDispatch({
        type: "REFRESH_ALL_DOWNLOADS",
        offset: curOffset,
      });
      setRefreshing(false);
    }
  }, [refreshing, curOffset, reduxDispatch, refreshFinish]);

  const isRefreshing = useSelector((state) => {
    return RefreshTopDownloadsLoading(state);
  });
  return (
    <div className="all-downloads">
      <ul className="globalList all-downloads-list">
        {topDownloadedAll && topDownloadedAll.map((el: any) => {
          return (
            <SoundListItem
              key={el.id}
              sound_id={el.id}
              img_path={el.img_path}
              name={el.name}
              el={el}
              date={el.date_time}
              category={el.category}
              path={el.path}
              userPage
              creator={el.creator_id}
              location="top-downloaded"
              favCount={el.favs.length}
              repostCount={el.reposts.length}
              downloadCount={el.downloads}
            />
          )
        })}
        <div className="all-downloads-refreshing">
          <InPageLoadSpinner loading={isRefreshing}/>
        </div>
      </ul>
    </div>
  )
}

const AllLikesList = () => {
  const topLikedAll = useSelector((state: Root) => state.recentSounds.topLikedAll);
  const [refreshing, setRefreshing] = useState<any>(false);
  const curOffset = useSelector((state: Root) => state.recentSounds.refreshTopList.topLikedOffset);
  const refreshFinish = useSelector((state: Root) => state.recentSounds.refreshTopList.refreshFinishedLike);
  const msgShown = useSelector((state: Root) => state.recentSounds.refreshTopList.likeMsgShown);

  const reduxDispatch = useDispatch();
  const setGlobalMsg = useGlobalMsg();

  const isRefreshing = useSelector((state) => {
    return refreshTopLikedLoading(state);
  });

  const handleScroll = useCallback((e) => {
    const element: any = document.querySelector('.all-downloads');

    if (
      element.scrollTop + element.offsetHeight !==
      element.scrollHeight
    ) {
      return;
    } else {
      if (!refreshing && !refreshFinish) setRefreshing(true);
    }
  }, [refreshing, refreshFinish])

  useEffect(() => {
    const element: any = document.querySelector('.all-downloads');

    if (!refreshFinish) element.addEventListener("scroll", handleScroll)
    else {
      element.removeEventListener("scroll", handleScroll);
      if (!msgShown) {
        setGlobalMsg('No more sounds available.', 'error');
        reduxDispatch({type: 'TOP_LIKE_MSG_SHOWN'})
      }
      
    }

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [refreshFinish, handleScroll]);



  useEffect(() => {
    if (refreshing && !refreshFinish) {
      reduxDispatch({
        type: "REFRESH_ALL_LIKES",
        offset: curOffset,
      });
      setRefreshing(false);
    }
  }, [refreshing, curOffset, reduxDispatch, refreshFinish]);


  return (
    <div className="all-downloads">
      <ul className="globalList all-downloads-list">
        {topLikedAll && topLikedAll.map((el: any) => {
          return (
            <SoundListItem
              key={el.id}
              sound_id={el.id}
              img_path={el.img_path}
              name={el.name}
              el={el}
              category={el.category}
              path={el.path}
              date={el.date_time}
              userPage
              creator={el.creator_id}
              location="top-liked"
              favCount={el.favs.length}
              repostCount={el.reposts.length}
              downloadCount={el.downloads}
            />
          )
        })}
        <div className="all-downloads-refreshing">
          <InPageLoadSpinner loading={isRefreshing}/>
        </div>
        
      </ul>

    </div>
  )
}

export default React.memo(RecentSide);
