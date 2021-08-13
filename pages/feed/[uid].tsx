import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingAnimation from '../../components/animatedLoaders/LoadingAnimation/LoadingAnimation';
import FeedItem from '../../components/common_reusable/FeedItem';
import { RootState } from '../../store/reducers';
import { isUserFeedLoading } from '../../store/selectors';

export default function Feed() {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const feedState = useSelector((state: RootState) => state.feed);

    const isLoading = useSelector(state => {
        return isUserFeedLoading(state)
    })

    
    useEffect(() => {
        if (user.full) {
            if (user.full.following) {
                dispatch({type: 'FETCH_FEED', uid: user.userId, following: user.full.following.join(',')})
            }
        }
    }, [user.full]);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Feed - Soundshare";
    }, []);
  
  

  return (
    <Fragment>
            <LoadingAnimation loading={isLoading}/>
            <div className="feed-page">

                <div className="feed-page--middle">
                    <div className="feed-page--head">
                        <h1></h1>
                    </div>

                    <div className="feed-page--feed-list">
                        {feedState.actions && <ul className="globalList">
                            {feedState.actions.map((el: any) => {
                                
                                return (
                                <FeedItem
                                    key={el.id}
                                    type={el.type}
                                    userId={el.user_id}
                                    target={el.target_id}
                                    date={el.date}
                                    second_target_id={el.second_target_id}
                                />)
                            })}
                        </ul>}
                        {feedState.actions && feedState.actions === 0 && (
                            <div className="user-no-sounds">
                                <div>
                                <p>
                                    The people you follow {`haven't`} been up to anything.
                                </p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>


            </div>
        </Fragment>
        
  )
}