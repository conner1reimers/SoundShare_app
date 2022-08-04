import React from 'react'
import Lottie from 'react-lottie';
import animationData from './animationDatas/blue-red-loader.json';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {}

const pageVariants = {
  initial: {
      y: "-15%",
      scale: 0.5,
      rotate: 3,
      opacity: 1
  },
  out: {
      y: 0,
      scale: 0,
      rotate: 3,
      opacity: 0
  },
  in: {
      y: 0,
      scale: 1,
      rotate: 360,
      opacity: 1
  }
}

const pageTransition = {
  type: 'spring',
  mass: 1.5,
  damping: 100,
  stiffness: 200
  
}

const LottieTest = (props: Props) => {
  let _lottieHeartRef;
    
  const onRefLottie = (ref: any) => { _lottieHeartRef = ref; }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <motion.div
       initial="initial"
       animate="in"
       style={{ overflow: "hidden" }}
       exit="out"
       variants={pageVariants}
       transition={pageTransition}
       className="loading"
   >
       <Lottie
           ref={onRefLottie}
           options={defaultOptions}
           height={450}
           width={450}
           style={{ overflow: 'visible' }}
           isClickToPauseDisabled={true}
           speed={0.34}
       />
   </motion.div>
  )
}

export default LottieTest