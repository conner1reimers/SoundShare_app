import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { VALIDATOR_REQUIRE } from '../../../util/validators';
import { useForm } from '../../../util/hooks/useForm';
import { useGlobalMsg } from '../../../util/hooks/useGlobalMsg';
import { useHttpClient } from '../../../util/hooks/http-hook';
import close from '/public/close.svg';
import ModalStore from './ModalStore';
import { setModalClosed, setModalOpen } from '../../../store/actions';
import BallLoader from '../../animatedLoaders/BallLoader/BallLoader';
import Image from 'next/image';
import Input from '../../common_reusable/Input';

interface Props {
  isMyPage: boolean,
  id: any
}

const is_url = (str: any) =>
    {
      let regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
            if (regexp.test(str))
            {
              return true;
            }
            else
            {
              return false;
            }
    }

const SoundStore: React.FC<Props> = ({ isMyPage, id }) => {
  const [storeOptions, setStoreOptions] = useState<any>(false);
  const token = useSelector((state: any) => state.user.token);
  const storeLink = useSelector((state: any) => state.userPage.user.store_link);
  const setGlobalMsgs = useGlobalMsg();
  const dispatch = useDispatch();
  const {isLoading, sendRequest} = useHttpClient();

  const [editSoundState, inputHandler] = useForm({
    store: {
        value: '',
        isValid: false
    },
   
  }, false);
  
  
  const handleStoreClick = () => {
    if (isMyPage) {
      setStoreOptions(true);
      dispatch(setModalOpen());
    } else {
      if (!storeLink) {
        setGlobalMsgs('This creator has not linked a store', 'error');
      } else {
        var link = document.createElement("a");
        link.href = storeLink;
        link.target = "_blank";
        link.click();
      }
    }
  }

  const submitNewLink = async (e: any) => {
    e.preventDefault();
    let response: any;
    if (editSoundState.inputs.store.value !== "") {
        if (is_url(editSoundState.inputs.store.value)) {
            try {
                response = await sendRequest(`${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/users/storelink/${id}`, 'PATCH', JSON.stringify({
                    link: editSoundState.inputs.store.value
                }),
                {'Content-Type': 'application/json', 'Authorization': 'Bearer '+token});
              
              if (response.msg === "UPDATED") {
                dispatch({ type: 'CHANGE_USER_STORE', link: editSoundState.inputs.store.value });
                setGlobalMsgs('Link updated!', 'success');
              } else {
                setGlobalMsgs('Something went wrong... try again', 'error');
              }
    
            } catch (err) {}
        } else {
          setGlobalMsgs('Sorry, thats not a URL', 'error');
        }
    }
  }

  const closeModal = (e: any) => {
    e.preventDefault();
    setStoreOptions(false);
    dispatch(setModalClosed());
  }

  return (
    <div className="store-link">
      <div>
        <button onClick={handleStoreClick} className="btn-new store-btn">
          Visit Creators Store
        </button>
        
      </div>

      

        <ModalStore closeModal={closeModal} open={storeOptions}> 
            <div className="store-link-modal">
              
                <div className="close-store-outter">
                  <div className="close-contain-store">
                      <Image onClick={closeModal} className="xtraoptions-close close-ignore" src={close} alt=""/>
                  </div>
                </div>
                        
                <div className="store-link-modal--inner">
                      
                      
                    <h1 className="headings">Set a store link</h1>
                    <div className="store-modal-section-2">
                      <form onSubmit={submitNewLink} className="new-store-form">
                            <Input
                                class="user-edit-social"
                                element="input" 
                                id="store"
                                label={<span className="auth-grid--inputSection--input--label social-link--editlabel">Store Link </span>} 
                                labelClass="auth-grid--inputSection--input--label"
                                labelUpClass="auth-grid--inputSection--input--label--up"            
                                focusCap
                                validators={VALIDATOR_REQUIRE()}
                                onInput={inputHandler}
                  />        <div className="store-btn-contain">
                              <button type="submit" className="btn nohover new-btn">SUBMIT</button>
                            </div>
                      </form>
                      <div className="visit-store-link">
                        {storeLink && (
                          <div>
                            <a rel="noreferrer" className="social-btn store-link-creator" target="_blank" href={storeLink}>Visit Store link</a>
                          </div>
                          )}
                      </div>
                    </div>
                    
                </div>
                
          </div>
              <div className="social-edit-loading">
              <BallLoader loading={isLoading}/>
        </div>
        
        </ModalStore>
      

      </div>



    
  )
}

export default SoundStore
