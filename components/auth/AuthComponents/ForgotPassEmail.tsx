import React, { useEffect } from 'react'
import { DefaultRootState, useDispatch, useSelector } from 'react-redux';
import { AuthState } from '../../../store/reducers/authReducer';
import { useHttpClient } from '../../../util/hooks/http-hook';
import { useForm } from '../../../util/hooks/useForm';
import { useGlobalMsg } from '../../../util/hooks/useGlobalMsg';
import { VALIDATOR_EMAIL } from '../../../util/validators';
import Input from '../../common_reusable/Input';

interface RootState2 {
    auth: AuthState
}

const ForgotPassEmail: React.FC = () => {
    const loginInfo = useSelector((state: RootState2) => state.auth.loginInfo);
    const {isLoading, sendRequest} = useHttpClient();
    const dispatch = useDispatch();
    const setGlobalMsg = useGlobalMsg();

    const [formState, inputHandler] = useForm({
        email: {
            value: '',
            isValid: false
        },
    }, false);


    useEffect(() => {
        return () => {
            dispatch({type: "RESET_AUTH"})
        }
    }, []);

    const submitAuth = async (e: any) => {
        e.preventDefault();
        let response;

        try {
            response = await sendRequest(`${process.env.REACT_APP_MY_ENV}/users/reset-password`, 
                'POST', 
                JSON.stringify({
                    email: formState.inputs.email.value
                }),
                {'Content-Type': 'application/json'});
            
            if (response.msg === 'success') {
                setGlobalMsg('Password recovery sent to your email!', 'success');
            } 
        } catch (err) {}
    }


    return (
        <div className="username-create-contain">
            <div className="auth-grid--head">
                    <h1 className="headings">Enter your email.</h1>
                    <p>Once you enter your email, we will send you an email to reset your password.</p>
            </div>
            <form onSubmit={submitAuth} className="username-create-contain--form">
                <Input
                    class="auth-grid--inputSection--input"
                    onInput={inputHandler}
                    label="Enter your email"
                    validators={VALIDATOR_EMAIL()}
                    element="input"
                    auth
                    errorText="Please enter a valid email address"
                    id="email"
                    labelClass="auth-grid--inputSection--input--label"
                    labelUpClass="auth-grid--inputSection--input--label--up"                                
                    formControlClass="uploadmodal-big--info-form--input--formcontrol auth-grid--inputSection--input--formcontrol uploadmodal-big--info-form--input--formcontrol--name"
                    focusCap

                />

                            <div className="outline-btn">
                                <button onClick={submitAuth} type="submit" className="btn nohover">Submit</button>
                            </div>
            </form>
        </div>
    )
}

export default ForgotPassEmail
