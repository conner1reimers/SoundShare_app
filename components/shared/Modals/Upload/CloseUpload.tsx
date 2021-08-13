import Image from 'next/image';
import React from 'react'
import { useDispatch } from 'react-redux'
import { setModalClosed } from '../../../../store/actions';
import close from '../../../../public/close.svg';

interface Props {
    auth?: any,
    upload?: any,
    
}
const CloseUpload: React.FC<Props> = ({auth, upload}) => {
    const dispatch = useDispatch();

    const closeModal = () => {
        if (auth) {
            dispatch({type: "CLOSE_AUTH_MODAL"});
            dispatch({type: "RESET_AUTH"});
            
        } else if (upload) {
            dispatch({type: "CLOSE_UPLOAD_MODAL"})
        }   
        dispatch(setModalClosed());
    }


    return (
        <div className={`auth-modal-close-contain ${auth ? 'auth-modal-close-contain--auth' : ''}`}>
            <div className="close-modal-container-next">
                <Image height={20} width={20} onClick={closeModal} src={close} alt=""/>
            </div>
            
        </div>
    )
}

export default CloseUpload;