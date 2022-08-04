import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import {modalAnimations} from '../../../../util/animationTransitions';
import Backdrop from '../../../Backdrop';
import Backdrop2 from '../Backdrop2';



const ModalVarientBig = (props: any) => {
  return (
    <>
                            
          {props.tier > 2 ? (
          <>
              {!props.fxOpen && <AnimatePresence exitBeforeEnter>
                  {props.open &&
                  (<motion.div
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
                  </motion.div>)}</AnimatePresence>}
              {props.fxOpen && 
              <AnimatePresence exitBeforeEnter>
                  {props.open && (
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
                      </motion.div>)}
                  </AnimatePresence>}
              
          
          </>)
          : (<>
              {!props.fxOpen && props.open &&
                  (<div className={`modal ${props.upload ? 'modal-upload' : ''}`}>
                      <div className={`modal--big fx-modal-mobile-big ${props.big ? 'upload' : ''} ${props.auth ? 'auth-modal' : ''} 
                          ${(props.isMobile && props.auth) ? 'fx-modal-mobile-big' : ''} ${(props.isMobile && props.upload) ? 'upload-modal-mobile-big' : ''}`}>
                          {props.children}
                      </div>
                  </div>)}

                  {props.fxOpen && props.open && (
                  <div className="modal">
                          <div className={`fx-modal ${props.isMobile ? 'fxmodal-overwrite-mobile' : ''}`}>
                              {props.children}
                          </div>
                  </div>)}
                  
              
              </>)}
          
          
          
          
          
          
          <Backdrop2 
              open={props.open} 
              onClick={props.cancelHandler}
              header={props.backdropHeader}
              headClass={props.backdropHeadClass}
              visible={props.backdropVisibility}
              nohead={props.nohead}
              tier={props.tier}
          />

          {props.open && <Backdrop onClick={props.cancelHandler}/>}
          
      </>
  )
}

export default ModalVarientBig