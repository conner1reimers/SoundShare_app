import React from 'react'
import { fetchRecentSounds } from "../../store/actions";
import SoundListItem from "../common_reusable/SoundListItem";
import { fetchMoreRecentSoundsloading } from "../../store/selectors";
import InPageLoadSpinner from "../animatedLoaders/InPageLoad/InPageLoadSpinner";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RecentSoundState } from "../../store/reducers/sounds/recentSound";
import SeeMoreBtn from './Side/SeeMoreBtn';
import { RootState } from '../../store/reducers';
import { FixedSizeList as List } from 'react-window';
import SoundListItemRenderer from '../common_reusable/SoundListItemRenderer';
import Media from 'react-media';


const SoundList: React.FC = (props: any) => {
    const recentSounds = useSelector((state: RootState) => state.recentSounds.sounds);
    const category = useSelector((state: RootState) => state.recentSounds.category)
    const dispatch = useDispatch();

    const isRefreshing = useSelector((state) => {
      return fetchMoreRecentSoundsloading(state);
    });
  
    const refreshFinished = useSelector(
      (state: RootState) => state.recentSounds.refreshFinished
    );
  
    useEffect(() => {
      if (category) {
        if (category === 'all') dispatch(fetchRecentSounds());
        else dispatch({type: "FETCH_RECENT_CATEGORY", category: category})
      }
      
    }, [category, dispatch]);
  
    console.log(props)
    
    return (
      
      <>
        
        <Media queries={{small: "(max-width: 1099px)", smallish: "(max-width: 1250px)", big: "(min-width: 1100px)", med: "(max-width: 1600px)", bigger: "(min-width: 1601px)" }}>
          {matches => (<>
        
            {recentSounds && <List
              itemSize={88}
              itemCount={recentSounds.length}
              style={{ overflowX: 'hidden' }}
              height={2000}
              width={matches.small ? "100%" : (matches.big && matches.smallish) ? "100%" : (matches.big && matches.med) ? "90%" : "80%"}
              itemData={recentSounds}
              location="recent"
              userPage
              className="recent-sounds--list no-scrollbars"
            >
              {SoundListItemRenderer}
            </List>}
            
            {!isRefreshing && !refreshFinished && <SeeMoreBtn/>}
      
            <div className="recent-sound-refresh">
              <InPageLoadSpinner loading={isRefreshing} />
              </div>
              </>
            )}

        </Media>
      </>
    
    )}

export default React.memo(SoundList);
