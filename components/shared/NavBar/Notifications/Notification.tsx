import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter  } from "next/router";
import { useHttpClient } from "../../../../util/hooks/http-hook";
import bell from "../../../../public/bell.svg";
import bell2 from "../../../../public/bell2.svg";

const Notification: React.FC = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.user.token);
  const location = useRouter();

  const notifications = useSelector(
    (state: any) => state.user.uncheckedNotifications);

  const uid = useSelector((state: any) => state.user.userId);
  const { sendRequest } = useHttpClient();

  const openNotif = async () => {
    dispatch({ type: "TOGGLE_NOTIFICATIONS" });
    if (notifications && notifications.length) {
      dispatch({ type: "CLEAR_NOTIFICATIONS" });
      let result;
      if (uid) {
        try {
          result = await sendRequest(
            `/users/notification/check`,
            "PATCH",
            JSON.stringify({
              uid: uid,
            }),
            { "Content-Type": "application/json", 'Authorization': 'Bearer '+token }
          );
       
        } catch (err) {}
      }
    }
  };

  const [curLoaction] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== curLoaction) {
      dispatch({ type: "CLOSE_NAVBAR_OPTIONS" });
    }
  }, [location.pathname]);

  return (
    <Fragment>
      {notifications && notifications.length > 0 ? (
        <a className="top-nav-big--links--item bell-icon" onClick={openNotif}>
          <div className="bell-icon--contain">
            <Image src={bell} alt="" height={20} width={20}/>

            <div className="top-nav-big--links--notifications">
              <span>{notifications.length}</span>
            </div>
          </div>
        </a>
      ) : (
        <a className="top-nav-big--links--item bell-icon" onClick={openNotif}>
          <div className="bell-icon--contain">
              <Image src={bell2} alt="" height={20} width={20}/>
          </div>
        </a>
      )}
    </Fragment>
  );
};

export default React.memo(Notification);
