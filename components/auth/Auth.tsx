import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseUpload from '../shared/Modals/Upload/CloseUpload';
import LoginByGoogle from '../googleLogin/LoginByGoogle';
import AuthForm from './AuthComponents/AuthForm';
import UsernameCreate from './AuthComponents/UsernameCreate';
import ForgotPassEmail from './AuthComponents/ForgotPassEmail';
import { AuthState } from '../../store/reducers/authReducer';
import Modal from '../shared/Modals/Modal';

interface AuthProps {
    open: boolean,
}

interface RootState2 {
    auth: AuthState
}

const Auth: React.FC<AuthProps> = ({open}) => {
    const isOnUsername = useSelector((state: RootState2) => state.auth.isOnUsername);
    const isOnPasswordReset = useSelector((state: RootState2) => state.auth.isOnPasswordReset);
    

    return (
        
        <Modal 
            open={open}
            backdropHeadClass="auth-grid--head"
            auth
        >   
            <CloseUpload auth/>
            <div className="auth-modal--leftSide"></div>
        
            {(!isOnUsername && !isOnPasswordReset) ? (
                <Fragment>
                    <AuthForm/>
                    <LoginByGoogle/>
                </Fragment>
            ) : isOnUsername ? (
                <UsernameCreate/>
            ) : <ForgotPassEmail/>}

            
            


        </Modal>
        
   
    )
}

export default React.memo(Auth)
