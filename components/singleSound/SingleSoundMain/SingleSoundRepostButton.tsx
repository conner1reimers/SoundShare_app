import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SoundState } from '../../../store/reducers/sounds/soundPageReducer';
import { UserState } from "../../../store/reducers/user/user";
import { useHttpClient } from '../../../util/hooks/http-hook';
import { useGlobalMsg } from '../../../util/hooks/useGlobalMsg';
import BallLoader from '../../animatedLoaders/BallLoader/BallLoader';
import RepostButton from '../../common_reusable/RepostButton';

interface Root {
  user: UserState,
  singleSound: SoundState  
}


const SingleSoundRepostButton: React.FC = () => {
  const userId = useSelector((state: Root) => state.user.userId);
  const token = useSelector((state: Root) => state.user.token);
  const id = useSelector((state: Root) => state.singleSound.sound.id);
  const creator = useSelector((state: Root) => state.singleSound.sound.creator_id);


  const dispatch = useDispatch();
  const [isReposted, setIsReposted] = useState<boolean>(false);
  const { isLoading, sendRequest } = useHttpClient();
  const setGlobalMsg = useGlobalMsg();

  const repostSound = async (e: any) => {
    let response;
    let creatorID;
    if (!creator) creatorID = 1;
    else creatorID = creator;
    
    if (userId) {
      
        try {
          response = await sendRequest(
            `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/repost/${userId}/${id}/${creatorID}/`,
            "POST",
            null,
          { "Authorization": "Bearer "+token}
          );
          if (response.msg === "removed") {
            dispatch({ type: "USER_UNREPOST_SOUND", id: id });
            dispatch({ type: "SINGLESOUND_REMOVE_REPOST", payload: userId });
            setIsReposted(false);
          } else if (response.msg === "reposted") {
            dispatch({ type: "USER_REPOST_SOUND", id: id });
            dispatch({ type: "SINGLESOUND_REPOST", payload: userId });
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
        className={`sound-list-item--circle circle-btn-single-sound singlesound-btn `}
      >
        <span>Repost</span>
        <RepostButton isReposted={isReposted} singlesound soundId={id} />
      </div>
    </div> 
    
  );
}


export default React.memo(SingleSoundRepostButton);
