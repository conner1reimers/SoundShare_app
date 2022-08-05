import React, { Fragment, useState, useEffect } from 'react'
import soundWaves from '../../public/sound-waves.svg';
import soundWaves2 from '../../public/sound-waves2.svg';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';


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
            layout="fill"
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
            layout="fill" 
            src={soundWaves2} 
            alt=""/>
        </motion.div>}
        </AnimatePresence>
      </div>
  )
}

export default React.memo(MainBtn);
