import Image from 'next/image';
import React, { Fragment, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import close from '../../../public/close.svg';
import BackdropMain from './BackdropMain';


interface Props {
    social?: any,
    closeModal?: any,
    open?: any,
    alldownloads?: any,
    children?: any
    
}
const EditImgModal: React.FC<Props> = ({ social, closeModal, open, alldownloads, children }) => {
    const ref = useRef<any>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (open) dispatch({ type: "SET_MODAL_REF", payload: ref })
        else dispatch({ type: "SET_MODAL_REF", payload: null })
        
    }, [open, dispatch]);

    
    const final = typeof window != 'undefined' ? ReactDOM.createPortal(
        <Fragment>
            {open && (
            <div ref={ref} className={`followers-modal edit-img-modal ${social ? 'edit-social-modal' : ''} ${alldownloads ? 'all-downloads-modal' : ''}`}>

                {!alldownloads && <div className="followers-modal--close">
                    <div>
                        <Image onClick={closeModal} className="xtraoptions-close close-ignore" src={close} alt=""/>
                    </div>
                </div>}

                <div className="change-img-modal--contain edit-img-modal--children">
                    {children}
                </div>

               
            </div>)}
            {open && <BackdropMain onClick={closeModal}/>}
        </Fragment>, document.getElementById('modal-hook') as HTMLElement) : null

    return final;
}

export default React.memo(EditImgModal);
