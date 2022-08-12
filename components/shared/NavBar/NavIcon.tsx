import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecentSounds } from "../../../store/actions";
import Input from "../../common_reusable/Input";
import { useForm } from "../../../util/hooks/useForm";
import { VALIDATOR_REQUIRE } from "../../../util/validators";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import loadable from '@loadable/component'

const FirstLottie = loadable(() => import('../../animatedLoaders/FirstLottie'))
const BrowseOptionModal = loadable(() => import('../Modals/BrowseOptions/BrowseOptionModal'))



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


const NavIcon: React.FC = React.memo(() => {
  const [searchOpen, setSearchOpen] = useState<any>(false);
  const [scrolledFar, setScrolledFar] = useState<any>(false);
  const aModalIsOpen = useSelector((state: any) => state.globalMsg.aModalIsOpen);
  const isOnHome = useSelector((state: any) => state.globalMsg.isOnHome);

  const dispatch = useDispatch();
  const location = useRouter();

  // const [isOnHome, setIsOnHome] = useState<boolean>(false);
  
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
    dispatch({ type: "HOME_LOADER_START" });
    dispatch(fetchRecentSounds());
    event.preventDefault();
    event.stopPropagation();
    location.push("/home", undefined, { shallow: true });
  };




  const searchSounds = (e: any) => {
    e.preventDefault();
    setSearchOpen(true);
    
  };


  

  useEffect(() => {
    const regex = /home/.test(location.pathname);
    if (regex) {
      dispatch({type: "SET_IS_ON_HOME"})
    } else if (!regex) {
      dispatch({type: "SET_NOT_ON_HOME"})

    }
  }, [location.pathname]);



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
    };
  });


  return (
    <>
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
    </>
  );
});


export default NavIcon;