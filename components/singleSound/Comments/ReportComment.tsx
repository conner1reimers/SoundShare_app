import React from 'react'
import { Fragment } from 'react'
import {useForm} from '../../../util/hooks/useForm'
import { VALIDATOR_MAXLENGTH } from '../../../util/validators'
import {useHttpClient} from '../../../util/hooks/http-hook'
import {  useSelector } from 'react-redux'
import { useGlobalMsg } from '../../../util/hooks/useGlobalMsg'
import closeImg from '/public/close.svg';
import { UserState } from "../../../store/reducers/user/user";
import Input from '../../common_reusable/Input'
import Modal from '../../shared/Modals/Modal'
import Image from 'next/image'


interface Root {
  user: UserState
}

interface Props {
    id: any,
    close: any
}
const ReportComment: React.FC<Props> = ({id, close}) => {

    const [formState, inputHandler] = useForm({
        report: {
            value: '',
            isValid: true
        }
    }, true);

    const userId = useSelector((state: Root) => state.user.userId);
    const token = useSelector((state: Root) => state.user.token);
    const {sendRequest} = useHttpClient();
    const setGlobalMsg = useGlobalMsg();


    const submit = async (e: any) => {
        e.preventDefault();
        let response;

        try {
            response = await sendRequest(`/sounds/report-comment/${userId}/${id}`, 'POST', 
            JSON.stringify({
                msg: formState.inputs.report.value
            }),
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            });

            if (response.msg === 'success') {
                setGlobalMsg('Comment reported', 'success');
            } else {
                setGlobalMsg('Something went wrong...', 'error');
            }
        } catch (err) {}

        close();
    }


    return (
        <Fragment>
            <Modal open upload>
                <div className="report-comment">

                    <div className="report-comment--head">
                        <h1 className="headings">
                            Tell us why you are reporting
                        </h1>
                    </div>

                    <div onClick={close} className="auth-modal-close-contain modal-close-report">
                        <Image src={closeImg} alt=""/>
                    </div>
                
                    <form onSubmit={submit}>
                        <Input 
                            class="searchsound-input" 
                            onInput={inputHandler} 
                            element="desc" 
                            id="report"
                            label="Optional" 
                            validators={VALIDATOR_MAXLENGTH(350)}

                        />
                        <div className="edit-btn-container-single">
                            <div className="edit-btn-container-single--btn">
                                <button type="submit" onClick={submit} className="btn nohover edit-btn-btn">SUBMIT</button>
                            </div>
                            <div className="edit-btn-container-single--btn">
                                <button onClick={close} type="button" className="btn nohover edit-btn-btn btn-cancel">CANCEL</button>
                            </div>
                            <div className="edit-btn-container-single--btn edit-desc-countcontain">
                                <span className={`edit-desc-counterspan ${!formState.isValid ? 'invalid-count' : ''}`}>{formState.inputs.report.value.length} / 350</span>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
           
        </Fragment>
        
    )
}

export default ReportComment
