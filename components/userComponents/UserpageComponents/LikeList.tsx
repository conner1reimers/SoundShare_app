import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UserpageState } from '../../../store/reducers/user/userPageInfo';
import { useHttpClient } from '../../../util/hooks/http-hook';
import InPageLoadSpinner from '../../animatedLoaders/InPageLoad/InPageLoadSpinner';
import SoundListItem from '../../common_reusable/SoundListItem';



interface Root {
  userPage: UserpageState
}





const FavList: React.FC = () => {
    const [refreshing, setRefreshing] = useState(false)

    const userInfo = useSelector((state: Root) => state.userPage.favSounds);
    const curOffset = useSelector((state: Root) => state.userPage.refreshOptions.offsetFavs);
    const refreshFinish = useSelector((state: Root) => state.userPage.refreshOptions.favFinished);
    const userId = useSelector((state: Root) => {
        if (state.userPage.user) return state.userPage.user.id;
    });
    const dispatch = useDispatch();
    const {sendRequest} = useHttpClient();


    

    const fetchMoreSounds = async () => {
        let response;
        try {
         
            response = await sendRequest(
            `/sounds/more-userfavs/${curOffset}/${userId}`);
            


            if (response.msg === 'success') {
                dispatch({type: "REFRESH_USER_FAVS", sounds: response.sounds})

            } else {}
            setRefreshing(false); 
        } catch (err){}
    }

    const handleScroll = (e: any) => {
        if (
          window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight
        ) {
          return;
        } else {
          if (!refreshing && !refreshFinish) setRefreshing(true);
        }
      };

      useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        if (refreshFinish) {
            window.removeEventListener("scroll", handleScroll);
        }
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, [refreshFinish]);

      useEffect(() => {
        if (refreshing && !refreshFinish) {
          fetchMoreSounds();
        }
      }, [refreshing]);


    return (
        <Fragment>
      <ul className="globalList user-page--loopList">
        {userInfo &&
          userInfo.length > 0 &&
          userInfo.map((el: any) => {
            return (
              <SoundListItem
                key={el.id}
                sound_id={el.id}
                img_path={el.img_path}
                name={el.name}
                category={el.category}
                el={el}
                date={el.date_time}
                userPage
                path={el.path}
                creator={el.creator_id}
                location="user-favs"
                favCount={el.favs.length}
                repostCount={el.reposts.length}
                downloadCount={el.downloads}
              />
            );
          })}
  
        {userInfo && userInfo.length === 0 && (
            <li className="user-no-sounds">
              <div>
                <p>
                  This user {`hasn't`} liked any sounds yet.
                </p>
              </div>
            </li>
          )}
      </ul>
        <div className="refresh-comment-spinner">
            <InPageLoadSpinner loading={refreshing}/>
        </div>
        </Fragment>

    );
  };

export default FavList;
