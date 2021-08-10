import React, { useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setModalClosed } from '../../../store/actions';
import { useHttpClient } from '../../../util/hooks/http-hook';
import { useForm } from '../../../util/hooks/useForm';
import { useGlobalMsg } from '../../../util/hooks/useGlobalMsg';
import useLogin from '../../../util/hooks/useLogin';
import { VALIDATOR_LOGIN } from '../../../util/validators';
import Input from '../../common_reusable/Input';


const UsernameCreate: React.FC = () => {
    const loginInfo = useSelector((state: RootStateOrAny) => state.auth.loginInfo);
    const {isLoading, sendRequest} = useHttpClient();
    const dispatch = useDispatch();
    const login = useLogin();
    const [checkboxValue, setCheckboxValue] = useState(false);
    const setGlobalMsg = useGlobalMsg()

    const [formState, inputHandler] = useForm({
        username: {
            value: '',
            isValid: false
        },
    }, false);


    const submitAuth = async (e: any) => {
        e.preventDefault();

        let response;
        if (checkboxValue) {
            try {
                response = await sendRequest(`${process.env.REACT_APP_MY_ENV}/users/create-user-google`, 
                    'POST', 
                    JSON.stringify({
                        email: loginInfo.email,
                        username: formState.inputs.username.value
                    }),
                    {'Content-Type': 'application/json'});
                
                if (response.token) {
                    login(response.user.id, response.token, response.user.username, response.user.following);
                    dispatch({type: "RESET_AUTH"});
                    dispatch({type: "CLOSE_AUTH_MODAL"});
                    dispatch(setModalClosed());
                } 
            } catch (err) {}
        } else {
            setGlobalMsg('To signup you must agree to our terms of use', 'error');
        }

        
    }


    return (
        <div className="username-create-contain">
            <div className="auth-grid--head">
                    <h1 className="headings">Create a username.</h1>
                    <p>Create a username so people can recognize you, and save your sounds for later!</p>
            </div>
            <form onSubmit={submitAuth} className="username-create-contain--form">
                <Input
                    class="auth-grid--inputSection--input"
                    onInput={inputHandler}
                    label="Enter a username"
                    validators={VALIDATOR_LOGIN(25)}
                    element="input"
                    max={25}
                    auth
                    errorText="Please enter a valid username"
                    id="username"
                    labelClass="auth-grid--inputSection--input--label"
                    labelUpClass="auth-grid--inputSection--input--label--up"                                
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

                            <div className="outline-btn">
                                <button onClick={submitAuth} type="submit" className="btn nohover">Submit</button>
                            </div>
            </form>
        </div>
    )
}

export default UsernameCreate
