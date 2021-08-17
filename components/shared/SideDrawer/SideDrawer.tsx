import React, { useState, Fragment, useCallback, useEffect } from 'react'
import {motion, AnimatePresence} from 'framer-motion';
import ReactDOM from 'react-dom';
import { Box, Typography, List, ListItem, Button } from '@material-ui/core';
import Auth from '../../auth/Auth';
import { useSelector, useDispatch } from 'react-redux';
import { setModalOpen, resetGlobalSound, setModalClosed } from '../../../store/actions';
import bell from "../../../public/bell.svg";
import UploadModal from '../Modals/Upload/UploadModal';
import useLogout from '../../../util/hooks/useLogout'
import BrowseOptionsMobile from './BrowseOptions/BrowseOptionsMobile';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

const optionsVariants = {
    initial: {

        x: '-40%',
        opacity: 0.9



    },
    out: {


        x: '-200%',
        opacity: 0



    },
    in: {

        x: '0%',
        opacity: 1

    }
}

const optionsTransition = {
    type: 'spring',
    mass: 1,
    damping: 21,
    stiffness: 120,
    velocity: 1
    
}

interface Props {
    open: any
}


const SideDrawer: React.FC<Props> = ({open}) => {
    const auth = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const [locationOption, setLocationOption] = useState<any>(null);
    const authModalOpen = useSelector((state: any)  => state.sideDrawer.authModalOpen);
    const uploadModalOpen = useSelector((state: any)  => state.upload.modalOpen);
    const sideDrawerOpen = useSelector((state: any)  => state.sideDrawer.open);
    const aModalIsOpen = useSelector((state: any)  => state.globalMsg.aModalIsOpen);

    const openAuth = useCallback(() => {
        dispatch({type: "CLOSE_SIDE_DRAWER"});
        dispatch({type: "OPEN_AUTH_MODAL"});
        dispatch(setModalOpen());
        dispatch(resetGlobalSound());
    }, []);

    const openUploadModal = useCallback(() => {
        dispatch({type: "CLOSE_SIDE_DRAWER"});
        dispatch({type: "OPEN_UPLOAD_MODAL"});
        dispatch(setModalOpen());
        dispatch(resetGlobalSound());
    }, []);


    const location = useRouter();
    const uid = useSelector((state: any)  => state.user.userId);
    const notifications = useSelector(
        (state: any) => state.user.uncheckedNotifications
      );
    const logoutUser = useLogout();

    useEffect(() => {
        const homeRegex = /home/.test(location.pathname);
        const browseRegex = /browse/.test(location.pathname);
        
        let feedReg;
        let testFeedPage;
        let userPageReg;
        let testUserPage;
        let notificReg;
        let testNotificationPage;
        if (uid) {
            feedReg = new RegExp("/feed/" + uid, "g");
            testFeedPage = feedReg.test(location.pathname);
            userPageReg = new RegExp("/user/" + uid, "g");
            notificReg = new RegExp("/notification/" + uid, "g");
            testUserPage = userPageReg.test(location.pathname);
            testNotificationPage = notificReg.test(location.pathname);
        }
        
        if (homeRegex) {
            setLocationOption('home');
        } else if (browseRegex) {
            setLocationOption('browse');
        } else if (uid) {
            if (testUserPage) {
                setLocationOption('user');
            } else if (testFeedPage) {
                setLocationOption('feed');
            } else if (testNotificationPage) {
                setLocationOption('notification');
            }
        }
    }, [location.pathname, uid]);

    
    useEffect(() => {
        if (sideDrawerOpen) {
            if (authModalOpen) {
                dispatch({type: "CLOSE_AUTH_MODAL"});
            }
            if (uploadModalOpen) {
                dispatch({type: "CLOSE_UPLOAD_MODAL"});
            }
            if (aModalIsOpen) dispatch(setModalClosed());
        }
        
    }, [sideDrawerOpen])

    
    
    const logout = useCallback(() => {
        dispatch({type: "MAIN_LOADER_START"});
        logoutUser();
        location.push('/home');
        dispatch({type: "CLOSE_SIDE_DRAWER"});
        window.scrollTo(0, 0);
    }, []);

    const closeSideDrawer = useCallback(() => {
        dispatch({type: "CLOSE_SIDE_DRAWER"});
    }, [dispatch]);

    const goHome = (e) => {
        dispatch({type: "MAIN_LOADER_START"});
        e.preventDefault();
        location.push('/home', undefined, {shallow: true});

    }


    const loginElement =
    auth.isLoggedIn ? 
    <div className="sidedrawer-navlink">
        <button className="btn nohover sidedrawer--list--btn" onClick={logout} color="primary">
                Logout
        </button>
    </div>
    : 
    ( <div className="sidedrawer-navlink">
        <button className="btn nohover sidedrawer--list--btn" onClick={openAuth} color="primary">
            Sign in!
        </button>
    </div>)

    const homeElement = <a onClick={goHome}>
        <a className={`sidedrawer-navlink ${locationOption === 'home' ? 'active-sidedrawer' : ''}`}>
            <button 
                onClick={() => dispatch({type: "CLOSE_SIDE_DRAWER"})} 
                className="btn nohover sidedrawer--list--btn"
                >Home 
            </button>
        </a>
        </a>

    const userpageElement = 
    auth.isLoggedIn ? 
    (<Link href={`/user/${uid}`}>
        <a className={`sidedrawer-navlink ${locationOption === 'user' ? 'active-sidedrawer' : ''}`} >
            <button 
                onClick={() => dispatch({type: "CLOSE_SIDE_DRAWER"})} 
                className="btn nohover sidedrawer--list--btn"
                >Your profile 
            </button>
        </a>
    </Link>)
    : (<div className={`sidedrawer-navlink`}>
            <button 
                onClick={openAuth} 
                className="btn nohover sidedrawer--list--btn"
                >Your profile 
            </button>
        </div>)
    
    const feedElement = 
    auth.isLoggedIn ? 
    (<Link href={`/feed/${uid}`}>
        <a className={`sidedrawer-navlink ${locationOption === 'feed' ? 'active-sidedrawer' : ''}`}>
            <button 
                onClick={() => dispatch({type: "CLOSE_SIDE_DRAWER"})} 
                className="btn nohover sidedrawer--list--btn"
                >Your Feed
            </button>
        </a>
    </Link>)
    : null

    const notificationElement = 
    (auth.isLoggedIn && notifications) ? 
    (<Link href={`/notification/${uid}`}>
        <a className={`sidedrawer-navlink ${locationOption === 'notification' ? 'active-sidedrawer' : ''}`} >
            
        
        <button 
            onClick={() => dispatch({type: "CLOSE_SIDE_DRAWER"})} 
            className="btn nohover sidedrawer--list--btn"
            >Notifications
                {notifications.length > 0 && <div className="bell-icon--contain">
                    <Image src={bell} alt=""/>
                    <div className="top-nav-big--links--notifications">
                        <span>{notifications.length}</span>
                    </div>
                </div>}
        </button>
        </a>
    </Link>)
    : null
    


    const finalEl = process.browser ? ReactDOM.createPortal(
        <Fragment>
            <AnimatePresence exitBeforeEnter>
                {sideDrawerOpen &&
                (<motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={optionsVariants}
                    transition={optionsTransition}
                    className="sidedrawer">
                    <Box component="div" display="flex" flexDirection="column" className="sidedrawer--box">

                        <Typography  color="primary" variant="h1" component="h1" className="sidedrawer--head headings">SoundShare</Typography>


                        <List className="sidedrawer--list">
                            <ListItem>
                                {homeElement}
                            </ListItem>

                            <ListItem>
                                {loginElement}
                            </ListItem>

                            <ListItem>
                                <BrowseOptionsMobile locationOption={locationOption}/>
                            </ListItem>

                            <ListItem>
                                <Link href='/about'>
                                    <a className={`sidedrawer-navlink ${locationOption === 'contact' ? 'active-sidedrawer' : ''}`}>
                                        <button 
                                            onClick={() => dispatch({type: "CLOSE_SIDE_DRAWER"})} 
                                            className="btn nohover sidedrawer--list--btn"
                                            >Contact 
                                        </button>
                                    </a>
                                </Link>
                            </ListItem>

                            

                            {auth.isLoggedIn && ( 
                            <Fragment>
                                <ListItem>
                                    {userpageElement}
                                </ListItem>

                                <ListItem>
                                    {feedElement}
                                </ListItem>
                                
                                <ListItem>
                                    {notificationElement}
                                </ListItem>

                                <ListItem>
                                    <button onClick={uid ? openUploadModal : openAuth} className="btn nohover sidedrawer--list--btn">
                                        Upload Sound
                                    </button>
                                </ListItem>
                            </Fragment>)}

                            
                            
                        </List>
                        
                    </Box>
                
                    
                </motion.div>)}
            </AnimatePresence>

            <UploadModal open={uploadModalOpen} />
            
            <Auth open={authModalOpen} />
            
            {sideDrawerOpen && <div onClick={closeSideDrawer} className="close-filters"></div>}
        </Fragment>, document.getElementById('sidedrawer-hook') as HTMLElement) : null

    return finalEl;
}

export default React.memo(SideDrawer);
