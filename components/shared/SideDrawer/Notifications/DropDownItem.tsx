import Image from 'next/image';
import React, { Fragment, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import getDaysSince from '../../../../util/functions/getDaysSince';
import { useChangePage } from '../../../../util/hooks/changePage';
import unknown from '../../../../util/img/unknown.svg';

interface Item {
  type: string
  username: string
  target_id: string
  user_img_path: string
  date: string
  extra_data: string
  name: string
}

interface DropProps {
  item: Item
}

const DropDownItem: React.FC<DropProps> = ({item}) => {
    const { goToUserPage, gotoSingleSoundPage } = useChangePage();
    const dispatch = useDispatch();

    let {
      type,
      username,
      target_id,
      user_img_path,
      date,
      extra_data,
    } = item;

    let name: any;
    let last;
    if (item.name && item.name.length > 25) {
      name = item.name.substring(0, 25); //cuts to 25
      last = name.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
      name = name.substring(0, last); //cuts from last space (to avoid cutting the middle of a word)
      name = name + `...`; //adds (...) at the end to show that it's cut
    } else if (item.name) {
      name = item.name;
    }

    const lengthAdded = item.name.length + username.length;

    const closeNav = () => {
        dispatch({ type: "CLOSE_NAVBAR_OPTIONS" });
      };

    const goToSound = useCallback(
      (e) => {
        gotoSingleSoundPage(e, target_id);
        closeNav();
      },
      [item, gotoSingleSoundPage, closeNav]
    );

    const goToUser = useCallback(
      (e) => {
        goToUserPage(e, target_id);
        closeNav();
      },
      [item, goToUserPage, closeNav]
    );

    let returnEl;

    if (type === "favs") {
      let days = getDaysSince(date);
      returnEl = (
        <li onClick={goToSound} className={`notifications-list--item ${lengthAdded < 13 ? 'notifications-list--item--smaller' : ''}`}>
          <div className="notifications-list--contain">
            <span className="notifications-list--img">
              <Image src={user_img_path ? `https://soundshare-bucket.s3.us-east-2.amazonaws.com/${user_img_path}` : unknown} alt="" />
            </span>
            <div className="notifications-list--textcontain">
              
              <span className="notifications-list--item--othertext">
              <span className="notification-username-text">{username}</span>
              {" "} favorited {`"${name}"`}
              </span>
              <span className="notifications-list--item--datetext">{days}</span>
            </div>
          </div>
        </li>
      );
    } else if (type === "comments") {
      let days = getDaysSince(date);
      let newName;
      let last;
      if (name.length > 17) {
        newName = name.substring(0, 17); //cuts to 25
        last = newName.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
        newName = newName.substring(0, last); //cuts from last space (to avoid cutting the middle of a word)
        newName = newName + `...`; //adds (...) at the end to show that it's cut
      } else {
        newName = name;
      }
      let commentShort;
      const comLength = newName.length + username.length;

      let lastComment;
      if (extra_data.length < 55) {
        commentShort = true;
      } else if (extra_data.length >= 55 && extra_data.length < 150) {
        commentShort = false;
      } else if (extra_data.length >= 150) {
        commentShort = false;
        extra_data = extra_data.substring(0, 150); //cuts to 25
        lastComment = extra_data.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
        extra_data = extra_data.substring(0, lastComment); //cuts from last space (to avoid cutting the middle of a word)
        extra_data = extra_data + `...`;
      }

      returnEl = (
        <li
          onClick={goToSound}
          className={`notifications-list--item notifications-list--item--comment ${!commentShort ? 'notifications-list--item--comment--longcom' : ''}`}
        >
          <div className="notifications-list--contain">
            <span className="notifications-list--img">
              <Image src={user_img_path ? `https://soundshare-bucket.s3.us-east-2.amazonaws.com/${user_img_path}` : unknown} alt="" />
            </span>

            <div className={`notifications-list--textcontain notifications-list--textcontain--comment notifications-list--item--comment--short ${!commentShort ? 'long-notific-comment' : ''}`}>
             
              <span className="notifications-list--item--othertext">
                <span className="notification-username-text">{username}</span>
                {" "}commented on {`"${newName}"`}
              </span>
              <p className="notifications-list--item--comment--text">
                {`"${extra_data}"`}
              </p>
              <span className="notifications-list--item--datetext notifications-list--item--datetext--comment">
                {days}
              </span>
            </div>
          </div>
        </li>
      );
    } else if (type === "follow") {
      let days = getDaysSince(date);

      returnEl = (
        <li onClick={goToUser} className="notifications-list--item">
          <div className="notifications-list--contain">
            <span className="notifications-list--img">
              <Image src={user_img_path ? `https://soundshare-bucket.s3.us-east-2.amazonaws.com/${user_img_path}` : unknown} alt="" />
            </span>
            <div className="notifications-list--textcontain">
              
              <span className="notifications-list--item--othertext">
              <span className="notification-username-text">{username}</span>{" "}followed you!
              </span>
              <span className="notifications-list--item--datetext">{days}</span>
            </div>
          </div>
        </li>
      );
    } else if (type === "reposts") {
      let days = getDaysSince(date);
      let newName;
      let last;
      if (name.length > 20) {
        newName = name.substring(0, 20); //cuts to 25
        last = name.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
        newName = newName.substring(0, last); //cuts from last space (to avoid cutting the middle of a word)
        newName = newName + `...`; //adds (...) at the end to show that it's cut
      } else {
        newName = name;
      }
      returnEl = (
        <li onClick={goToSound} className="notifications-list--item">
          <div className="notifications-list--contain">
            <span className="notifications-list--img">
              <Image src={user_img_path ? `https://soundshare-bucket.s3.us-east-2.amazonaws.com/${user_img_path}` : unknown} alt="" />
            </span>
            <div className="notifications-list--textcontain">
              
              <span className="notifications-list--item--othertext">
              <span className="notification-username-text">{username}</span>
              {" "}reposted {`"${newName}"`}
              </span>
              <span className="notifications-list--item--datetext">{days}</span>
            </div>
          </div>
        </li>
      );
    }
    return (
      <Fragment>
        {returnEl}
      </Fragment>);
  };

export default DropDownItem
