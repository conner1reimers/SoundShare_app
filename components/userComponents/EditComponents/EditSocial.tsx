import React from 'react'
import { useForm } from '../../../util/hooks/useForm';
import { VALIDATOR_REQUIRE } from '../../../util/validators';
import { useHttpClient } from '../../../util/hooks/http-hook';
import { useDispatch, useSelector } from 'react-redux';
import { useGlobalMsg } from '../../../util/hooks/useGlobalMsg';
import { UserState } from "../../../store/reducers/user/user";
import Input from '../../common_reusable/Input';
import BallLoader from '../../animatedLoaders/BallLoader/BallLoader';
import EditImgModal from '../../shared/Modals/EditImgModal';
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface Root {
    user: UserState
  }
  
interface Props {
    setEditMode: any,
    id: any,
    open: any
}

  
const EditSocial: React.FC<Props> = ({setEditMode, id, open}) => {
    const [editSoundState, inputHandler] = useForm({
        twitter: {
            value: '',
            isValid: false
        },
        youtube: {
            value: '',
            isValid: false
        },
        facebook: {
            value: '',
            isValid: false
        },
        insta: {
            value: '',
            isValid: false
        },
    }, false);

    const closeModal = () => {
        setEditMode(null)
    }

    const {isLoading, sendRequest} = useHttpClient();
    const dispatch = useDispatch();
    const setGlobalMsg = useGlobalMsg();
    const token = useSelector((state: Root) => state.user.token);


    const changeInstaLink = async (e: any) => {
        e.preventDefault();
        
        const reg = /^(http(s)?:\/\/)?((w){3}.)?instagram?(\.com)?\/.+/gm;
        if (editSoundState.inputs.insta.value !== "") {
            if (reg.test(editSoundState.inputs.insta.value)) {
                try {
                    await sendRequest(`/users/social/insta/${id}`, 'PATCH', JSON.stringify({
                        link: editSoundState.inputs.insta.value
                    }),
                    {'Content-Type': 'application/json', 'Authorization': 'Bearer '+token});
                    dispatch({ type: 'CHANGE_USER_SOCIAL', social: 'insta', link: editSoundState.inputs.insta.value });
                    setGlobalMsg('Link set!', 'success');
    
                } catch (err) {}
            } else {
                setGlobalMsg('Sorry, thats not an Instagram link', 'error')
            }
        }
    }

    const changeYoutubeLink = async (e: any) => {
        e.preventDefault();
        
        if (editSoundState.inputs.youtube.value !== "") {
            const reg = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm;

            if (reg.test(editSoundState.inputs.youtube.value)) {
                try {
                    await sendRequest(`/users/social/youtube/${id}`, 'PATCH', JSON.stringify({
                        link: editSoundState.inputs.youtube.value
                    }),
                    {'Content-Type': 'application/json', 'Authorization': 'Bearer '+token});
                    dispatch({type: 'CHANGE_USER_SOCIAL', social: 'youtube', link: editSoundState.inputs.youtube.value})
                    setGlobalMsg('Link set!', 'success');

                } catch (err) {}
            } else {
                setGlobalMsg('Sorry, thats not a Youtube link', 'error')
            }
            
        }
    }

    const changeTwitterLink = async (e: any) => {
        e.preventDefault();
        const reg = /^(http(s)?:\/\/)?((w){3}.)?twitter?(\.com)?\/.+/gm;

        if (editSoundState.inputs.twitter.value !== "") {
            if (reg.test(editSoundState.inputs.twitter.value)) {
                try {
                    await sendRequest(`/users/social/twitter/${id}`, 'PATCH', JSON.stringify({
                        link: editSoundState.inputs.twitter.value
                    }),
                    {'Content-Type': 'application/json', 'Authorization': 'Bearer '+token});
                    dispatch({type: 'CHANGE_USER_SOCIAL', social: 'twitter', link: editSoundState.inputs.twitter.value})
                    setGlobalMsg('Link set!', 'success');

                } catch (err) {}
            } else {
                setGlobalMsg('Sorry, thats not a Twitter link', 'error')

            }
            
        }
    }

    const changeFacebookLink = async (e: any) => {
        e.preventDefault();
        
        const reg = /^(http(s)?:\/\/)?((w){3}.)?facebook?(\.com)?\/.+/gm;

        if (editSoundState.inputs.facebook.value !== "") {
            if (reg.test(editSoundState.inputs.facebook.value)) {
                try {
                    await sendRequest(`/users/social/facebook/${id}`, 'PATCH', JSON.stringify({
                        link: editSoundState.inputs.facebook.value
                    }),
                    {'Content-Type': 'application/json', 'Authorization': 'Bearer '+token});
                    dispatch({type: 'CHANGE_USER_SOCIAL', social: 'facebook', link: editSoundState.inputs.facebook.value})
                    setGlobalMsg('Link set!', 'success');

                } catch (err) {}
            } else {
                setGlobalMsg('Sorry, thats not a Facebook link', 'error')

            }
            
        }
    }

    return (
        <EditImgModal closeModal={closeModal} open={open} social>
            <div className="edit-social-head">
                <h1>Add Social Media Links</h1>
            </div>
            
            <div>
                <form className="edit-social--form">
                    <div className="edit-social--inputconain">
                        <Input 
                            class="user-edit-social" 
                            element="input" 
                            id="insta"
                            label={<span className="auth-grid--inputSection--input--label social-link--editlabel">Instagram Link <FontAwesomeIcon icon={faInstagram}/></span>} 
                            labelClass="auth-grid--inputSection--input--label"
                            labelUpClass="auth-grid--inputSection--input--label--up"            
                            focusCap
                            validators={VALIDATOR_REQUIRE()}
                            onInput={inputHandler}
                        />
                        <Input 
                            class="user-edit-social" 
                            element="input" 
                            id="youtube"
                            label={<span className="auth-grid--inputSection--input--label social-link--editlabel">Youtube Link <FontAwesomeIcon icon={faYoutube}/></span>} 
                            labelClass="auth-grid--inputSection--input--label"
                            labelUpClass="auth-grid--inputSection--input--label--up"            
                            focusCap
                            validators={VALIDATOR_REQUIRE()}
                            onInput={inputHandler}
                        />
                        <Input 
                            class="user-edit-social" 
                            element="input" 
                            id="twitter"
                            label={<span className="auth-grid--inputSection--input--label social-link--editlabel">Twitter Link <FontAwesomeIcon icon={faTwitter}/></span>} 
                            labelClass="auth-grid--inputSection--input--label"
                            labelUpClass="auth-grid--inputSection--input--label--up"            
                            focusCap
                            validators={VALIDATOR_REQUIRE()}
                            onInput={inputHandler}
                        />
                        <Input 
                            class="user-edit-social" 
                            element="input" 
                            id="facebook"
                            label={<span className="auth-grid--inputSection--input--label social-link--editlabel">Facebook Link <FontAwesomeIcon icon={faFacebook}/></span>} 
                            labelClass="auth-grid--inputSection--input--label"
                            labelUpClass="auth-grid--inputSection--input--label--up"            
                            focusCap
                            validators={VALIDATOR_REQUIRE()}
                            onInput={inputHandler}
                        />
                    </div>
                    
                    <div className="social-edit--submit-btns">
                        <div className="circleSave">
                            <button onClick={changeInstaLink} type="button" className="btn nohover">SUBMIT</button>
                        </div>
                        <div className="circleSave">
                            <button onClick={changeYoutubeLink} type="button" className="btn nohover">SUBMIT</button>
                        </div>
                        <div className="circleSave">
                            <button onClick={changeTwitterLink} type="button" className="btn nohover">SUBMIT</button>
                        </div>
                        <div className="circleSave">
                            <button onClick={changeFacebookLink} type="button" className="btn nohover">SUBMIT</button>
                        </div>
                    </div>
                </form>
            </div>
        
            <div className="social-edit-loading">
                <BallLoader loading={isLoading}/>
            </div>
        </EditImgModal>
    )
}



export default EditSocial
