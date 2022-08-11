import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttpClient } from "../../../../util/hooks/http-hook";
import BallLoader from "../../../animatedLoaders/BallLoader/BallLoader";
import DropDownItem from "./DropDownItem";

const NotificationDropdown = () => {
  const open = useSelector((state: any) => state.navbar.notif);
  const notifications = useSelector((state: any) => state.user.notifications);
  const uid = useSelector((state: any) => state.user.userId);

  const [allNotificationsShowing, setAllNotificationsShowing] = useState<any>(false);

  const dispatch = useDispatch();
  const { isLoading, sendRequest } = useHttpClient();

  const closeNav = () => {
    dispatch({ type: "CLOSE_NAVBAR_OPTIONS" });
  };
  

  const getAllNotifics = async () => {
    let res;
    const listEl: any = document.querySelector('.notifications-list');
    try {
      res = await sendRequest(
        `/users/notifications/${uid}`
      );
    
      dispatch({ type: "GET_ALL_NOTIFICATIONS", results: res });
      setAllNotificationsShowing(true);
      listEl.classList.add('notification-open')
    } catch (err) {}
  };


  return (
    <Fragment>
      {open && (
        <Fragment>
          <div className={`notifications-list ${allNotificationsShowing ? 'notification-open' : ''}`}>
            {notifications.length && notifications.length > 0 ? (
            <Fragment> 
              <ul className={`${allNotificationsShowing ? 'notification-open-ul' : ''}`}>
                {notifications.map((el: any) => {
                  return <DropDownItem key={el.date} item={el} />;
                })}
              </ul>
            <div className="notifications-list--see-all">
              {!allNotificationsShowing && !isLoading && (
                <button
                  onClick={getAllNotifics}
                  className="btn nohover upload-sound-button"
                >
                  See all
                </button>
              )}
              <div className="notifications-list--see-all--loader">
                <BallLoader loading={isLoading} />
              </div>
            </div>
            
            </Fragment>) : <div className="no-notifications">No notifications!</div>}
          </div>
          <div onClick={closeNav} className="notifications-list--close"></div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default React.memo(NotificationDropdown);
