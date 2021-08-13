import React from 'react';
import follow from "/public/followers.svg";
import {useFollowUser} from '../../../util/hooks/useFollowUser'
import { useGlobalMsg } from '../../../util/hooks/useGlobalMsg';
import BallLoader from '../../animatedLoaders/BallLoader/BallLoader';
import Image from 'next/image';


interface Props {
  id: any,
  isMyPage: any

}




const FollowBtn: React.FC<Props> = ({ isMyPage, id }) => {
    const {isFollowing, followUser, setIsFollowing, isLoading} = useFollowUser(id, 'userpage');
    const setGlobalMsg = useGlobalMsg();

    const followUserMain = async (e: any) => {
        if (!isMyPage) {
          followUser(e);
        } else {
          setGlobalMsg(`You can not follow yourself`, 'error');
        }
        
    };

    return (
        <div className="user-page--info--followBtn outline-btn moveright">
            <button
              onClick={followUserMain}
              className="btn nohover"
              type="button"
            >
               
                <span>
                  {isFollowing ? 'Unfollow' : 'Follow'}
                  <Image src={follow} alt="" />
                </span>
              
            </button>
            <BallLoader loading={isLoading}/>
        </div>
                    
    )
}

export default FollowBtn
