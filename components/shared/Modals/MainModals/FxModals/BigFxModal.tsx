import { motion } from 'framer-motion'
import React from 'react'
import { modalAnimations } from '../../../../../util/animationTransitions'

type Props = {}

const BigFxModal = (props: any) => {
  return (
    <motion.div
     initial="initial"
     animate="in"
     exit="out"
     variants={modalAnimations.mainModalVariants}
     transition={modalAnimations.mainModalTransition}
     className="modal fx-modal--contain">
         <div className={`fx-modal ${props.isMobile ? 'fxmodal-overwrite-mobile' : ''}`}>
             {props.children}
         </div>
     </motion.div>
  )
}

export default BigFxModal