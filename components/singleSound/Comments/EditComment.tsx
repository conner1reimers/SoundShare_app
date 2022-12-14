import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHttpClient } from '../../../util/hooks/http-hook';
import {useForm} from '../../../util/hooks/useForm'
import { useGlobalMsg } from '../../../util/hooks/useGlobalMsg';
import {VALIDATOR_REQUIRE} from '../../../util/validators'
import { UserState } from "../../../store/reducers/user/user";
import Input from '../../common_reusable/Input';


interface Root {
  user: UserState
}

interface Props {
    id: any,
    indx: any,
    close: any
}


const EditComment: React.FC<Props> = ({ id, indx, close}) => {
    const [formState, inputHandler] = useForm(
        {
            comment: {
                value: '',
                isValid: false
            }
    }, true);
    
    const {isLoading, sendRequest} = useHttpClient();
    const setGlobalMsg = useGlobalMsg();
    const token = useSelector((state: Root) => state.user.token);
    const userId = useSelector((state: Root) => state.user.userId);
    const dispatch = useDispatch();

    const submitEditComment = async () => {
        try {
            let result = await sendRequest(
                    `/sounds/editcomment/${id}/${userId}`, 'PATCH', 
                    JSON.stringify({
                        msg: formState.inputs.comment.value
                    }),
                    {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token
                    });
                if (result.msg === "UPDATED") {
                
                    dispatch({type: "SINGLESOUND_UPDATE_COMMENT", payload: {indx, msg: formState.inputs.comment.value}})
                    close();

                } else {
                    setGlobalMsg('There was some sort of error', 'error')
                }
            return result;
        } catch (err) {}
    }

    

    useEffect(() => {
            const inputEl: any = document.querySelector('.comment-edit-input');
            
            if (inputEl.scrollHeight !== inputEl.offsetHeight) {
                inputEl.style.height = (25+inputEl.scrollHeight)+"px";
            }
          
    }, [formState]);
    
    return (
        <div className="edit-comment-contain">
            <div className="edit-comment-inputcontain">
                <Input
                    onInput={inputHandler}
                    id="comment"
                    class="uploadmodal-big--info-form--input comment-edit-input"
                    element="textarea"
                    validators={VALIDATOR_REQUIRE()}
                    formControlClass="filter-menu--inputs--input"
                    type="input"
                />
            </div>
            
            <div className="edit-comment-btn-contain">
                <div className="outline-btn">
                    <button onClick={() => close()} className="btn nohover">Cancel</button>
                </div>
                <div className="outline-btn">
                    <button onClick={submitEditComment} className="btn nohover">Submit</button>
                </div>

            </div>
        </div>
    )
}

export default EditComment;
