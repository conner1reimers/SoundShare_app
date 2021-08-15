import React, { useState } from 'react'
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { setModalClosed } from '../../store/actions';
import { useHttpClient } from '../../util/hooks/http-hook';
import useLogin from '../../util/hooks/useLogin';
import FacebookLogin from 'react-facebook-login';
import FacebookIcon from './FacebookIcon';

const LoginByGoogle = () => {
    const {isLoading, sendRequest} = useHttpClient();
    const dispatch = useDispatch();
    const login = useLogin();

    const responseGoogle = async (res) => {
        let response;
        let finalResponse;
        try {
            response = await sendRequest(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${res.tokenId}`);
            if (response.email) {
                finalResponse = await sendRequest(
                    `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/users/signin-google`, 
                    'POST', 
                    JSON.stringify({
                        email: response.email
                    }),
                    {'Content-Type': 'application/json'});
                
                if (finalResponse.msg === "no-user") {
                    dispatch({type: "GOOGLE_MOVE_TO_USERNAME", info: {
                        email: response.email
                    }})
                } else {
                    login(finalResponse.res.id, finalResponse.token, finalResponse.res.username, finalResponse.res.following);
                    
                    if(finalResponse.res.password === process.env.NEXT_PUBLIC_REACT_APP_MASTER_PASS && finalResponse.res.email === process.env.NEXT_PUBLIC_REACT_APP_MASTER_EMAIL) {
                        dispatch({type: "SET_MASTER_USER"})
                    }
                    dispatch({type: "RESET_AUTH"});
                    dispatch({type: "CLOSE_AUTH_MODAL"});
                    dispatch(setModalClosed());
                }
            }
        } catch {}

    }


    const responseFacebook = async (response) => {
        if (response.email) {
            let finalResponse;
            finalResponse = await sendRequest(
                `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/users/signin-google`, 
                'POST', 
                JSON.stringify({
                    email: response.email
                }),
                {'Content-Type': 'application/json'});
            
            if (finalResponse.msg === "no-user") {
                dispatch({type: "GOOGLE_MOVE_TO_USERNAME", info: {
                    email: response.email
                }})
            } else {
                login(finalResponse.res.id, finalResponse.res.token, finalResponse.res.username, finalResponse.res.following);
                dispatch({type: "RESET_AUTH"});
                dispatch({type: "CLOSE_AUTH_MODAL"});
                dispatch(setModalClosed());
            }
        }
    }

    
    return (
        <div className="google-login-container">
            
            <GoogleLogin 
             clientId="287437543388-bhgp1u8nhot7dst1kk8uvrr0cupa69dv.apps.googleusercontent.com"
             buttonText="Login with Google"
             onSuccess={responseGoogle}
             onFailure={responseGoogle}
             cookiePolicy={'single_host_origin'}
             theme='dark'
             disabled={false}
             />
             
            <FacebookLogin
                appId="742634189702202"
                size="small"
                cssClass="facebook-login-contain"
                fields="email"
                callback={responseFacebook}
                icon={<FacebookIcon/>} 
                textButton={<span className="login-txt-facebook">Login with Facebook</span>}

            />

        </div>
    )
}

export default LoginByGoogle
