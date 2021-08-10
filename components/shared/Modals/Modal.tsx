import React, {  Fragment, useEffect } from 'react'
import {motion, AnimatePresence} from 'framer-motion';
import ReactDOM from 'react-dom';
import Backdrop from '../../Backdrop';
import Backdrop2 from '../Modals/Backdrop2';
import Media from 'react-media';
import { useDispatch, useSelector } from 'react-redux';
import { setModalClosed } from '../../../store/actions';


const optionsVariants = {
    initial: {
        y: '150%',
        opacity: 0.9
    },
    out: {
        y: '200%',
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
    damping: 27,
    stiffness: 220,
    velocity: 1
    
}

interface Props {
    auth?: any,
    upload?: any,
    open?: any,
    children?: any,
    backdropHeader?: any,
    backdropHeadClass?: any,
    ad?: any,
    big?: any,
    backdropVisibility?: any,
    nohead?: any
}

const Modal: React.FC<Props> = ({auth, upload, open, children, backdropHeader, backdropHeadClass, ad, big, backdropVisibility, nohead}) => {
    const dispatch = useDispatch();
    const gpuTier = useSelector((state: any) => state.ui.gpuTier);
    const fxOpen = useSelector((state: any) => state.upload.fxState.fxpageOpen);

    const cancelHandler = () => {
        if (upload) {
            if (ad) {
                dispatch({type: "CLOSE_AD"});
            } else {
                dispatch({type: "CLOSE_UPLOAD_MODAL"});
            }
            
            if (fxOpen) {
                dispatch({type: "CLOSE_FX"});
            }
        } else if (auth) {
            dispatch({type: "CLOSE_AUTH_MODAL"})
        }
        
        dispatch(setModalClosed());
        dispatch({type: "RESET_UPLOAD_LIST"});
        
    };


    return ReactDOM.createPortal(
        <Fragment>
            <Media queries={{
              small: "(max-width: 1099px)",
              big: "(min-width: 1100px)"
              }}>
                {matches => (
                <Fragment>

                    {matches.small && gpuTier && (
                        <Fragment>
                            <AnimatePresence exitBeforeEnter>
                                    {open &&(
                                    <Fragment>
                                        
                                    
                                    {gpuTier.isMobile ? (
                                    
                                        <motion.div
                                            initial="initial"
                                            animate="in"
                                            exit="out"
                                            variants={optionsVariants}
                                            transition={optionsTransition}
                                            className={`modal ${fxOpen ? 'fx-modal-small' : ''} modal-mobile`}
                                        >
                                            {children}
                                            
                                        </motion.div>
                                    )
                                :    (
                                    <motion.div
                                        initial="initial"
                                        animate="in"
                                        exit="out"
                                        variants={optionsVariants}
                                        transition={optionsTransition}
                                        className={`modal ${fxOpen ? 'fx-modal-small' : ''}`}
                                    >
                                        {children}
                                        
                                    </motion.div>)
                                }
                                    
                                    </Fragment>)}
                            </AnimatePresence>

                            {open && <Backdrop onClick={cancelHandler}/>}

                            <Backdrop2 
                                open={open} 
                                onClick={cancelHandler}
                                header={backdropHeader}
                                headClass={backdropHeadClass}
                                tier={gpuTier.tier}
                            />

                        </Fragment>
                    )}

                    {matches.big && gpuTier && (
                        <Fragment>
                            
                            {gpuTier.tier > 2 ? (
                            <Fragment>
                                {!fxOpen && <AnimatePresence exitBeforeEnter>
                                    {open &&
                                    (<motion.div
                                    initial="initial"
                                    animate="in"
                                    exit="out"
                                    variants={optionsVariants}
                                    transition={optionsTransition}
                                    className={`modal ${upload ? 'modal-upload' : ''}`}>
                                        <div 
                                            className={`modal--big fx-modal-mobile-big ${big ? 'upload' : ''} ${auth ? 'auth-modal' : ''} 
                                                ${(gpuTier.isMobile && auth) ? 'fx-modal-mobile-big' : ''} ${(gpuTier.isMobile && upload) ? 'upload-modal-mobile-big' : ''}`}
                                                
                                        >
                                            {children}
                                        </div>
                                    </motion.div>)}</AnimatePresence>}
                                {fxOpen && 
                                <AnimatePresence exitBeforeEnter>
                                    {open && (
                                    <motion.div
                                        initial="initial"
                                        animate="in"
                                        exit="out"
                                        variants={optionsVariants}
                                        transition={optionsTransition}
                                        className="modal fx-modal--contain">
                                            <div className={`fx-modal ${gpuTier.isMobile ? 'fxmodal-overwrite-mobile' : ''}`}>
                                                {children}
                                            </div>
                                        </motion.div>)}
                                    </AnimatePresence>}
                                
                            
                            </Fragment>)
                            : (<Fragment>
                                {!fxOpen && open &&
                                    (<div className={`modal ${upload ? 'modal-upload' : ''}`}>
                                        <div className={`modal--big fx-modal-mobile-big ${big ? 'upload' : ''} ${auth ? 'auth-modal' : ''} 
                                            ${(gpuTier.isMobile && auth) ? 'fx-modal-mobile-big' : ''} ${(gpuTier.isMobile && upload) ? 'upload-modal-mobile-big' : ''}`}>
                                            {children}
                                        </div>
                                    </div>)}

                                    {fxOpen && open && (
                                    <div className="modal">
                                            <div className={`fx-modal ${gpuTier.isMobile ? 'fxmodal-overwrite-mobile' : ''}`}>
                                                {children}
                                            </div>
                                    </div>)}
                                    
                                
                                </Fragment>)}
                            
                            
                            
                            
                            
                            
                            <Backdrop2 
                                open={open} 
                                onClick={cancelHandler}
                                header={backdropHeader}
                                headClass={backdropHeadClass}
                                visible={backdropVisibility}
                                nohead={nohead}
                                tier={gpuTier.tier}
                            />

                            {open && <Backdrop onClick={cancelHandler}/>}
                            
                        </Fragment>)}
                    
                    <Fragment/>

                    </Fragment>)
                    }
            </Media>
                  
            

        </Fragment>, document.getElementById('modal-hook') as HTMLElement)
}

export default Modal
