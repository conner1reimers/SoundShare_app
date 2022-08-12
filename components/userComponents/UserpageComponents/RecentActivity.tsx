import React from 'react'
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import getDaysSince from "../../../util/functions/getDaysSince";
import refresh from "/public/refresh.svg";
import cloud from "/public/cloud.svg";
import heart from "/public/heart2.svg";
import msg from "/public/chat.svg";
import follow from "/public/followers.svg";
import { useChangePage } from "../../../util/hooks/changePage";
import { UserpageState } from '../../../store/reducers/user/userPageInfo';
import Image from 'next/image';



interface Root {
  userPage: UserpageState
}


const RecentActivity = () => {
    const actions = useSelector((state: Root) => state.userPage.actions);
    const favSounds = useSelector((state: Root) => state.userPage.favSounds);
    const recentActivities = useSelector((state: Root) => state.userPage.recentActivities);
    const reposts = useSelector((state: Root) => state.userPage.userReposts);
    const userSounds = useSelector((state: Root) => state.userPage.sounds);
    const { gotoSingleSoundPage, goToUserPage } = useChangePage();


    
    return (
        <div className="user-page--left">
          
                <div className="user-page--left--inner">
                    <h2>Recent activity...</h2>
                    <ul className="globalList user-page--left--list">
                      {actions.map((el: any) => {
                          if (el.type === "favs") {
                            let id = el.target_id;
                            let faved = favSounds.find(
                              (ob: any) => parseInt(ob.id) === parseInt(id)
                            );
                            const daysText = getDaysSince(el.date);
        
                            let name;
                            let last;
                            if (faved.name.length > 16) {
                              name = faved.name.substring(0, 16); //cuts to 25
                              last = name.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
                              name = name.substring(0, last); //cuts from last space (to avoid cutting the middle of a word)
                              name = name + `...`; //adds (...) at the end to show that it's cut
                            } else {
                              name = faved.name;
                            }
        
                            return (
                              <li
                                className="user-page--left--list--item"
                                key={el.id}
                                onClick={(e) => gotoSingleSoundPage(e, id)}
                              >
                                <div className="user-page--left--list--item--img">
                                  <Image layout="fill" alt="" src={heart} />
                                </div>
                                <span className="user-page--left--list--item--text">
                                  Favorited sound:{" "}
                                </span>{" "}
                                <span className="user-page--left--list--item--name">
                                  {name}
                                </span>
                                <div className="user-page--left--list--item--dayssince">
                                  <span>{daysText}</span>
                                </div>
                              </li>
                            );
                          } else if (el.type === "follow") {
                            let id = el.target_id;
                            let user = recentActivities.find(
                              (ob: any) => parseInt(ob.id) === parseInt(id)
                            );
                            const daysText = getDaysSince(el.date);
        
                            let name;
                            let last;
                            if (user.username.length > 16) {
                              name = user.username.substring(0, 16); //cuts to 25
                              last = name.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
                              name = name.substring(0, last); //cuts from last space (to avoid cutting the middle of a word)
                              name = name + `...`; //adds (...) at the end to show that it's cut
                            } else {
                              name = user.username;
                            }
                            return (
                              <li
                                className="user-page--left--list--item"
                                key={el.id}
                                onClick={(e) => goToUserPage(e, id)}
                              >
                                <div className="user-page--left--list--item--img">
                                  <Image layout="fill" alt="" src={follow} />
                                </div>
                                <span className="user-page--left--list--item--text">
                                  Followed user:{" "}
                                </span>{" "}
                                <span className="user-page--left--list--item--name">
                                  {" "}
                                  {name}
                                </span>
                                <div className="user-page--left--list--item--dayssince">
                                  <span>{daysText}</span>
                                </div>
                              </li>
                            );
                          } else if (el.type === "reposts") {
                            let id = el.target_id;
                            let repost = reposts.find(
                              (ob: any) => parseInt(ob.sound_id) === parseInt(id)
                            );
                            const daysText = getDaysSince(el.date);
                            let name;
                            let last;
                            if (repost.name.length > 16) {
                              name = repost.name.substring(0, 16); //cuts to 25
                              last = name.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
                              name = name.substring(0, last); //cuts from last space (to avoid cutting the middle of a word)
                              name = name + `...`; //adds (...) at the end to show that it's cut
                            } else {
                              name = repost.name;
                            }
                            return (
                              <li
                                className="user-page--left--list--item"
                                key={el.id}
                                onClick={(e) => gotoSingleSoundPage(e, id)}
                              >
                                <div className="user-page--left--list--item--img">
                                  <Image layout="fill" alt="" src={refresh} />
                                </div>
                                <span className="user-page--left--list--item--text">
                                  Reposted sound:{" "}
                                </span>{" "}
                                <span className="user-page--left--list--item--name">
                                  {name}
                                </span>
                                <div className="user-page--left--list--item--dayssince">
                                  <span>{daysText}</span>
                                </div>
                              </li>
                            );
                          } else if (el.type === "sounds") {
                            let id = el.target_id;
                            let sounds = userSounds.find(
                              (ob: any) => parseInt(ob.id) === parseInt(id)
                            );
                            const daysText = getDaysSince(el.date);
        
                            let name;
                            let last;
                            if (sounds.name.length > 16) {
                              name = sounds.name.substring(0, 16); //cuts to 25
                              last = name.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
                              name = name.substring(0, last); //cuts from last space (to avoid cutting the middle of a word)
                              name = name + `...`; //adds (...) at the end to show that it's cut
                            } else {
                              name = sounds.name;
                            }
                            return (
                              <li
                                className="user-page--left--list--item"
                                key={el.id}
                                onClick={(e) => gotoSingleSoundPage(e, id)}
                              >
                                <div className="user-page--left--list--item--img">
                                  <Image layout="fill" alt="" src={cloud} />
                                </div>
                                <span className="user-page--left--list--item--text">
                                  Uploaded sound:{" "}
                                </span>{" "}
                                <span className="user-page--left--list--item--name">
                                  {name}
                                </span>
                                <div className="user-page--left--list--item--dayssince">
                                  <span>{daysText}</span>
                                </div>
                              </li>
                            );
                          } else if (el.type === "comments") {
                            let id = el.target_id;
                            let sounds = userSounds.find(
                              (ob: any) => parseInt(ob.id) === parseInt(id)
                            );
                            const daysText = getDaysSince(el.date);
        
                            let name;
                            let last;
                            if (sounds.name.length > 16) {
                              name = sounds.name.substring(0, 16); //cuts to 25
                              last = name.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
                              name = name.substring(0, last); //cuts from last space (to avoid cutting the middle of a word)
                              name = name + `...`; //adds (...) at the end to show that it's cut
                            } else {
                              name = sounds.name;
                            }
                            return (
                              <Fragment key={el.id}>
                                {sounds && (
                                  <li
                                    className="user-page--left--list--item"
                                    onClick={(e) => gotoSingleSoundPage(e, id)}
                                  >
                                    <div className="user-page--left--list--item--img">
                                      <Image layout="fill" alt="" src={msg} />
                                    </div>
                                    <span className="user-page--left--list--item--text">
                                      Commented on sound:{" "}
                                    </span>{" "}
                                    <span className="user-page--left--list--item--name">
                                      {name}
                                    </span>
                                    <div className="user-page--left--list--item--dayssince">
                                      <span>{daysText}</span>
                                    </div>
                                  </li>
                                )}
                              </Fragment>
                            );
                          }
                        })}
                    </ul>
                  </div>
        </div>
    )
}

export default RecentActivity
