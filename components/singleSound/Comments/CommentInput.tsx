import React, { useState, useEffect, Fragment } from 'react'
import { useForm } from '../../../util/hooks/useForm';
import { VALIDATOR_REQUIRE } from '../../../util/validators';
import { useHttpClient } from '../../../util/hooks/http-hook';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useGlobalMsg } from '../../../util/hooks/useGlobalMsg';
import { UserState } from "../../../store/reducers/user";
import Input from '../../common_reusable/Input';
import LoadingAnimation from '../../animatedLoaders/LoadingAnimation/LoadingAnimation';


interface Root {
  user: UserState
}
const optionsVariants = {
    initial: {
        x: '-20%',
        opacity: 1,
        scale: 1
    },
    out: {
        x: '-100%',
        opacity: 0,
        scale: 0
    },
    in: {

        x: '0%',
        opacity: 1,
        scale: 1
    }
};
const optionsTransition = {
    type: 'spring',
    mass: 1,
    damping: 21,
    stiffness: 120,
    velocity: 1
    
};

interface Props {
    soundInfo: any,
    setSoundInfo: any
}


const CommentInput: React.FC<Props> = ({soundInfo, setSoundInfo}) => {
    const [formState, inputHandler] = useForm({
        comment: {
            value: '',
            isValid: false
        }
    }, false);

    const setGlobalMsg = useGlobalMsg();

    const auth = useSelector((state: Root) => state.user);
    const {isLoading, sendRequest} = useHttpClient();

    const [showBtn, setShowBtn] = useState(false);

    const submitComment = async (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        let response;

        if (auth.isLoggedIn && !isLoading) {
            try {
                response = await sendRequest(`${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/comment/${soundInfo.sound.id}/${auth.userId}`, 'POST',
                JSON.stringify({
                    comment: formState.inputs.comment.value
                }),
                {'Content-Type':'application/json', 'Authorization': 'Bearer '+auth.token});
                if (response.msg === "comment-success") {
                    let newComments = [response.comment, ...soundInfo.comments];
    
                    setSoundInfo((prevState: any) => {
                        return {
                            ...prevState,
                            comments: newComments,
                            offset: prevState.offset + 1
                        }
                    });

                    setGlobalMsg('Comment submitted.', 'success');
        
                } else {
                    setGlobalMsg('There was some sort of error', 'error')
                }
                
                

            } catch (err) {}
        } else {
            setGlobalMsg('you need to login', 'error')
            }    
        }

        let inputEl: any;
        useEffect(() => {
            if (soundInfo.sound.id && !showBtn) {
               inputEl = document.querySelector('.single-sound--comments--input');
               inputEl.classList.remove('single-sound--comments--buttonshow');
            } else if (showBtn) {
                inputEl = document.querySelector('.single-sound--comments--input');
                inputEl.classList.add('single-sound--comments--buttonshow');
            }
        }, [soundInfo, showBtn])
        

    return (
        <Fragment>
            <LoadingAnimation loading={isLoading}/>
            <form className="single-sound--comments--form" onSubmit={submitComment}>
                <Input
                    blur={() => setShowBtn(prevState => !prevState)}
                    formControlClass="single-sound--comments--input--formcontrol"
                    class="single-sound--comments--input" 
                    onInput={inputHandler}
                    element="input" 
                    id="comment" 
                    label="comment"
                    validators={VALIDATOR_REQUIRE()}
                    labelClass="com-label"
                />
                <AnimatePresence exitBeforeEnter>
                    {showBtn && (
                    <motion.div 
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={optionsVariants}
                        transition={optionsTransition}
                        onClick={submitComment}
                        className="outline-btn"
                    >

                
                        <motion.button 
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={optionsVariants}
                                transition={optionsTransition}
                                onClick={submitComment} 
                                type="submit" 
                                className="btn nohover single-sound--comments--submit"
                        >
                            Submit
                        </motion.button>
                    </motion.div>)}
                </AnimatePresence>
            </form>
        </Fragment>
    )
}

export default CommentInput
