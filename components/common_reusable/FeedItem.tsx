import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import refresh from '../../public/refresh.svg';
import cloud from '../../public/cloud.svg';
import heart from '../../public/heart2.svg';
import msg from '../../public/chat.svg';
import getDaysSince from '../../util/functions/getDaysSince';
import FeedItemFollow from './FeedItemFollow';
import { FeedState } from '../../store/reducers/user/feedReducer';
import Image from 'next/image';
import SoundListItem from './SoundListItem';


interface FeeditemProps {
    target: string
    type: string
    date: string
    userId: string
    second_target_id: string
}

interface RootState2 {
    feed: FeedState
}

const FeedItem: React.FC<FeeditemProps> = ({target, type, date, userId, second_target_id}) => {
    let returnElement;
    const feedState = useSelector((state: RootState2) => state.feed);

    if (type === 'favs') {
        let sound: any = feedState.soundData.find(ob => parseInt(ob.id) === parseInt(target));
        let follwedUser: any = feedState.userData.find(ob => parseInt(ob.id) === parseInt(userId));
        let daysTxt = getDaysSince(date);

        returnElement = (
            <li className="feed-page--feed-list--item feed-item--fav">
                <div className="feed-page--feed-list--item--user-contain">
                    <div className="feed-page--feed-list--item--user-contain--img">
                        <Image height={15} width={15} src={heart} alt=""/>
                    </div>
                    <div className="feed-page--feed-list--item--user-contain--text">
                        <span className="action-username">{follwedUser.username} Favorited: </span>
                        <span className="action-date">{daysTxt}</span>
                    </div>
                </div>

                

                <div className="feed-page--feed-list--item--name-contain">
                     <SoundListItem
                        sound_id={sound.id}
                        img_path={sound.img_path}
                        name={sound.name}
                        date={sound.date_time}
                        category={sound.category}
                        el={sound}
                        feed
                        path={sound.path}
                        creator={sound.sound_creator_id}
                        location="feed"
                        favCount={sound.favs.length}
                        repostCount={sound.reposts.length}
                        downloadCount={sound.downloads}
                     />
                   
                 </div>
            </li>
        )
    } else if (type === 'sounds') {
        let sound: any = feedState.soundData.find(ob => parseInt(ob.id) === parseInt(target));
        let follwedUser: any = feedState.userData.find(ob => parseInt(ob.id) === parseInt(userId));
        let daysTxt = getDaysSince(date);
        
        returnElement = (
            <li className="feed-page--feed-list--item feed-item--repost">
                 <div className="feed-page--feed-list--item--user-contain">
                    <div className="feed-page--feed-list--item--user-contain--img">
                        <Image height={15} width={15} src={cloud} alt=""/>
                    </div>
                    <div className="feed-page--feed-list--item--user-contain--text">
                        <span className="action-username">{follwedUser.username} Uploaded: </span>
                        <span className="action-date">{daysTxt}</span>
                    </div>
                </div>

                <div className="feed-page--feed-list--item--name-contain feed-list feed-list--repost">
                     <SoundListItem
                        sound_id={sound.id}
                        img_path={sound.img_path}
                        name={sound.name}
                        date={sound.date_time}
                        category={sound.category}
                        el={sound}
                        feed
                        feedUpload
                        uploadUser={sound.username}
                        path={sound.path}
                        creator={sound.sound_creator_id}
                        favCount={sound.favs.length}
                        repostCount={sound.reposts.length}
                        downloadCount={sound.downloads}
                        location="feed"

                     />
                   
                 </div>
                
            </li>
        )
    } else if (type === 'reposts') {
        let sound: any = feedState.soundData.find(ob => parseInt(ob.id) === parseInt(target));
        let follwedUser: any = feedState.userData.find(ob => parseInt(ob.id) === parseInt(userId));
        let daysTxt = getDaysSince(date);

        returnElement = (
            <li className="feed-page--feed-list--item feed-item--repost">
                <div className="feed-page--feed-list--item--user-contain">

                    <div className="feed-page--feed-list--item--user-contain--img">
                        <Image height={15} width={15} src={refresh} alt=""/>
                    </div>

                    <div className="feed-page--feed-list--item--user-contain--text">
                        <span className="action-username">{follwedUser.username} Reposted: </span>
                        <span className="action-date">{daysTxt}</span>
                    </div>
                    
                </div>

               

                 <div className="feed-page--feed-list--item--name-contain feed-list feed-list--repost">
                     <SoundListItem
                        sound_id={sound.id}
                        img_path={sound.img_path}
                        name={sound.name}
                        uploadUser={sound.username}
                        category={sound.category}
                        date={sound.date_time}
                        el={sound}
                        creator={sound.sound_creator_id}
                        feed
                        feedUpload
                        path={sound.path}
                        location="feed"
                        favCount={sound.favs.length}
                        repostCount={sound.reposts.length}
                        downloadCount={sound.downloads}

                     />
                   
                 </div>
            </li>
        )
    } else if (type === 'follow') {
        let user: any = feedState.userData.find(ob => parseInt(ob.id) === parseInt(target));
        let follwedUser: any = feedState.userData.find(ob => parseInt(ob.id) === parseInt(userId));
        let daysTxt = getDaysSince(date);
        let daysTxtJoined = getDaysSince(follwedUser.join_date);


        

        returnElement = (
            <FeedItemFollow
                usernameFollow={follwedUser.username}
                username={user.username}
                daysTxt={daysTxt}
                daysTxtJoined={daysTxtJoined}
                path={user.user_img_path}
                followerLength={user.followers.length}
                id={follwedUser.id}

            />);

    } else if (type === 'comments') {
        let sound: any = feedState.soundData.find(ob => parseInt(ob.id) === parseInt(target));
        let follwedUser: any = feedState.userData.find(ob => parseInt(ob.id) === parseInt(userId));
        let soundCom: any = feedState.soundData.find(ob => parseInt(ob.com_id) === parseInt(second_target_id));
        let commentMsg = soundCom.message;

        if (commentMsg.length > 10) {
            commentMsg = commentMsg.substring(0,10) + '...';
        }
        let daysTxt = getDaysSince(date);
        
        
        returnElement = (
            <li className="feed-page--feed-list--item feed-item--comment">

                <div className="feed-page--feed-list--item--user-contain">
                    <div className="feed-page--feed-list--item--user-contain--img">
                        <Image height={15} width={15} src={msg} alt=""/>
                    </div>
                    <div className="feed-page--feed-list--item--user-contain--text">
                        <span className="action-username">{follwedUser.username} commented: </span>
                        <span className="feed-comment-msg">{`"${soundCom && commentMsg}"`}</span>
                        <span className="action-date">{daysTxt}</span>
                    </div>
                    
                </div>

                 <div className="feed-page--feed-list--item--name-contain">
                     <SoundListItem
                        sound_id={sound.id}
                        img_path={sound.img_path}
                        name={sound.name}
                        date={sound.date_time}
                        category={sound.category}
                        el={sound}
                        feed
                        path={sound.path}
                        creator={sound.sound_creator_id}
                        location="feed"
                        favCount={sound.favs.length}
                        repostCount={sound.reposts.length}
                        downloadCount={sound.downloads}
                     />
                   
                 </div>
            </li>
        )
    }
    return (
        <Fragment>
            {returnElement}
        </Fragment>);
}

export default FeedItem
