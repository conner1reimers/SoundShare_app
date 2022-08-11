import { useRouter } from 'next/router'
import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BallLoader from '../../components/animatedLoaders/BallLoader/BallLoader';
import DropDownItem from '../../components/shared/NavBar/Notifications/DropDownItem';
import { RootState } from '../../store/reducers';
import { useHttpClient } from '../../util/hooks/http-hook';

export default function Notification() {
 const notifications = useSelector((state: RootState) => state.user.notifications);
 const uid = useSelector((state: RootState) => state.user.userId);
 const { isLoading, sendRequest } = useHttpClient();
 const [allNotificationsShowing, setAllNotificationsShowing] = useState(false);
 const dispatch = useDispatch(); 

 const getAllNotifics = async () => {
     let res;
     try {
       res = await sendRequest(
         `/users/notifications/${uid}`
       );
       
       dispatch({ type: "GET_ALL_NOTIFICATIONS", results: res });
       setAllNotificationsShowing(true);
     } catch (err) {}
   };

 useEffect(() => {
   window.scrollTo(0, 0);
   document.title = "Notifications - Soundshare";
 }, []);

 
 return (
     <div className="mobile-notifications-page">
         <div className="mobile-notifications-page--head-contain">
             <h1>Notifications</h1>
         </div>

         <ul>
             {notifications && notifications.map((el: any) =>  <DropDownItem key={el.date} item={el} />)}
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
         

     </div>
 )
}