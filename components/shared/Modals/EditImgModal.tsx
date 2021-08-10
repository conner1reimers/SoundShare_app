import Image from 'next/image';
import React, { Fragment, useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import close from '../../util/img/close.svg';
import BackdropMain from './BackdropMain';


interface Props {
    social?: any,
    closeModal?: any,
    open?: any,
    alldownloads?: any,
    children?: any
    
}
const EditImgModal: React.FC<Props> = ({social, closeModal, open, alldownloads, children}) => {
    

    return ReactDOM.createPortal(
        <Fragment>
            {open && (
            <div className={`followers-modal edit-img-modal ${social ? 'edit-social-modal' : ''} ${alldownloads ? 'all-downloads-modal' : ''}`}>

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
        </Fragment>, document.getElementById('modal-hook') as HTMLElement
    )
}

export default React.memo(EditImgModal);
