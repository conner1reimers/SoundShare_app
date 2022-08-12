import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseUpload from '../shared/Modals/Upload/CloseUpload';
import { AuthState } from '../../store/reducers/global/authReducer';

import loadable from '@loadable/component'

const Modal = loadable(() => import('../shared/Modals/Modal'))
const LoginByGoogle = loadable(() => import('../googleLogin/LoginByGoogle'))
const AuthForm = loadable(() => import('./AuthComponents/AuthForm'))
const ForgotPassEmail = loadable(() => import('./AuthComponents/ForgotPassEmail'))
const UsernameCreate = loadable(() => import('./AuthComponents/UsernameCreate'))



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
