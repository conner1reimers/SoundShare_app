import React, {  Fragment, useEffect } from 'react'
import {motion, AnimatePresence} from 'framer-motion';
import ReactDOM from 'react-dom';
import Backdrop from '../../global/Backdrop';
import Backdrop2 from '../Modals/Backdrop2';
import Media from 'react-media';
import { useDispatch, useSelector } from 'react-redux';
import { setModalClosed } from '../../../store/actions';

import loadable from '@loadable/component'
const ModalVarientSmall = loadable(() => import('./MainModals/ModalVarientSmall'))
const ModalVarientBig = loadable(() => import('./MainModals/ModalVarientBig'))


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

    const finalEl = typeof window != 'undefined' ? ReactDOM.createPortal(
        <Fragment>
            <Media queries={{
              small: "(max-width: 1099px)",
              big: "(min-width: 1100px)"
              }}>
                {matches => (
                <Fragment>

                    {matches.small && gpuTier && (
                        <ModalVarientSmall open={open} backdropHeader={backdropHeader} backdropHeadClass={backdropHeadClass} cancelHandler={cancelHandler} fxOpen={fxOpen}>{children}</ModalVarientSmall>
                    )}

                    {matches.big && gpuTier && (
                            <ModalVarientBig big={big} upload={upload} auth={auth}
                                tier={gpuTier.tier} isMobile={gpuTier.isMobile} open={open}
                                nohead={nohead} backdropVisibility={backdropVisibility}
                                backdropHeader={backdropHeader} backdropHeadClass={backdropHeadClass}
                                cancelHandler={cancelHandler} fxOpen={fxOpen}>
                                
                                {children}

                            </ModalVarientBig>
                    )}
                    
                    <Fragment/>

                    </Fragment>)
                    }
            </Media>
                  
            

        </Fragment>, document.getElementById('modal-hook') as HTMLElement) : null




    return finalEl;
}

export default Modal
