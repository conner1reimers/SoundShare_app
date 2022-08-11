import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';
import getDaysSince from '../../../util/functions/getDaysSince';
import { useHttpClient } from '../../../util/hooks/http-hook';
import InPageLoadSpinner from '../../animatedLoaders/InPageLoad/InPageLoadSpinner';
import SingleComment from './SingleComment';



const Comments: React.FC = () => {
    const [refreshing, setRefreshing] = useState(false);
    
    const dispatch = useDispatch();
    const curOffset = useSelector((state: RootState) => state.singleSound.sound.offset);
    const refreshFinish = useSelector((state: RootState) => state.singleSound.sound.refreshFinish);
    const sid = useSelector((state: RootState) => state.singleSound.sound.id);
    const comments = useSelector((state: RootState) => state.singleSound.comments);


    const {sendRequest} = useHttpClient();

    const fetchMoreComments = async () => {
        let response: any;
        try {
            response =
                await sendRequest(`/sounds/more-comments/${curOffset}/${sid}`);
            

            if (response.msg === 'success' && response.sounds.length > 0) {
                dispatch({ type: "FETCH_MORE_COMMENTS", payload: response.comments });
            }
            else { }
            
            setRefreshing(false);
        } catch (err){
            setRefreshing(false);
        }
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

        if (!refreshFinish) {
            window.removeEventListener("scroll", handleScroll);
        }
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, [refreshFinish]);

      useEffect(() => {
        if (refreshing && !refreshFinish) {
          fetchMoreComments();
        }
      }, [refreshing]);
    

    return (
        <Fragment>
            <div className="single-sound-comments">
                <ul className="single-sound-comments--list">
                    {comments.length > 0 && comments.map((el: any, indx: any) => {
                        let date = getDaysSince(el.comment_date);

                        return (
                            <SingleComment 
                                key={el.com_id}
                                id={el.com_id}
                                message={el.message}
                                path={el.user_img_path}
                                date={date}
                                username={el.username}
                                creator_id={el.comment_creator}
                                indx={indx}
                            />
                        )
                    })}
                </ul>
            </div>
            <div className="refresh-comment-spinner">
                <InPageLoadSpinner loading={refreshing}/>
            </div>
        </Fragment>
    )
}

export default Comments
