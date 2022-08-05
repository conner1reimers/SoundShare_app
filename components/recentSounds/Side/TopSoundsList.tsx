import React, { Fragment, useCallback, useEffect, useState } from "react";
import folder from "../../public/sound-waves3.svg";
import eye from "../../public/eye.svg";
import { useSelector, useDispatch } from "react-redux";
import { useChangePage } from "../../../util/hooks/changePage";
import EditImgModal from '../../shared/Modals/EditImgModal';
import SoundListItem from "../../common_reusable/SoundListItem";
import { RefreshTopDownloadsLoading, refreshTopLikedLoading } from "../../../store/selectors";
import InPageLoadSpinner from "../../animatedLoaders/InPageLoad/InPageLoadSpinner";
import { useGlobalMsg } from "../../../util/hooks/useGlobalMsg";
import { RecentSoundState } from "../../../store/reducers/sounds/recentSound";
import { FixedSizeList as List } from 'react-window';
import SoundListItemRenderer from "../../common_reusable/SoundListItemRenderer";
import { UiState } from "../../../store/reducers/ui/uiStateReducer";

interface Props {
  type: string
}

interface Root {
  recentSounds: RecentSoundState,
  ui: UiState

}


const TopSoundsList: React.FC<Props> = ({type}) => {
  const topSounds = useSelector((state: Root) => {
    return type === "DOWNLOADS" ?
      state.recentSounds.topDownloadedAll
      : state.recentSounds.topLikedAll
  });
  
  const [refreshing, setRefreshing] = useState(false);
  const curOffset = useSelector((state: Root) => state.recentSounds.refreshTopList.offset);
  const refreshFinish = useSelector((state: Root) => state.recentSounds.refreshTopList.refreshFinished);
  const msgShown = useSelector((state: Root) => state.recentSounds.refreshTopList.msgShown);
  const modalRef = useSelector((state: Root) => state.ui.modalRef);


  
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

    if (element && modalRef)
    {
      if (!refreshFinish) element.addEventListener("scroll", handleScroll)
      else {
        element.removeEventListener("scroll", handleScroll);
        if (!msgShown) {
          setGlobalMsg('No more sounds available.', 'error');
          reduxDispatch({type: 'TOP_LIKE_MSG_SHOWN'})
        }
        
      }
    }

    return () => {
      if(element) element.removeEventListener("scroll", handleScroll);
      
    };
  }, [refreshFinish, handleScroll, modalRef, reduxDispatch, setGlobalMsg, msgShown]);

  useEffect(() => {
    if (refreshing && !refreshFinish) {
      reduxDispatch({
        type: `REFRESH_ALL_${type}`,
        offset: curOffset,
      });
      setRefreshing(false);
    }
  }, [refreshing, curOffset, reduxDispatch, refreshFinish, type]);

  const isRefreshing = useSelector((state) => RefreshTopDownloadsLoading(state));

  
  return (
    <Fragment>
      {topSounds && modalRef && <List
        itemSize={75}
        itemCount={topSounds.length}
        style={{ overflowX: 'hidden' }}
        height={modalRef.current.clientHeight}
        width="100%"
        itemData={topSounds}
        location="top-sounds"
        userPage
        className="all-downloads"
        overscanCount={1}
      >
          {SoundListItemRenderer}
          

        </List>}
        <div className="all-downloads-refreshing">
            <InPageLoadSpinner loading={isRefreshing}/>
          </div>
        
      {/* </ul> */}

    </Fragment>
  )
}

export default TopSoundsList;