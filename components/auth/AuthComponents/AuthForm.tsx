import React, { useState } from 'react'
import { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import ForgotPassword from './ForgotPassword';
import { useEffect } from 'react';
import { setModalClosed } from '../../../store/actions';
import { useHttpClient } from '../../../util/hooks/http-hook';
import { useForm } from '../../../util/hooks/useForm';
import { useGlobalMsg } from '../../../util/hooks/useGlobalMsg';
import { VALIDATOR_LOGIN, VALIDATOR_MAXLENGTH, VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../../../util/validators';
import BallLoader from '../../animatedLoaders/BallLoader/BallLoader';
import useLogin from '../../../util/hooks/useLogin';
import Input from '../../common_reusable/Input';
import { isIOS } from 'react-device-detect';

const AuthForm: React.FC = () => {
    const setGlobalMsg = useGlobalMsg();
    const dispatch = useDispatch();
    const login = useLogin();
    const {isLoading, sendRequest} = useHttpClient();
    const [isOnLogin, setIsOnLogin] = useState(false);
    const [checkboxValue, setCheckboxValue] = useState(false);

    const switchSignin = (event: any) => {
        event.preventDefault();
        setIsOnLogin((prevState) => !prevState);
    }

    const [formState, inputHandler] = useForm({
        email: {
            value: '',
            isValid: false
        },
        username: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        },
        password2: {
            value: '',
            isValid: false
        },
    }, false);




    const submitAuth = async (event: any) => {
        event.preventDefault();
        
        let response;
        
        if (formState.inputs.password.isValid && (formState.inputs.email.isValid || formState.inputs.username.isValid)) {
            if (isOnLogin) {
                try {
                    response = await sendRequest(`/users/login/`, 'POST', 
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
        
                    }),
                    {'Content-Type': 'application/json'})
                    login(response.res.id, response.token, response.res.username, response.res.following);
                    dispatch({type: "CLOSE_AUTH_MODAL"});
                    dispatch(setModalClosed());
                } catch (err) {
                }
    
            } else if ((formState.inputs.email.isValid && formState.inputs.username.isValid)) {

                if (checkboxValue) {
                    try {
                        response = await sendRequest(`/users/signup/`, 'POST', 
                        JSON.stringify({
                            email: formState.inputs.email.value,
                            username: formState.inputs.username.value,
                            password: formState.inputs.password.value,
                            password2: formState.inputs.password2.value,
            
                        }),{'Content-Type': 'application/json'})
                       
                        login(response.user.rows[0].id, response.token, response.user.rows[0].username, response.user.rows[0].following);
                        dispatch({type: "CLOSE_AUTH_MODAL"});
                        dispatch(setModalClosed());
        
                    } catch (err) {
                    }
                } else {
                    setGlobalMsg('To signup you must agree to our terms of use', 'error');
                }
                
            } else {
                setGlobalMsg('Please check your inputs', 'error');
            }
        } else {
            setGlobalMsg('Please check your inputs', 'error');
        }
        
    }

    return (
        <Fragment>
            {isOnLogin ? (
            <div className={`auth-grid ${isIOS ? 'auth-grid-ios' : ''}`}>

                    <div className="auth-grid--head auth-grid--head--login">
                        <h1 className="headings">Login.</h1>
                        <p>Welcome back! Login to your SoundShare account to start uploading or sharing sounds for you and other music producers to use in your own music!</p>

                    </div>

                    <div className="auth-grid--inputSection auth-inputSection-login">
                        <form className="auth-grid--form" onSubmit={submitAuth}>
                            <Input
                                class="auth-grid--inputSection--input"
                                onInput={inputHandler}
                                label="email/Username"
                                validators={VALIDATOR_LOGIN(25)}
                                element="input"
                                auth
                                errorText="Enter a valid email address / username"
                                id="email"
                                labelClass="auth-grid--inputSection--input--label"
                                labelUpClass="auth-grid--inputSection--input--label--up"                                
                                formControlClass="uploadmodal-big--info-form--input--formcontrol auth-grid--inputSection--input--formcontrol uploadmodal-big--info-form--input--formcontrol--name"
                                focusCap

                            />
                            <Input
                                class="auth-grid--inputSection--input"
                                onInput={inputHandler}
                                label="password"
                                validators={VALIDATOR_MAXLENGTH(255)}
                                element="input"
                                id="password"
                                type="password"
                                labelClass="auth-grid--inputSection--input--label"
                                labelUpClass="auth-grid--inputSection--input--label--up"
                                formControlClass="uploadmodal-big--info-form--input--formcontrol auth-grid--inputSection--input--formcontrol uploadmodal-big--info-form--input--formcontrol--name"
                                focusCap
                                errorText="Enter a valid password"

                            />
                            <div className="auth-grid--inputSection--btns login-btns auth-move-up-other">
                                <div className="outline-btn">
                                    <button type="submit" className="btn nohover">Submit</button>
                                </div>
                                
                                <div className="auth-grid--inputSection--btns--lastContain auth-move-up">
                                    <button type="button" onClick={switchSignin} className="btn nohover auth-grid--inputSection--btns--last">
                                        <span>New to SoundShare?</span>
                                        <span className="auth-underline-text">Create an account.</span>
                                    </button>
                                </div>
                                
                                <ForgotPassword/>

                                <div className="auth-loader">
                                    <BallLoader loading={isLoading}/>
                                </div>
                            </div>


                        </form>

                    </div>
                    

                    </div>

            ) : (       
            <div className={`auth-grid ${isIOS ? 'auth-grid-ios' : ''}`}>
                <div className="auth-grid--head">
                    <h1 className="headings">Create an account.</h1>
                    <p>Create an account to start uploading or sharing sounds for you and other music producers to use in your own music!</p>
                </div>
                <div className="auth-grid--inputSection">
                    <form className="auth-grid--form" onSubmit={submitAuth}>
                        <Input
                            class="auth-grid--inputSection--input"
                            onInput={inputHandler}
                            label="email"
                            validators={VALIDATOR_EMAIL()}
                            element="input"
                            id="email"
                            errorText="Enter a valid email address"
                            auth
                            labelClass="auth-grid--inputSection--input--label"
                            labelUpClass="auth-grid--inputSection--input--label--up"
                            formControlClass="uploadmodal-big--info-form--input--formcontrol auth-grid--inputSection--input--formcontrol uploadmodal-big--info-form--input--formcontrol--name"
                            focusCap
                        />
                        <Input
                            class="auth-grid--inputSection--input"
                            onInput={inputHandler}
                            label="username"
                            validators={VALIDATOR_MAXLENGTH(25)}
                            element="input"
                            id="username"
                            max={25}
                            auth
                            errorText="Must be 25 characters or less"
                            labelClass="auth-grid--inputSection--input--label"
                            labelUpClass="auth-grid--inputSection--input--label--up"
                            formControlClass="uploadmodal-big--info-form--input--formcontrol auth-grid--inputSection--input--formcontrol uploadmodal-big--info-form--input--formcontrol--name"
                            focusCap
                        />
                        <Input
                            class="auth-grid--inputSection--input"
                            onInput={inputHandler}
                            label="password"
                            validators={VALIDATOR_REQUIRE()}
                            element="input"
                            auth
                            max={255}
                            id="password"
                            type="password"
                            labelClass="auth-grid--inputSection--input--label"
                            labelUpClass="auth-grid--inputSection--input--label--up"
                            errorText="Enter a valid password"
                            formControlClass="uploadmodal-big--info-form--input--formcontrol auth-grid--inputSection--input--formcontrol uploadmodal-big--info-form--input--formcontrol--name"
                            focusCap
                        />

                        <div className="auth-agree-terms">
                        
                            <input 
                                checked={checkboxValue}
                                onChange={() => setCheckboxValue(!checkboxValue)}
                                type="checkbox"
                                id="agree"
                                name="agree"
                            />
                            <div> <span onClick={() => setCheckboxValue(!checkboxValue)}>I agree to {`SoundShare's`} </span><a rel="noreferrer" target="_blank" href="https://www.soundshare.cc/termsofservice"> Terms of Use </a></div>
                        </div>



                        <div className="auth-grid--inputSection--btns">
                            <div className="outline-btn auth-move-up-other">
                                <button onClick={submitAuth} type="submit" className="btn nohover">Submit</button>
                            </div>
                            
                            <div className="auth-grid--inputSection--btns--lastContain auth-move-up">
                                <button type="button" onClick={switchSignin} className="btn nohover auth-grid--inputSection--btns--last">
                                    <span>Already have an acccount?</span>
                                    <span className="auth-underline-text">Login</span>
                                </button>
                            </div>

                            <ForgotPassword/>

                            <div className="auth-loader">
                                <BallLoader loading={isLoading}/>
                            </div>
                            
                        </div>

                    </form>
                    

                </div>

                <div className="auth-btn-container">
                    
                </div>

                
            </div>

            )}
        </Fragment>
    )
}

export default AuthForm
