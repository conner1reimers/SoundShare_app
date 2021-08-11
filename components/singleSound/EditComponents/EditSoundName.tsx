import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useHttpClient } from '../../../util/hooks/http-hook'
import { useForm } from '../../../util/hooks/useForm'
import { VALIDATOR_REQUIRE } from '../../../util/validators'
import { UserState } from "../../../store/reducers/user";
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
    setSoundInfo: any,
    id: any,
    open: any,
    name?: any

}


const EditSoundName: React.FC<Props> = ({setEditMode, setSoundInfo, id, open, name}) => {
    const [editSoundState, inputHandler] = useForm({
        edit: {
            value: '',
            isValid: false
        }
    }, false);
    const {isLoading, sendRequest} = useHttpClient();
    const token = useSelector((state: Root) => state.user.token);
    const uid = useSelector((state: Root) => state.user.userId);


    const submitEditName = async (e: any) => {
        e.preventDefault();
        
        if (editSoundState.inputs.edit.value !== "") {
            try {
                await sendRequest(`${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/name/${id}/${uid}`, 'PATCH', JSON.stringify({
                    name: editSoundState.inputs.edit.value
                }),
                {'Content-Type': 'application/json', 'Authorization': 'Bearer '+token});
                setSoundInfo((prevState: any) => {
                    return {
                        ...prevState,
                        sound: {
                            ...prevState.sound,
                            name: editSoundState.inputs.edit.value
                        }
                    }
                });
                closeMode();
            } catch (err) {}
        }
    }

    const closeMode = useCallback(() => {
        setEditMode(null);
    }, [setEditMode])


    return (
        <AnimatePresence exitBeforeEnter>
             
            
                <div className="ball-loader-singlesound-name">
                    <BallLoader loading={isLoading}/>
                </div>
            

            {open && ( 
            <motion.div 
                initial="initial"
                animate="in"
                exit="out"
                variants={optionsVariants}
                transition={optionsTransition}
                key="edit-name"
                className="single-sound--info--title">
                    
                <form onSubmit={submitEditName}>
                
                    <Input 
                        class="searchsound-input" 
                        onInput={inputHandler} 
                        element="input" 
                        id="edit" 
                        validators={VALIDATOR_REQUIRE()}
                        value={name ? name : ''}
                    />
                    <div className="edit-btn-container-single">
                    <div className="edit-btn-container-single--btn">
                        <button type="submit" onClick={submitEditName} className="btn nohover edit-btn-btn">SUBMIT</button>
                    </div>
                    <div className="edit-btn-container-single--btn">
                        <button onClick={closeMode} type="button" className="btn nohover edit-btn-btn">CANCEL</button>
                    </div>
                </div>
                </form>
            </motion.div>)}
        </AnimatePresence>)
}

export default EditSoundName;
