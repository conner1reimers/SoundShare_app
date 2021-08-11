import React, { Fragment, useState, useEffect } from 'react'
import getDaysSince from '../../../util/functions/getDaysSince';
import { useHttpClient } from '../../../util/hooks/http-hook';
import InPageLoadSpinner from '../../animatedLoaders/InPageLoad/InPageLoadSpinner';
import SingleComment from './SingleComment';


interface Props {
    soundInfo: any,
    setSoundInfo: any
}

const Comments: React.FC<Props> = ({soundInfo, setSoundInfo}) => {
    const [refreshing, setRefreshing] = useState(false)
    const curOffset = soundInfo.offset;
    const refreshFinish = soundInfo.refreshFinish;
    const {sendRequest} = useHttpClient();

    const fetchMoreComments = async () => {
        let response: any;
        try {
            response = await sendRequest(
            `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/more-comments/${curOffset}/${soundInfo.sound.id}`);
            

            if (response.msg === 'success' && response.sounds.length > 0) {
                let newComments = [...soundInfo.comments, ...response.comments];

                setSoundInfo((prevState: any) => {
                    
                    return {
                        ...prevState,
                        comments: newComments,
                        refreshFinish: response.comments.length < 20,
                        offset: newComments.length
                    }
                });
                
            } else {}
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
                    {soundInfo && soundInfo.comments.length > 0 && soundInfo.comments.map((el: any, indx: any) => {
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
                                setSoundInfo={setSoundInfo}
                                soundInfo={soundInfo}
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
