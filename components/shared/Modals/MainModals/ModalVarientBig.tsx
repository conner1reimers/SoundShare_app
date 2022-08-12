import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import Backdrop from '../../../global/Backdrop';
import Backdrop2 from '../Backdrop2';


import loadable from '@loadable/component'
const BigModal = loadable(() => import('./BigModal'))
const BigFxModal = loadable(() => import('./FxModals/BigFxModal'))



const ModalVarientBig = (props: any) => {
  return (
    <>
                            
          {props.tier > 2 ? (
          <>
            {!props.fxOpen &&
                <AnimatePresence exitBeforeEnter>
                          {props.open && <BigModal big={props.big} isMobile={props.isMobile} auth={props.auth} upload={props.upload}>{ props.children }</BigModal>}
                </AnimatePresence>}
            
            {props.fxOpen && 
                <AnimatePresence exitBeforeEnter>
                          {props.open && <BigFxModal isMobile={props.isMobile}>{ props.children }</BigFxModal>}
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