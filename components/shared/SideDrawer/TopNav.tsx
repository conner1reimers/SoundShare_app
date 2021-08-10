import React, { useState, useEffect, Fragment, useContext, useCallback } from "react";
import Input from "../Input/Input";
import { VALIDATOR_REQUIRE } from "../../util/validators";
import { useForm } from "../../util/hooks/useForm";
import FirstLottie from "../../Components/lotties/FirstLottie";
import { useHistory, useLocation, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Auth from "../../Components/Auth";
import { AuthContext } from "../../util/context/auth-context";
import { useSelector, useDispatch } from "react-redux";
import { setModalOpen, resetGlobalSound } from "../../store/actions";
import { useHttpClient } from "../../util/hooks/http-hook";
import { useSearchSound } from "../../util/hooks/searchHook";
import padlock from "../../util/img/padlock.svg";
import userImg from "../../util/img/user.svg";
import feed from "../../util/img/feed.svg";
import upload from "../../util/img/upload2.svg";
import help from "../../util/img/question.svg";
import browse from "../../util/img/browse.svg";
import down from "../../util/img/top-arrow.svg";
import down2 from "../../util/img/top-arrow2.svg";
import cloud from "../../util/img/cloud2.svg";
import Notification from "./Notifications/Notification";
import NotificationDropdown from "./Notifications/NotificationDropdown";
import MouseOverLabel from "../../util/MouseOverLabel";
import UploadModal from "../Modals/Upload/UploadModal";
import useLogout from '../../util/hooks/useLogout';
import LoadingAnimation from "../../Components/lotties/LoadingAnimation/LoadingAnimation";
import BrowseOptions from "./BrowseOptions/BrowseOptions";
import BrowseOptionModal from "./BrowseOptions/BrowseOptionModal";

const optionsVariants = {
  initial: {
    y: "-40%",
    opacity: 0.9,
  },
  out: {
    y: "-200%",
    opacity: 0,
  },
  in: {
    y: "0%",
    opacity: 1,
  },
};

const optionsTransition = {
  type: "spring",
  mass: 1,
  damping: 21,
  stiffness: 120,
  velocity: 1,
};


const TopNav: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const [isOnSoundPage, setIsOnSoundPage] = useState<any>(null);
  const authModalOpen = useSelector((state: any) => state.sideDrawer.authModalOpen);
  const uploadModalOpen = useSelector((state: any) => state.upload.modalOpen);
  const isLoading = useSelector((state: any) => state.ui.mainLoader);
  
  const logout = useLogout();
  const dispatch = useDispatch();

  const location = useLocation();
  const soundRegex = /sounds/.test(location.pathname);


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



  
  return (
    <header className="top-nav-big">
      <Scroller />

      <div className="top-nav-big--links">
        
        {user.isLoggedIn && (
          <Fragment>
            <NavLink
              to={`/user/${user.userId}`}
              className="top-nav-big--links--user"
            >
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
                    <img
                      src={`https://soundshare-bucket.s3.us-east-2.amazonaws.com/${user.full.user_img_path}`}
                      className="userpic-contain-top--img"
                      alt=""
                    />
                  ) : (
                    <img className="userpic-contain-top--img" src={userImg} alt="" />
                  )}
                </Fragment>)}
                {user.full && <span>{user.full.username}</span>}
              </div>
            </NavLink>


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
              <DropDownMenu openUpload={openUpload} logout={logout} userId={user.userId} />
            </NavItem>

          </Fragment>
        )}
        {!user.isLoggedIn && (
          <Fragment>
            <div className="notlogged--topnav">
              <MouseOverLabel
                classname="topnav-mouseover"
                labelClass="topnav-mouseover--label"
                label="Login / Signup"
              >
                <button onClick={openAuth} className="top-nav-big--links--item">
                  <div className="bell-icon--contain">
                    <img src={padlock} alt="" />
                  </div>
                </button>
              </MouseOverLabel>
              <MouseOverLabel
                classname="topnav-mouseover about-mouseover"
                labelClass="topnav-mouseover--label"
                label="About Soundshare"
              >
                <NavLink to="/about" className="top-nav-big--links--item">
                  <div className="bell-icon--contain">
                    <img src={help} alt="" />
                  </div>
                </NavLink>
              </MouseOverLabel>

              
              {/* <NavLink to="/browse" className="top-nav-big--links--item">
                <div className="bell-icon--contain">
                  <img src={browse} alt="" />
                </div>
              </NavLink> */}

              <BrowseOptions/>
           
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

const Scroller: React.FC = React.memo(() => {
  const [isOnHome, setIsOnHome] = useState<any>(null);
  const [searchOpen, setSearchOpen] = useState<any>(false);
  const [scrolledFar, setScrolledFar] = useState<any>(false);
  const aModalIsOpen = useSelector((state: any) => state.globalMsg.aModalIsOpen);

  const [formState, inputHandler] = useForm(
    {
      search: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const goToHome = () => {
    history.push("/");
  };



  const history = useHistory();


  const searchSounds = (e: any) => {
    e.preventDefault();
    setSearchOpen(true);
    
  };


  
  const location = useLocation();
  const regex = /home/.test(location.pathname);
  const soundRegex = /sounds/.test(location.pathname);

  useEffect(() => {
    if (regex) {
      setIsOnHome(true);
    } else {
      setIsOnHome(false);
    }

    

  }, [location]);

  useEffect(() => {
    const scrollFunc = () => {
      if (window.scrollY > 205 && !scrolledFar) {
        setScrolledFar(true);
      } else if (window.scrollY < 200 && scrolledFar) {
        setScrolledFar(false);
      }
    };
    window.addEventListener("scroll", scrollFunc);

    return () => {
      window.removeEventListener("scroll", scrollFunc);
      setIsOnHome(false);
    };
  });

  return (
    <Fragment>
      <AnimatePresence exitBeforeEnter>
        {((scrolledFar && !aModalIsOpen) || (!isOnHome && !aModalIsOpen)) && (
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={optionsVariants}
            transition={optionsTransition}
            onClick={goToHome}
            className="top-nav-big--icon"
          >
            <FirstLottie nav />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!scrolledFar && (
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={optionsVariants}
            transition={optionsTransition}
            className="top-nav-big--input--outter"
          >
            <form onSubmit={searchSounds}>
              <Input
                formControlClass="top-nav-big--input--outter"
                class="top-nav-big--input"
                onInput={inputHandler}
                element="input"
                id="name"
                validators={VALIDATOR_REQUIRE()}
                label="search sound"
                labelClass="top-nav-big--input--label"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <BrowseOptionModal search setOpen={setSearchOpen} searchTxt={formState.inputs.name} open={searchOpen}/>
    </Fragment>
  );
});

interface Props {
  children: any,

}

const NavItem: React.FC<Props> = React.memo(({children}) => {
  const isOpen = useSelector((state: any) => state.navbar.xtra);
  const dispatch = useDispatch();

  const setOpen = () => {
    dispatch({ type: "TOGGLE_NAVBAR_XTRA" });
  };

  const location = useLocation();
  const [curLoaction] = useState<any>(location.pathname);

  useEffect(() => {
    if (location.pathname !== curLoaction) {
      dispatch({ type: "CLOSE_NAVBAR_OPTIONS" });
    }
  }, [location.pathname]);

  return (
    <Fragment>
      <a onClick={setOpen} className="top-nav-big--links--item bell-icon">
        <div className="bell-icon--contain">
          <img className="down-top" src={!isOpen ? down : down2} alt="" />
        </div>
      </a>
      {isOpen && children}
    </Fragment>
  );
});


interface DropDownMenuProps{
  openUpload: any,
  userId: any,
  logout: any,

}

interface DropItemProp{
  click?: any,
  children?: any,
  rightIcon?: any,
  leftIcon?: any,
  link?: any,


}


const DropDownMenu: React.FC<DropDownMenuProps> = React.memo(({openUpload, userId, logout}) => {
  const dispatch = useDispatch();

  const closeNav = () => {
    dispatch({ type: "CLOSE_NAVBAR_OPTIONS" });
  };

  const DropDownItem: React.FC<DropItemProp> = ({click, rightIcon, children, link, leftIcon}) => {
    const clickItem = () => {
      click();
    };
    return (
      <Fragment>
        {link ? (
          <div className="dropdown-top--item">
            <NavLink
              to={link || "#"}
              className="dropdown-top--item--link"
            >
              {leftIcon && (
                <span className="dropdown-top--item--icon">
                  {leftIcon}
                </span>
              )}
              <span className="dropdown-top--item--text">{children}</span>
              {rightIcon && (
                <span className="dropdown-top--item--icon">
                  {rightIcon}
                </span>
              )}
            </NavLink>
          </div>
        ) : (
          <div onClick={clickItem} className="dropdown-top--item">
            <a className="dropdown-top--item--link">
              {leftIcon && (
                <span className="dropdown-top--item--icon">
                  {leftIcon}
                </span>
              )}
              <span className="dropdown-top--item--text">{children}</span>
              {rightIcon && (
                <span className="dropdown-top--item--icon">
                  {rightIcon}
                </span>
              )}
            </a>
          </div>
        )}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <div className="dropdown-top">
        <DropDownItem
          click={openUpload}
          leftIcon={<img src={cloud} alt="" />}
        >
          Upload Sound
        </DropDownItem>
        <DropDownItem
          link={`/feed/${userId}`}
          leftIcon={<img src={feed} alt="" />}
        >
          Following Feed
        </DropDownItem>
        <DropDownItem link="/about" leftIcon={<img src={help} alt="" />}>
          Contact
        </DropDownItem>
        <DropDownItem
          click={logout}
          leftIcon={<img src={padlock} alt="" />}
        >
          Logout
        </DropDownItem>
        
      </div>
      <div onClick={closeNav} className="notifications-list--close"></div>

    </Fragment>
  );
});

export default React.memo(TopNav);
