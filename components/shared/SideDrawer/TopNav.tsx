import React, { useState, useEffect, Fragment, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { setModalOpen, resetGlobalSound } from "../../../store/actions";
import padlock from "/public/padlock.svg";
import userImg from "/public/user.svg";
import feed from "/public/feed.svg";
import help from "/public/question.svg";
import down from "/public/top-arrow.svg";
import down2 from "/public/top-arrow2.svg";
import cloud from "/public/cloud2.svg";
import Notification from "./Notifications/Notification";
import NotificationDropdown from "./Notifications/NotificationDropdown";
import MouseOverLabel from "../../../util/MouseOverLabel";
import UploadModal from "../Modals/Upload/UploadModal";
import useLogout from '../../../util/hooks/useLogout';
import BrowseOptions from "./BrowseOptions/BrowseOptions";
import BrowseOptionModal from "./BrowseOptions/BrowseOptionModal";
import Input from "../../common_reusable/Input";
import { useRouter } from "next/router";
import Image from "next/image";
import { useForm } from "../../../util/hooks/useForm";
import { VALIDATOR_REQUIRE } from "../../../util/validators";
import FirstLottie from "../../animatedLoaders/FirstLottie";
import LoadingAnimation from "../../animatedLoaders/LoadingAnimation/LoadingAnimation";
import Auth from "../../auth/Auth";
import Link from 'next/link';

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

  const location = useRouter();
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
        console.log(newImg)
      }
    }

    

  }, [user]);

  
  return (
    <header className="top-nav-big">
      <Scroller />

      <div className="top-nav-big--links">
        
        {user.isLoggedIn && (
          <Fragment>
            <Link
              href={`/user/${user.userId}`}
              
            >
                <a className="top-nav-big--links--user">
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
                            loader={myLoader}
                            
                            />
                        </div>
                    ) : (<div className="usperpic-main-container-nav">
                      <Image
                        className="userpic-contain-top--img"
                        height={35}
                        width={35}
                        src={userImg}
                            alt="" />
                        </div>
                    )}
                  
                  </Fragment>)}
                  {user.full && <span>{user.full.username}</span>}
                </div>
              </a>
            </Link>


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

              
              {/* <Link to="/browse" className="top-nav-big--links--item">
                <div className="bell-icon--contain">
                  <Image src={browse} alt="" />
                </div>
              </Link> */}

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

  const goToHome = (event) => {
    event.preventDefault();
    event.stopPropagation();
    location.push("/", undefined, { shallow: true });
  };




  const searchSounds = (e: any) => {
    e.preventDefault();
    setSearchOpen(true);
    
  };


  
  const location = useRouter();
  const regex = /home/.test(location.pathname);

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

  const location = useRouter();
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
          <Image className="down-top" src={!isOpen ? down : down2} alt="" />
        </div>
      </a>
      {isOpen && children}
    </Fragment>
  );
});

NavItem.displayName = "Navitem";

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
            <Link
              href={link || "#"}
            >
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
            </Link>
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
          leftIcon={<Image src={cloud} alt="" />}
        >
          Upload Sound
        </DropDownItem>
        <DropDownItem
          link={`/feed/${userId}`}
          leftIcon={<Image src={feed} alt="" />}
        >
          Following Feed
        </DropDownItem>
        <DropDownItem link="/about" leftIcon={<Image src={help} alt="" />}>
          Contact
        </DropDownItem>
        <DropDownItem
          click={logout}
          leftIcon={<Image src={padlock} alt="" />}
        >
          Logout
        </DropDownItem>
        
      </div>
      <div onClick={closeNav} className="notifications-list--close"></div>

    </Fragment>
  );
});

DropDownMenu.displayName = "ddmenu";

export default React.memo(TopNav);
