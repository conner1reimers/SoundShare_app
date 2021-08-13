import Image from 'next/image';
import React from 'react'
import Media from 'react-media';
import { useFollowUser } from '../../util/hooks/useFollowUser';
import follow from '../../public/followers.svg';
import unknown from '../../public/question3.jpg';
import BallLoader from '../animatedLoaders/BallLoader/BallLoader';

interface FeedItemFollowProps {
    id: number
    usernameFollow: string
    daysTxt: string
    path: string
    username: string
    followerLength: string
    daysTxtJoined: string

}


const FeedItemFollow: React.FC<FeedItemFollowProps> = ({id, usernameFollow, daysTxt, path, username, followerLength, daysTxtJoined}) => {
    const {isFollowing, followUser, isLoading} = useFollowUser(id, 'feed');


    return (
        <li className="feed-page--feed-list--item feed-item--follow">
                
                <div className="feed-page--feed-list--item--user-contain">
                    <div className="feed-page--feed-list--item--user-contain--img">
                        <Image src={follow} alt=""/>
                    </div>
                    <div className="feed-page--feed-list--item--user-contain--text">
                        <span className="action-username">{usernameFollow} Followed: </span>
                        <span className="action-date">{daysTxt}</span>
                    </div>
                </div>

              

                <div className="feed-page--feed-list--item--name-contain feed-page--feed-list--item--name-contain--follow">
                    <div className="feed-page--feed-list--item--name-contain--follow-user">

                        <div className="feed-page--feed-list--item--name-contain--follow-user--img">
                        {path ? <Image
                            src={`https://soundshare-bucket.s3.us-east-2.amazonaws.com/${path}`}
                            alt=""
                            width={50}
                            height={50}
                        /> : <Image src={unknown} alt="" />}
                        </div>

                        <div className="feed-page--feed-list--item--name-contain--follow-user--username">
                            
                            <span>{username}</span>
                            <span className="followerLength">{followerLength} followers</span>
                            <span className="followerLength">Joined {daysTxtJoined}</span>

                            <Media query="(max-width: 550px)">
                                <div className="feed-page--feed-list--item--name-contain--follow-user--btn">
                                    <button type="button" onClick={followUser} className="btn nohover upload-sound-button"><span className="btnspan">{!isFollowing ? 'Follow' : 'Unfollow'}</span></button>
                                    <div className="feed-follower-ball-loader">
                                        <BallLoader loading={isLoading}/>
                                    </div>
                                </div>
                            </Media>

                        </div>
                        
                        <Media query="(min-width: 551px)">
                            <div className="feed-page--feed-list--item--name-contain--follow-user--btn">
                                <button type="button" onClick={followUser} className="btn nohover upload-sound-button"><span className="btnspan">{!isFollowing ? 'Follow' : 'Unfollow'}</span></button>
                                <div className="feed-follower-ball-loader">
                                    <BallLoader loading={isLoading}/>
                                </div>
                            </div>
                        </Media>
                                       
                    </div>
                    
                </div>
                
                
            </li>
        
        
    )
}

export default FeedItemFollow
