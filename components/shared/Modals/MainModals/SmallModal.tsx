import React, {  Fragment, useEffect } from 'react'
import {motion, AnimatePresence} from 'framer-motion';
import ReactDOM from 'react-dom';
import Backdrop from '../../../global/Backdrop';
import Backdrop2 from '../../Modals/Backdrop2';
import Media from 'react-media';
import { useSelector } from 'react-redux';
import {modalAnimations} from '../../../../util/animationTransitions';

type Props = {
  fxOpen: boolean,
  children: any
}

const SmallModal = (props: Props) => {
  const gpuTier = useSelector((state: any) => state.ui.gpuTier);

  return (
         <motion.div
             initial="initial"
             animate="in"
             exit="out"
             variants={modalAnimations.mainModalVariants}
             transition={modalAnimations.mainModalTransition}
             className={`modal ${props.fxOpen ? 'fx-modal-small' : ''} ${gpuTier && gpuTier.isMobile ? 'modal-mobile' : ''}`}
         >
             {props.children}
             
         </motion.div>
     )
}

export default SmallModal