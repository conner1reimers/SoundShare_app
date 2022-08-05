import { motion } from 'framer-motion'
import React from 'react'
import { modalAnimations } from '../../../../util/animationTransitions'

type Props = {}

const BigModal = (props: any) => {
  return (
    <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={modalAnimations.mainModalVariants}
    transition={modalAnimations.mainModalTransition}
    className={`modal ${props.upload ? 'modal-upload' : ''}`}>
        <div 
            className={`modal--big fx-modal-mobile-big ${props.big ? 'upload' : ''} ${props.auth ? 'auth-modal' : ''} 
                ${(props.isMobile && props.auth) ? 'fx-modal-mobile-big' : ''} ${(props.isMobile && props.upload) ? 'upload-modal-mobile-big' : ''}`}
                
        >
            {props.children}
        </div>
    </motion.div>
  )
}

export default BigModal