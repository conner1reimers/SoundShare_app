import React, { useState, useEffect, Fragment, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModalOpen, resetGlobalSound, fetchRecentSounds } from "../../../store/actions";
import padlock from "/public/padlock.svg";
import userImg from "/public/user.svg";
import help from "/public/question.svg";
import Notification from "./Notifications/Notification";
import NotificationDropdown from "./Notifications/NotificationDropdown";
import MouseOverLabel from "../../../util/MouseOverLabel";
import UploadModal from "../Modals/Upload/UploadModal";
import useLogout from '../../../util/hooks/useLogout';
import BrowseOptions from "../Modals/BrowseOptions/BrowseOptions";
import { useRouter } from "next/router";
import Image from "next/image";
import LoadingAnimation from "../../animatedLoaders/LoadingAnimation/LoadingAnimation";
import Auth from "../../auth/Auth";
import Link from 'next/link';
import { useChangePage } from "../../../util/hooks/changePage";
import NavIcon from "./NavIcon";
import loadable from '@loadable/component'

const NavItem = loadable(() => import('./NavItem'))
const Dropdown = loadable(() => import('./DropDownMenu'))
// const NavIcon = loadable(() => import('./NavIcon'))





const TopNav: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const [isOnSoundPage, setIsOnSoundPage] = useState<any>(null);
  const authModalOpen = useSelector((state: any) => state.sideDrawer.authModalOpen);
  const uploadModalOpen = useSelector((state: any) => state.upload.modalOpen);
  const isLoading = useSelector((state: any) => state.ui.mainLoader);
  
  const logout = useLogout();
  const dispatch = useDispatch();

  const location = useRouter();
  const soundRegex = /sounds/.test(location.pathname);
  const { goToUserPage } = useChangePage();

  const goToUser = useCallback((e) => {
    goToUserPage(e, user.userId)
  }, [user.userId, goToUserPage]);

  const openAuth = useCallback(() => {
    dispatch({type: "OPEN_AUTH_MODAL"});
    dispatch(setModalOpen());
    if (!isOnSoundPage) {
      dispatch(resetGlobalSound());
    }
    
  }, [isOnSoundPage]); 

  const openUpload = useCallback(() => {
    dispatch({type: "OPEN_UPLOAD_MODAL"});
    dispatch(setModalOpen());
    dispatch({ type: "CLOSE_NAVBAR_OPTIONS" });
    if (!isOnSoundPage) {
      dispatch(resetGlobalSound());
    }
    
  }, [isOnSoundPage]); 


  useEffect(() => {
    if (soundRegex) {
      setIsOnSoundPage(true);
    } else {
      setIsOnSoundPage(false);
    }
  }, [location]);

  const myLoader = ({ src, width, quality }) => {
    return `https://soundshare-bucket.s3.us-east-2.amazonaws.com/${user.full.user_img_path}`;
  }
  
  
  useEffect(() => {
    let try1: any = document.querySelector('.usperpic-main-container-nav');

    if (try1) {
      let el: any = try1.children[0];
      el.style.overflow = "visible";
      let newImg: any = el.querySelector('img');
      if (newImg) {
        newImg.style.boxShadow = 'none';
      }
    }

    

  }, [user]);

  
  return (
    <header className="top-nav-big">
      <NavIcon />

      <div className="top-nav-big--links">
        
        {user.isLoggedIn && (
          <Fragment>
            
                <a className="top-nav-big--links--user" onClick={goToUser}>
                <div
                  className={`bell-icon--contain ${
                    user.full && user.full.user_img_path
                      ? "userpic-contain-top"
                      : "userpic-contain-top userpic-contain-top--noimg"
                  }`}
                >
                  {user.full && (
                    <Fragment>
                    
                      {user.full.user_img_path ? (
                        <div className="usperpic-main-container-nav-withimg">
                          <Image
                            src={`https://soundshare-bucket.s3.us-east-2.amazonaws.com/${user.full.user_img_path}`}
                            className="userpic-contain-top--img"
                            alt=""
                            height={35}
                            width={35}
                            unoptimized={true}
                            loader={myLoader}
                          />
                        </div>
                      ) : (
                      <div className="usperpic-main-container-nav">
                        <Image
                          className="userpic-contain-top--img"
                          height={35}
                          width={35}
                          src={userImg}
                          alt=""
                        />
                      </div>
                    )}
                  
                  </Fragment>)}
                  {user.full && <span>{user.full.username}</span>}
                </div>
              </a>
            


            <MouseOverLabel
                classname="topnav-mouseover"
                labelClass="topnav-mouseover--label"
                label="Notifications"
            >
              <Notification />
            </MouseOverLabel>


            <NotificationDropdown />
            
            <BrowseOptions/>

            <NavItem>
              <Dropdown openUpload={openUpload} logout={logout} userId={user.userId} />
            </NavItem>

          </Fragment>
        )}
        {!user.isLoggedIn && (
          <Fragment>
            <div className="notlogged--topnav">

              <BrowseOptions />
              
              <MouseOverLabel
                classname="topnav-mouseover"
                labelClass="topnav-mouseover--label"
                label="Login / Signup"
              >
                <button onClick={openAuth} className="top-nav-big--links--item">
                  <div className="bell-icon--contain">
                    <Image src={padlock} alt="" />
                  </div>
                </button>
              </MouseOverLabel>

              
              

              <MouseOverLabel
                classname="topnav-mouseover about-mouseover"
                labelClass="topnav-mouseover--label"
                label="About Soundshare"
              >
                <Link href="/about">
                  <a className="top-nav-big--links--item">
                    <div className="bell-icon--contain">
                      <Image src={help} alt="" />
                    </div>
                  </a>
                </Link>
              </MouseOverLabel>

              

              
           
            </div>
          </Fragment>
        )}

        

      </div>

      <UploadModal open={uploadModalOpen}/>
      <Auth open={authModalOpen} />
      <LoadingAnimation loading={isLoading}/>

    </header>
  );
};









export default React.memo(TopNav);
