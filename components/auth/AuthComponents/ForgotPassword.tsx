import React from 'react';
import { useDispatch } from 'react-redux';



const ForgotPassword: React.FC = () => {
    const dispatch = useDispatch();

    const forgotPass = () => {
        dispatch({type: 'FORGOT_PASS_PAGE'})
    }

    return (
        <div className="auth-grid--inputSection--btns--lastContain forgot-pass auth-move-up">
            <button type="button" onClick={forgotPass} className="btn nohover auth-grid--inputSection--btns--last">
                <span>Forgot password?</span>
            </button>
        </div>
    )
}

export default ForgotPassword;