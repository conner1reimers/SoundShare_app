import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Input from '../../shared/Input/Input'
import { useHttpClient } from '../../util/hooks/http-hook'
import { useForm } from '../../util/hooks/useForm'
import { useGlobalMsg } from '../../util/hooks/useGlobalMsg'
import useLogin from '../../util/hooks/useLogin'
import {VALIDATOR_REQUIRE} from '../../util/validators'
import BallLoader from '../lotties/BallLoader/BallLoader'

const NewPassForm: React.FC = () => {
    
    const [formState, inputHandler] = useForm({
        password: {
            value: '',
            isValid: false
        },
        passwordConfirm: {
            value: '',
            isValid: false
        }
    });
    const login = useLogin();
    const params: any = useParams();
    const history: any = useHistory();

    const setGlobalMsg = useGlobalMsg();

    const {isLoading, sendRequest} = useHttpClient();


    const submitNewPassword = async (e: any) => {
        e.preventDefault();

        if (formState.inputs.password.value === formState.inputs.passwordConfirm.value) {
            let response;
            try {
                response = await sendRequest(`${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/users/change-password/`, 'POST', 
                    JSON.stringify({
                        password: formState.inputs.password.value,
                        token: params.token
        
                    }),
                    {'Content-Type': 'application/json'});
                
                if (response.msg === 'success') {
                    login(response.user.id, response.userToken, response.user.username, response.user.following);
                    history.push("/home");
                }
            } catch (err) {}
        } else {
            setGlobalMsg('Passwords do not match', 'error');
        }

    }
    
    
    return (
        <div className="new-password-form-container">
            <form className="auth-grid--form new-password-form" onSubmit={submitNewPassword}>
                        
                        <Input
                            class="auth-grid--inputSection--input"
                            onInput={inputHandler}
                            label="password"
                            validators={VALIDATOR_REQUIRE()}
                            element="input"
                            auth
                            max={50}
                            id="password"
                            type="password"
                            labelClass="auth-grid--inputSection--input--label"
                            labelUpClass="auth-grid--inputSection--input--label--up"
                            errorText="Please enter a valid password"
                            formControlClass="uploadmodal-big--info-form--input--formcontrol auth-grid--inputSection--input--formcontrol uploadmodal-big--info-form--input--formcontrol--name"
                            focusCap
                        />

                        <Input
                            class="auth-grid--inputSection--input"
                            onInput={inputHandler}
                            label="Confirm Password"
                            validators={VALIDATOR_REQUIRE()}
                            element="input"
                            auth
                            max={50}
                            id="passwordConfirm"
                            type="password"
                            labelClass="auth-grid--inputSection--input--label"
                            labelUpClass="auth-grid--inputSection--input--label--up"
                            errorText="Please enter a valid password"
                            formControlClass="uploadmodal-big--info-form--input--formcontrol auth-grid--inputSection--input--formcontrol uploadmodal-big--info-form--input--formcontrol--name"
                            focusCap
                        />
                        



                        <div className="auth-grid--inputSection--btns">
                            <div className="outline-btn">
                                <button onClick={submitNewPassword} type="submit" className="btn nohover">Submit</button>
                            </div>

                            <div className="auth-loader">
                                <BallLoader loading={isLoading}/>
                            </div>
                            
                        </div>

                    </form>
        </div>
    )
}

export default NewPassForm
