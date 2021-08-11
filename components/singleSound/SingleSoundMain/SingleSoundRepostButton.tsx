import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from "../../../store/reducers/user";
import { useHttpClient } from '../../../util/hooks/http-hook';
import { useGlobalMsg } from '../../../util/hooks/useGlobalMsg';
import BallLoader from '../../animatedLoaders/BallLoader/BallLoader';
import RepostButton from '../../common_reusable/RepostButton';

interface Root {
    user: UserState,
}

interface Props {
  creator2: any,
  setSoundInfo: any,
  id: any,
  moveDown: any,
  further: any
}

const SingleSoundRepostButton: React.FC<Props> = ({creator2, moveDown, setSoundInfo, id, further}) => {
  const userId = useSelector((state: Root) => state.user.userId);
  const token = useSelector((state: Root) => state.user.token);
  const dispatch = useDispatch();
  const [isReposted, setIsReposted] = useState<boolean>(false);
  const { isLoading, sendRequest } = useHttpClient();
  const setGlobalMsg = useGlobalMsg();

  const repostSound = async (e: any) => {
    let response;
    let creator;
    e.preventDefault();
    e.stopPropagation();
    if (!creator) {
      creator = 1;
    } else {
      creator = creator2;
    }

    if (userId) {
      
        try {
          response = await sendRequest(
            `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/repost/${userId}/${id}/${creator}/`,
            "POST",
            null,
          { "Authorization": "Bearer "+token}
          );
          if (response.msg === "removed") {
            setSoundInfo((prev: any) => {
              const newReposts = prev.sound.reposts.filter((el: any) => {
                return el !== userId.toString()
              })
              return {
                ...prev,
                sound: {
                  ...prev.sound,
                  reposts: newReposts
                }
              }
            })
          
            dispatch({type: "USER_UNREPOST_SOUND", id: id});
            setIsReposted(false);
  
          } else if (response.msg === "reposted") {
            
            setSoundInfo((prev: any) => {
              const newReposts = [...prev.sound.reposts, userId.toString()];
              return {
                ...prev,
                sound: {
                  ...prev.sound,
                  reposts: newReposts
                }
              }
            })
            dispatch({type: "USER_REPOST_SOUND", id: id});
            setIsReposted(true);
          }
          
        } catch (err) {}
      } else {
        setGlobalMsg('Please login to repost a sound.', 'error');

    }
  }; 

  return (
    <div className={`single-sound--repost`}>
      <BallLoader loading={isLoading} repost />
      <div
        onClick={repostSound}
        className={`sound-list-item--circle circle-btn-single-sound singlesound-btn ${moveDown ? 'move-down' : ''} ${further ? 'move-down-more' : ''}`}
      >
        <span>Repost</span>
        <RepostButton isReposted={isReposted} singlesound soundId={id} />
      </div>
    </div> 
    
  );
}


export default React.memo(SingleSoundRepostButton);
