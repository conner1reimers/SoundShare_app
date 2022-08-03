import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHttpClient } from '../../../util/hooks/http-hook'
import { useForm } from '../../../util/hooks/useForm'
import { useGlobalMsg } from '../../../util/hooks/useGlobalMsg'
import { VALIDATOR_MAXLENGTH, VALIDATOR_REQUIRE } from '../../../util/validators'
import { UserState } from "../../../store/reducers/user/user";
import Input from '../../common_reusable/Input'
import BallLoader from '../../animatedLoaders/BallLoader/BallLoader'

interface Root {
  user: UserState
}

const optionsVariants = {
    initial: {
        y: "-5%",
        rotate: '20deg',
        scale: 0.5,
        opacity: 0,
    },
    out: {

        y: 0,
        scale: 0,
        rotate: '20deg',
        opacity: 0

    },
    in: {
        y: " 0%",
        scale: 1,
        rotate: '0deg',
        opacity: 1


    }
}

const optionsTransition = {
    type: 'spring',
    mass: 3.5,
    damping: 100,
    stiffness: 1000,
    velocity: .01
    
}

interface Props {
    setEditMode: any,
    user?: any,
    setSoundInfo?: any,
    id: any,
    open: any,
    desc?: any

}
const EditDesc: React.FC<Props> = ({setEditMode, setSoundInfo, user, id, open, desc}) => {
    const [editSoundState, inputHandler] = useForm({
        edit: {
            value: '',
            isValid: false
        }
    }, false);
    const {isLoading, sendRequest} = useHttpClient();
    const dispatch = useDispatch();
    const token = useSelector((state: Root) => state.user.token);
    const setGlobalMsg = useGlobalMsg();
    const uid = useSelector((state: Root) => state.user.userId);

    const closeMode = () => {
        setEditMode(null);
    }

    const submitEditDesc = async (e: any) => {
        e.preventDefault();
        if (editSoundState.inputs.edit.value !== "" && editSoundState.inputs.edit.isValid) {

            if (!user) {
                try {
                    await sendRequest(`${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/description/${id}/${uid}`, 'PATCH', JSON.stringify({
                        description: editSoundState.inputs.edit.value
                    }),
                    {'Content-Type': 'application/json', 'Authorization': 'Bearer '+token });
                    setSoundInfo((prevState: any) => {
                        return {
                            ...prevState,
                            sound: {
                                ...prevState.sound,
                                description: editSoundState.inputs.edit.value
                            }
                        }
                    });
                    closeMode();
                } catch (err) {}
            } else if (user) {
                try {
                    await sendRequest(`${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/users/edit/bio/${id}`, 'PATCH', JSON.stringify({
                        bio: editSoundState.inputs.edit.value
                    }), {'Content-Type': 'application/json', 'Authorization': 'Bearer '+token });

                    dispatch({type: 'CHANGE_USER_BIO', bio: editSoundState.inputs.edit.value})
                    closeMode();
                } catch (err) {}
            }
        } else {
            setGlobalMsg('Invalid, must be less than 320 characters', 'error');
        }
    }
    return (
        <AnimatePresence exitBeforeEnter>
            
            <div className="ball-loader-singlesound-desc">
                <BallLoader loading={isLoading}/>
            </div>
            
            {open && (
            <motion.div 
                initial="initial"
                animate="in"
                exit="out"
                key="edit-desc"
                variants={optionsVariants}
                transition={optionsTransition}
                className={`single-sound--info--desc ${user ? 'user-edit-bio' : 'single-edit-desc'}`}
            >
                <form onSubmit={submitEditDesc}>
                    <Input 
                        class="searchsound-input" 
                        onInput={inputHandler} 
                        element="desc" 
                        id="edit" 
                        validators={VALIDATOR_MAXLENGTH(320)}
                        value={desc ? desc : ''}
                    />
                    <div className="edit-btn-container-single">
                        <div className="edit-btn-container-single--btn">
                            <button type="submit" onClick={submitEditDesc} className="btn nohover edit-btn-btn">SUBMIT</button>
                        </div>
                        <div className="edit-btn-container-single--btn">
                            <button onClick={closeMode} type="button" className="btn nohover edit-btn-btn btn-cancel">CANCEL</button>
                        </div>
                        <div className="edit-btn-container-single--btn edit-desc-countcontain">
                            <span className={`edit-desc-counterspan ${!editSoundState.isValid ? 'invalid-count' : ''}`}>{editSoundState.inputs.edit.value.length} / 320</span>
                        </div>
                    </div>
                </form>
            </motion.div>)}
        </AnimatePresence>)
}

export default EditDesc
