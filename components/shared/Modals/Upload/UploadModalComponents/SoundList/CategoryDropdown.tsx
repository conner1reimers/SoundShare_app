import React, { Fragment, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import popGenre from '../../../../../../util/img/pop.svg';
import soundwaves from '../../../../../../util/img/sound-waves.svg';
import djMixer from '../../../../../../util/img/djMixer.svg';
import { useGlobalMsg } from '../../../../../../util/hooks/useGlobalMsg';
import Image from 'next/image';

const dropdownVariants = {
  initial: {
      x: '0%',
      y: '-10%',
      opacity: 0.3,
      scale: 1
  },
  out: {
      x: '-10%',
      y: '-10%',
      opacity: 0,
      scale: 0
  },
  in: {

      x: '0%',
      y: '0%',
      opacity: 1,
      scale: 1
  }
};

const dropdownTransition = {
  type: 'spring',
  mass: 1,
  damping: 21,
  stiffness: 120,
  velocity: 1
  
};


interface Props {
  setGenre: any,
  setChosen?: any,
  duration?: any,
  listCat?: any
}

const CategoryDropdown: React.FC<Props> = ({ setGenre, setChosen, duration }) => {
  const setGlobalMsg = useGlobalMsg();

  

  const clickHandler = useCallback((event, option, children) => {
    event.preventDefault();
    event.cancelBubble = true;
    event.stopPropagation();
    
    if (typeof option === "string") {
      

      if (option === 'fx') {
        if (duration > 7) {
          setGlobalMsg('Shorter sounds / effects must be shorter than 7 seconds', 'error')
        } else {
          setGenre(option)
          setChosen(children);
        }
      } else {
        setGenre(option)
        setChosen(children);
      }
    }

  }, [setChosen, setGenre, duration, setGlobalMsg]);


 

  const DropdownItem = (props: any) => {

    return (
      <motion.div 
        initial="initial"
        animate="in"
        exit="out"
        variants={dropdownVariants}
        transition={dropdownTransition}
        className="genreDropdown--item" 
        onClick={(event) => clickHandler(event, props.option, props.children)}>

            {props.children}

            {props.rightIcon && props.rightIcon}
      </motion.div>
    )
  }

  const LoopDropdown = () => {
    return (
      <Fragment>
        <DropdownItem
          option="loop"
          key="loop"
        >
          <span>Loop <Image src={djMixer} alt=""/></span>
        </DropdownItem>

        <DropdownItem
          option="fx"
          key="fx"
        >
          <span>Effect <Image src={soundwaves} alt=""/></span>
        </DropdownItem>

        <DropdownItem
          option="vocal"
          key="vocal"
        >
          <span>Vocals <Image src={popGenre} alt=""/></span>
          
        </DropdownItem>

        
      </Fragment>
    )
  }

  
  return (
    <AnimatePresence>
      
          <LoopDropdown/>
        

      
    </AnimatePresence>
  )
}

export default CategoryDropdown
