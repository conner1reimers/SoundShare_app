import React, { useState, Fragment, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { UiState } from '../store/reducers/ui/uiStateReducer';
import { aniVariants } from '../interfaces/animationInterface';
import { transition } from '../interfaces/animationInterface';

const optionsVariants = {
  initial: {
    x: "0%",
    y: "6%",
    opacity: 0.6,
  },
  out: {
    x: "0%",
    y: "16%",
    opacity: 0,
  },
  in: {
    x: "0%",
    y: "0%",
    opacity: 1,
  },
};
const optionsTransition = {
  type: "spring",
  mass: 1,
  damping: 21,
  stiffness: 225,
  velocity: 1,
};


interface MouseOverProps {
  circle?: boolean,
  seemore?: boolean,
  noSpan?: boolean,
  singlesound?: boolean,
  label: any,
  labelClass: string,
  classname: string,
  variants?: any,
  transition?: transition,
  children: React.ReactNode
};

interface RootStateConst {
  ui: UiState
};



const MouseOverLabel: React.FC<MouseOverProps> = ({circle, singlesound, label, labelClass, children, classname, seemore, noSpan, variants, transition}) => {
  const [isVis, setIsVis] = useState<boolean>(false);
  const [isVisHold, setIsVisHold] = useState<boolean>(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();
  const gpuTier = useSelector((state: RootStateConst) => state.ui.gpuTier);

  const complica = async () => {
    setTimeout(() => {
      setIsVis(false);
      setIsVisHold(false);
    }, 170);
  };


  const mouseOverHandler = () => {
    if (!isVis) {
      setIsVis(true);
    }
  };

  const mouseLeaveHandler = () => {
    complica();
  };

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }
      
  };

  const holdCheck = useCallback(() => {
    if (isVis) {
      setIsVisHold(true);
    }
  }, [isVis])

  useEffect(() => {

    if (circle && isVis) {
      setTimer(setTimeout(() => {
        holdCheck()
      }, 500));
    } else if (circle && !isVis) {
      setIsVisHold(false)
      clearTimer();
    }

    if (!isVisHold && !isVis && timer) {
      clearTimer();
    }

    return () => {
      if (circle && isVisHold) {
        clearTimer();
        setIsVisHold(false);
      } if (timer) {
        clearTimer();
      }
    }
    
  }, [isVis]);

  useEffect(() => {
    if (!isVis && isVisHold) {
      setIsVisHold(false)
    }
  }, [isVisHold, isVis]);


  return (
    <Fragment>
      {gpuTier && (
        <Fragment>
          
        {!gpuTier.isMobile ? (
          <div
            onMouseOverCapture={mouseOverHandler}
            onMouseLeave={mouseLeaveHandler}
          >
          
          <AnimatePresence exitBeforeEnter>
            {isVis && !circle && (
              <motion.div
                className={`mouseOver ${classname} ${
                  singlesound ? "circle-btn-mouseover--singlesound" : ""
                } ${
                  seemore
                    ? "circle-btn-mouseover--singlesound--seemore"
                    : ""
                }`}
                initial="initial"
                animate="in"
                exit="out"
                variants={variants ? variants : optionsVariants}
                transition={
                  transition ? transition : optionsTransition
                }
              >
                {!noSpan && (
                  <span className={`mouseOver--label ${labelClass}`}>
                    {label}
                  </span>
                )}
                {noSpan && label}
              </motion.div>
            )}
            {isVisHold && circle && (
              <motion.div
                className={`mouseOver ${classname} ${
                  singlesound ? "circle-btn-mouseover--singlesound" : ""
                } ${
                  seemore
                    ? "circle-btn-mouseover--singlesound--seemore"
                    : ""
                }`}
                initial="initial"
                animate="in"
                exit="out"
                variants={variants ? variants : optionsVariants}
                transition={
                  transition ? transition : optionsTransition
                }
              >
                {!noSpan && (
                  <span className={`mouseOver--label ${labelClass}`}>
                    {label}
                  </span>
                )}
                {noSpan && label}
              </motion.div>
            )}
          </AnimatePresence>

          {children}
        </div>
          ) 
          : children}
        </Fragment>
      )}
    
    </Fragment>
  );
};

export default React.memo(MouseOverLabel);
