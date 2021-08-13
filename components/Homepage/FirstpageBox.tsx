import React, { Fragment, useState, useEffect, useContext, useRef } from 'react'
import { useForm } from '../../util/hooks/useForm';
import { Box, Typography } from '@material-ui/core';
import listening2 from '../../public/listening-new.svg';
import listening4 from '../../public/listening-new3.svg';
import soundWaves from '../../public/sound-waves.svg';
import soundWaves2 from '../../public/sound-waves2.svg';
import { VALIDATOR_REQUIRE } from '../../util/validators';
import Media from 'react-media';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setModalOpen, resetGlobalSound } from '../../store/actions';
import { useChangePage } from '../../util/hooks/changePage';
import { useHttpClient } from '../../util/hooks/http-hook';
import BrowseBox from './BrowseBox';
import { RootState } from '../../store/reducers';
import Input from '../common_reusable/Input';
import Image from 'next/image';
import FirstLottie from '../animatedLoaders/FirstLottie';
import BrowseOptionModal from '../shared/SideDrawer/BrowseOptions/BrowseOptionModal';
import { useRouter } from 'next/router';

const optionsVariants = {
  initial: {
      y: '-40%',
      opacity: 0.8
  },
  out: {
      y: '-50%',
      opacity: 0
  },
  in: {
      y: '0%',
      opacity: 1
  }
}

const optionsTransition = {
  type: 'spring',
  mass: .5,
  damping: 101,
  stiffness: 276,
  velocity: 12
}

const FirstpageBox: React.FC = () => {
    const [formState, inputHandler] = useForm({
      name: {
        value: null,
        isValid: false
      }},false);

    const {isLoading, sendRequest} = useHttpClient();
    const [scrolledFar, setScrolledFar] = useState(false);
    const aModalIsOpen = useSelector((state: RootState) => state.globalMsg.aModalIsOpen);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const userId = useSelector((state: RootState) => state.user.userId);

    const uploadModalOpen = useSelector((state: RootState) => state.upload.modalOpen);
    const authModalOpen = useSelector((state: RootState) => state.sideDrawer.authModalOpen);
    const [searchOpen, setSearchOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
      let mounted = false;

      const handleScroll = () => {
        if (window.scrollY > 205 && !scrolledFar) {
            if (!mounted) setScrolledFar(true);
          } else if (window.scrollY < 200 && scrolledFar) {
            if (!mounted) setScrolledFar(false);
          }
            
      }
      
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        mounted = true;
        window.removeEventListener("scroll", handleScroll);
      };

    }, [scrolledFar]);

    useEffect(() => {
      document.title = "Soundshare";
    }, []);


    const searchSounds = ((e: any) => {
      e.preventDefault();
  
      setSearchOpen(true);
    });


    const openUploadSound = () => {
      if (isLoggedIn) {
        dispatch({type: 'OPEN_UPLOAD_MODAL'});
        dispatch(setModalOpen());
        dispatch(resetGlobalSound())
      } else {
        dispatch({type: "OPEN_AUTH_MODAL"});
        dispatch(setModalOpen());
        dispatch(resetGlobalSound());
      }
      
      
    }

    const history = useRouter();
    const {goToUserPage} = useChangePage();

  
    
    const clickSpan = ((e: any) => {
      e.stopPropagation();
      e.preventDefault();
    })

    const goToProfile = ((e: any) => {
      if (isLoggedIn) {
        goToUserPage(e, userId)
      } else {
        dispatch({type: "OPEN_AUTH_MODAL"});
        dispatch(setModalOpen());
        dispatch(resetGlobalSound());
      }
    })

    const openBrowse = ((e: any) => {
      e.preventDefault();

      history.push('/browse')
  })
  
  const BigHomepage= () => (<Fragment>
    <div className="firstpage-big">
      <div className="firstpage-big--2">
          <div className="firstpage-big--box--img">
            <button onClick={openUploadSound} className="btn nohover firstpage-big--box--btn">
              <span>Upload a sound</span>
              <MainBtn/>
            </button>
          </div>
      </div>
    </div>

  </Fragment>)
  
  const SmallHomepage = () => (<Box className="firstpage--grid" display="grid" > 
  <BrowseBox/>

  <Box onClick={openUploadSound} className="firstpage--box firstpage--box2">    
     
      <Typography onClick={clickSpan} color="primary" component="h1" variant="h3">Upload/Add effects to a sound..</Typography>

      {/* <div onClick={clickSpan} className="firstpage--box firstpage--box2--testbox">
        <Image src={listening} alr=""/>
      </div> */}

      <button onClick={clickSpan} className="btn nohover firstpage--box2--btn" type="button">
        <div className="firstpage-img-container-grid">
          <Image
            height={110}
            width={110}
            src={listening2} alt="" />
        </div>
      </button>
      

  </Box>

  <Box onClick={goToProfile} className="firstpage--box firstpage--box3">
      <Typography color="primary" component="h1" variant="h3">Your Profile...</Typography>   

      {/* <div className="firstpage--box firstpage--box3--testbox">
        <Image src={fav} alr=""/>
      </div> */}

      <button className="btn nohover firstpage--box3--btn" type="button">
        <div>

          <Image
            height={60}
            width={60}
            src={listening4}
            alt="" />
        </div>
      </button>

  </Box>

    </Box>)

    return (
    <Fragment>
      
      <Box component="div" className="firstpage" display="flex">

            <div className="home-image">
              <div className="home-image--img"></div>
              <div className="fade"></div>
            </div>

            <Box component="div" display="flex" flexDirection="column" className="firstpage--input">
              
              <Box component="div" display="flex" flexDirection="row" className="firstpage--input--box">
                  <Typography color="primary" component="h1" variant="h1">SoundShare</Typography>

                  <AnimatePresence exitBeforeEnter>
                    {(!scrolledFar && !aModalIsOpen) && (
                      
                      <motion.div
                      initial="initial"
                      animate="in"
                      exit="out"
                      variants={optionsVariants}
                      transition={optionsTransition}
                      className="mainpage-lottie"
                      >
                        <FirstLottie/>
                      </motion.div>)}
                    </AnimatePresence>
              </Box>
                <div className="main-text">
                    <p>Share sounds, sound effects, loops, stock audio and more with other creators, all for free and free of copyright! Download new sounds for your music, movies, games and more. Add 
                      effects to any sound quick and easy through soundshare!</p>
                </div>
              <Media query="(max-width: 1099px)">
                <Fragment>
                  <form onSubmit={searchSounds}>
                    <Input 
                      class="searchsound-input" 
                      onInput={inputHandler} 
                      element="input" 
                      id="name" 
                      validators={VALIDATOR_REQUIRE()}
                      label="Search sounds..."
                      labelClass="top-nav-big--input--label homepage-search-label"
                      />
                  </form>
                  <BrowseOptionModal search mobile setOpen={setSearchOpen} searchTxt={formState.inputs.name} open={searchOpen}/> 
                  
                </Fragment>
              </Media>
            </Box>

            <Media queries={{
              small: "(max-width: 1099px)",
              big: "(min-width: 1100px)"
          }}>{matches => (
            <Fragment>

                {matches && (
                  <Fragment>
                    {matches.small ? <SmallHomepage/> : matches.big ? <BigHomepage/> : null}
                  
                  
                    </Fragment>)}
                </Fragment>
              )}
              
            </Media>
      </Box>

    </Fragment>
    )
  };
export default React.memo(FirstpageBox);


const MainBtn: React.FC = () => {
  const [moused, setMoused] = useState<boolean>(false);

  const hoverListen = () => {
    setMoused(true);
  }
  const hoverLeave = () => {
    setMoused(false);
  }

  return (
      <div onMouseOver={hoverListen} onMouseLeave={hoverLeave}>
        <AnimatePresence>
          {moused && <motion.div 
            initial="initial"
            animate="in"
            exit="out"
            variants={optionsVariants}
            transition={optionsTransition}
            className="uploadbtn-image-contain"
        >
          <Image
            height={10}
            width={10}
            src={soundWaves} 
            alt=""
          />
        </motion.div>}
          {!moused && <motion.div 
            initial="initial"
            animate="in"
            exit="out"
            variants={optionsVariants}
            className="uploadbtn-image-contain"
            transition={optionsTransition}>
            <Image 
            src={soundWaves2} 
            alt=""
            height={10}
            width={10}/>
        </motion.div>}
        </AnimatePresence>
      </div>
  )
}