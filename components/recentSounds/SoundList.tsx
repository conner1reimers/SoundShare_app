import React from 'react'
import { fetchRecentSounds } from "../../store/actions";
import SoundListItem from "../common_reusable/SoundListItem";
import { fetchMoreRecentSoundsloading } from "../../store/selectors";
import InPageLoadSpinner from "../animatedLoaders/InPageLoad/InPageLoadSpinner";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RecentSoundState } from "../../store/reducers/recentSound";

interface Root {
  recentSounds: RecentSoundState,
}

const SoundList: React.FC = () => {
    const recentSounds = useSelector((state: Root) => state.recentSounds.sounds);
    const category = useSelector((state: Root) => state.recentSounds.category)

    const refreshFinished = useSelector(
      (state: Root) => state.recentSounds.refreshFinished
    );
  
    const offset = useSelector((state: Root) => state.recentSounds.offset);
    const dispatch = useDispatch();
  
    useEffect(() => {
      if (category) {
        if (category === 'all') {
          dispatch(fetchRecentSounds());
        } 
        else {
          dispatch({type: "FETCH_RECENT_CATEGORY", category: category})
        }
      }
      
    }, [category]);
  
    const getMoreSounds = () => {
      const header: any = document.querySelector(".recent-sounds--head");
      header.classList.add("recent-sounds--moreSoundsOpen");
      dispatch({ type: "FETCH_RECENT_MORE", offset: offset, category: category });
    };
  
    const isRefreshing = useSelector((state) => {
      return fetchMoreRecentSoundsloading(state);
    });
  
    return (
      <ul className="recent-sounds--list">
        <div className="recent-sounds--list--border"></div>
        {recentSounds &&
          recentSounds.map((el: any) => {
            if (category !== "vocal") {
              return el.category !== "vocal" && (
                <SoundListItem
                  key={el.id}
                  id={el.id}
                  sound_id={el.id}
                  img_path={el.img_path}
                  path={el.path}
                  name={el.name}
                  el={el}
                  category={el.category}
                  date={el.date_time}
                  creator={el.creator_id}
                  userPage
                  location="recent"
                  favCount={el.favs.length}
                  repostCount={el.reposts.length}
                  downloadCount={el.downloads}
                />
              );
            } else {
              return (
                <SoundListItem
                  key={el.id}
                  id={el.id}
                  sound_id={el.id}
                  img_path={el.img_path}
                  path={el.path}
                  name={el.name}
                  el={el}
                  category={el.category}
                  date={el.date_time}
                  creator={el.creator_id}
                  userPage
                  location="recent"
                  favCount={el.favs.length}
                  repostCount={el.reposts.length}
                  downloadCount={el.downloads}
                />
              );
            }
            
          })}
        
        {!isRefreshing && !refreshFinished && (
          <div className="recent-sounds--seemore">
            <button
              onClick={getMoreSounds}
              className="btn nohover upload-sound-button"
              type="button"
            >
              SEE MORE
            </button>
          </div>
        )}
  
        <div className="refresh-browse-spinner">
          <InPageLoadSpinner loading={isRefreshing} />
        </div>
      </ul>
    
    )}

export default React.memo(SoundList);
