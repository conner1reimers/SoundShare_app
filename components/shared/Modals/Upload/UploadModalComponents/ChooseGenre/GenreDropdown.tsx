import React, { Fragment, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import popGenre from '../../../../../../util/img/pop.svg';
import soundwaves from '../../../../../../util/img/sound-waves.svg';
import djMixer from '../../../../../../util/img/djMixer.svg';
import rnbBox from '../../../../../../util/img/rnbBox.svg';
import rock from '../../../../../../util/img/rock.svg';
import ipod from '../../../../../../util/img/ipod.svg';
import bird from '../../../../../../util/img/bird.svg';
import water from '../../../../../../util/img/water.svg';
import wedd from '../../../../../../util/img/wedd.svg';
import anger from '../../../../../../util/img/anger.svg';
import games from '../../../../../../util/img/games.svg';
import { useSelector } from 'react-redux';
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


interface GenreDropProps {
  setGenre: any,
  setChosen?: any,
  isList?: any,
  listCategory?: any
}

const GenreDropdown: React.FC<GenreDropProps> = ({ setGenre, setChosen, isList, listCategory }) => {
  const category = useSelector((state: any) => state.upload.category);

  const clickHandler = useCallback((event, option, children) => {
    event.preventDefault();
    setChosen(children);
    setGenre(option)
  }, []);

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
          option="hip"
          key="hip"
        >
          <span>Hip-Hop <Image src={djMixer} alt=""/></span>
        </DropdownItem>

        <DropdownItem
          option="elect"
          key="elect"
        >
          <span>Electronic <Image src={soundwaves} alt=""/></span>
        </DropdownItem>

        <DropdownItem
          option="pop"
          key="pop"
        >
          <span>Pop <Image src={popGenre} alt=""/></span>
          
        </DropdownItem>

        <DropdownItem
          option="rnb"
          key="rnb"
        >
          <span>RnB<Image src={rnbBox} alt=""/></span>
        </DropdownItem>

        <DropdownItem
          option="rock"
          key="rock"
        >
          <span>Rock<Image src={rock} alt=""/></span>
        </DropdownItem>

        <DropdownItem
          option="country"
          key="count"
        >
          <span>Country<Image src={rock} alt=""/></span>
        </DropdownItem>

        <DropdownItem
          option="other"
          key="other"
        >
          <span>Other<Image src={ipod} alt=""/></span>
        </DropdownItem>
      </Fragment>
    )
  }

  const FxDropdown = () => {
    return (
      <Fragment>
        <DropdownItem
          option="aggressive"
          key="aggressive"
        >
          <span>Aggressive <Image src={anger} alt=""/></span>
        </DropdownItem>

        <DropdownItem
          option="calm"
          key="calm"
        >
          <span>Calm <Image src={water} alt=""/></span>
        </DropdownItem>

        <DropdownItem
          option="digital"
          key="digital"
        >
          <span>Digital <Image src={games} alt=""/></span>
          
        </DropdownItem>

        <DropdownItem
          option="alert"
          key="alert"
        >
          <span>Alerts<Image src={wedd} alt=""/></span>
        </DropdownItem>

        <DropdownItem
          option="nature"
          key="nature"
        >
          <span>Nature<Image src={bird} alt=""/></span>
        </DropdownItem>

        <DropdownItem
          option="other"
          key="other"
        >
          <span>Other<Image src={ipod} alt=""/></span>
        </DropdownItem>
      </Fragment>
    )
  }
  
  return (
    <AnimatePresence>
      {!isList ? (
        <Fragment>
        {category === 'fx' ? (
          <FxDropdown/>
        ) : (
          <LoopDropdown/>
        )}
        </Fragment>) : (
        <Fragment>
          {listCategory === 'fx' ? (
            <FxDropdown/>
          ) : (
            <LoopDropdown/>
          )}
        </Fragment>
      )}

      
    </AnimatePresence>
  )
}

export default GenreDropdown