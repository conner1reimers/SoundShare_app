import React, { useReducer, useEffect, useState } from 'react';
import {validate} from '../../util/validators';
import { AnimatePresence, motion } from 'framer-motion';
import err from '../../util/img/err.svg'
import Image from 'next/image';

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

const inputReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            }
        default:
            return state;
    }
};

interface Props {
    value?: any,
    valid?: any,
    id: any,
    onInput: any,
    label?: any,
    focusCap?: any,
    max?: any,
    labelClass?: any,
    validators?: any,
    children?: any,
    type?: any,
    element?: any,
    auth?: any,
    class?: any,
    formControlClass?: any,
    errorText?: any,
    labelUpClass?: any,
    blur?: any,
    loseFocus?: any

}


const Input: React.FC<Props> = ({value: val2, valid, id, onInput, label, focusCap, max, labelClass, validators, children, type, element: propEl, auth, class: propClass, formControlClass, errorText, labelUpClass, blur, loseFocus}) => {
    const [inputState, dispatch] = useReducer(inputReducer, 
        {
        isTouched: false,
        value: val2 || '',
        isValid: valid || false
    });

    const { value, isValid} = inputState;

    
    const [labelShow, setLabelShown] = useState<any>(true);
    const [labelAlreadyGone ,setLabelAlreadyGone] = useState<any>(false);
    const [focusUp, setFocusUp] = useState<any>(false);
    const [labelUp, setLabelup] = useState<any>(false);

    // useEffect() to run some logic whenever the input value OR validity changes
    useEffect(() => {
        onInput(id, value, isValid);

        if (value.length > 0 && !labelUp) {
            setLabelup(true)
            setLabelShown(false)
        }
    }, [id, value, isValid, onInput])


    useEffect(() => {
        if (val2 && val2 !== value) {
            dispatch({type: 'CHANGE', val: val2, validators: true});
        }
    }, [val2])



    const changeHandlr = (event: any) => {
        if (!focusCap) {
            if (event.target.value.length === 0 && labelAlreadyGone) {
            setLabelShown(true)
            setLabelAlreadyGone(false)

            if (blur) {
                blur();
            }
        } else if (event.target.value.length > 0 && !labelAlreadyGone) {
            setLabelShown(false);
            setLabelAlreadyGone(true);
            if (blur) {
                blur()
            }
            if (!focusUp) setFocusUp(true);
        }} 

        dispatch({type: 'CHANGE', val: event.target.value, validators: validators});


        
    }

    const touchedHandlr = (loc: any) => {
        dispatch({type: 'TOUCH'})    
        if (focusCap) {
            if (labelUp && value.length === 0) setLabelup(false);
        }
        
        if (loseFocus) {
            loseFocus();
        }
    }

    const focusCapHandler = () => {
        if (label) {
            setFocusUp(true);
        }
        if (!labelUp) setLabelup(true);
    }
    

    const element = propEl === 'input' 
    ? <input
        type={type} 
        placeholder={children}
        onChange={changeHandlr}
        onBlur={touchedHandlr}
        id={id}
        className={`inputclass ${propClass}`}
        onFocus={focusCap ? focusCapHandler : () => {}}
        value={inputState.value}
        
        
        /> 
    : <textarea
        placeholder={children}
        onChange={changeHandlr}
        onBlur={touchedHandlr}
        id={id}
        className={`inputclass ${propClass}`}
        onFocusCapture={focusCap ? focusCapHandler : () => {}}
        value={inputState.value}

    />
    return (
        <div className={`form-control ${!inputState.isValid && inputState.isTouched && auth && 'form-control--invalid'} ${formControlClass}`}>
            
                {max && (
                <div className={`input-count ${auth ? "input-count--auth" : ""}`}>
                    <span className={`${inputState.value.length > max ? 'overcount' : ''}`}>{inputState.value.length} / {max}</span>
                </div>)}

                {labelShow && label && focusCap && (
                <label 
                    className={`${labelClass ? `form-label form-label--focusCap ${labelClass} ${labelUp ? 'form-label--labelUp' : ''}` : 'form-label'} ${labelUp && labelUpClass ? labelUpClass : ''} `} 
                    htmlFor={id}
                    
                    >
                        {label}
                    
                </label>)}

            <AnimatePresence exitBeforeEnter>
                {labelShow && label && !focusCap && (
                <motion.label 
                    className={`${labelClass ? `form-label ${labelClass}` : 'form-label'}`} 
                    htmlFor={id}
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={optionsVariants}
                    transition={optionsTransition}
                    >
                        {label}
                    
                </motion.label>)}

            </AnimatePresence>
            {element}
            {!inputState.isValid && inputState.isTouched && auth && (
                <div className="input-notvalid">
                    <Image src={err} alt=""/>
                    <div>
                        <p className="input-error-txt">({errorText})</p>
                    </div>

                    
                </div>)}
            {/* {!inputState.isValid && inputState.isTouched ? <p>{errorText}</p> : null} */}
        </div>
    )
}

export default React.memo(Input)
