import { motion } from 'framer-motion';
import React, { Children, Fragment, useCallback, useEffect, useState } from 'react'
import popGenre from '../../../../../../public/pop.svg';
import soundwaves from '../../../../../../public/sound-waves.svg';
import djMixer from '../../../../../../public/djMixer.svg';
import rnbBox from '../../../../../../public/rnbBox.svg';
import rock from '../../../../../../public/rock.svg';
import ipod from '../../../../../../public/ipod.svg';
import bird from '../../../../../../public/bird.svg';
import water from '../../../../../../public/water.svg';
import wedd from '../../../../../../public/wedd.svg';
import anger from '../../../../../../public/anger.svg';
import games from '../../../../../../public/games.svg';
import Image from 'next/image';

const genreFinderLoops = (val: any) => {
  switch (val) {
    case 'hip':
      return <span>Hip-Hop <Image src={djMixer} alt=""/></span>
    case 'elect':
      return <span>Electronic <Image src={soundwaves} alt=""/></span>
    case 'pop':
      return <span>Pop <Image src={popGenre} alt=""/></span>
    case 'rnb':
      return <span>RnB<Image src={rnbBox} alt=""/></span>
    case 'rock':
      return <span>Rock<Image src={rock} alt=""/></span>
    case 'country':
      return <span>Country<Image src={rock} alt=""/></span>
    case 'other':
      return <span>Other<Image src={ipod} alt=""/></span>
  }
}

const genreFinderFx = (val: any) => {
  switch (val) {
    case 'aggressive':
      return <span>Aggressive <Image src={anger} alt="" /></span>
    case 'calm':
      return <span>Calm <Image src={water} alt=""/></span>
    case 'digital':
      return <span>Digital <Image src={games} alt=""/></span>
    case 'alert':
      return <span>Alerts<Image src={wedd} alt=""/></span>
    case 'nature':
      return <span>Nature<Image src={bird} alt=""/></span>
    case 'other':
      return <span>Other<Image src={ipod} alt=""/></span>
  }
}


const DropdownClick: any = (props: any) => {
  const [open, setOpen] = useState<any>(false);
  const [genreIsChosen, setGenreIsChosen] = useState<any>(false);
  const [elHeight, setElHeight] = useState<any>({ height: null, width: null });
  const [firstOpen, setFirstOpen] = useState<any>(false);


  const openUp = useCallback((event: any) => {
    let element: any;
    element = !props.cat_list ? document.querySelector('.uploadmodal-big--dropdown') : document.querySelector(`.uploadmodal-big--dropdown-${props.indx}`);;
    setFirstOpen(true);
    event.preventDefault();

    if ((!elHeight.height || !elHeight.width)) {
      setElHeight({height: element.offsetHeight, width: element.offsetWidth})
    }
    let widthStyles: any, transformStyles: any;

    transformStyles = !props.cat_list ? 'translateY(-285px) translateX(-15px)' : 'translateY(2px) translateX(-315px)';
    widthStyles = !props.cat_list ? element.offsetWidth + 70 + 'px' : element.offsetWidth + 470 + 'px';
    
    if (!open) {
        element.style.height = element.offsetHeight + 350 + 'px';
        element.style.transform = transformStyles;
        element.style.border = 'none';
        setTimeout(() => {
          element.style.width = widthStyles;
          if (props.cat_list) {
            element.children[0].children[0].style.width = element.offsetWidth + 470 + 'px';
          }
          setOpen(true);
        }, 180);
    } else if (open) {
       
        element.style.height = elHeight.height + 'px';
        element.style.transform = 'translateY(0) translateX(0)';
        element.style.border = '';

        setTimeout(() => {
          element.style.width = elHeight.width + 'px';
          if (props.cat_list) {
            element.children[0].children[0].style.width = elHeight.width + 'px';
          }
          setOpen(false);
        }, 180);
        
    }

  }, [open]);

  let mainElement = <span>{`Choose a ${!props.cat_list ? 'genre' : 'category'}`}</span>;

  useEffect(() => {
    if (genreIsChosen) {
      let element: any;
      element = !props.cat_list ? document.querySelector('.uploadmodal-big--dropdown') : document.querySelector(`.uploadmodal-big--dropdown-${props.indx}`);;


      if (open) {
       
        element.style.height = elHeight.height + 'px';
        element.style.transform = 'translateY(0) translateX(0)';
        element.style.border = '';

        setTimeout(() => {
          element.style.width = elHeight.width + 'px';
          if (props.cat_list) {
            element.children[0].children[0].style.width = elHeight.width + 'px';
          }
          setOpen(false);
        }, 180);
    }}
  }, [genreIsChosen]);

  const updateChildWithProps = React.Children.map(props.children, (child, i) => {
    return React.cloneElement(child, {
      change: props.change,
      setChosen: setGenreIsChosen,
      chosen: genreIsChosen,
      
    })
  });
  
  
  

  useEffect(() => {
    if (props.chosen === "loop") {
      setGenreIsChosen(<span>Loop <Image src={djMixer} alt="" /></span>)
    } else if (props.chosen === "fx") {
      setGenreIsChosen(<span>Effect <Image src={soundwaves} alt="" /></span>
      )
    } else if (props.chosen === "vocal") {
      setGenreIsChosen(<span>Vocals <Image src={popGenre} alt="" /></span>)
    }
  }, [props.chosen]);



  useEffect(() => {
    if (props.isList && !firstOpen) {
      if (props.currentListForm.genre) {
        if (props.currentListForm.soundType === 'fx') {
          setGenreIsChosen(genreFinderFx(props.currentListForm.genre))
          
        } else {
          setGenreIsChosen(genreFinderLoops(props.currentListForm.genre))
        }
      }
      
    } 
  }, [props.isList, props.currentListForm, firstOpen]);

  return (
    <Fragment>

      <li className={`genreDropdown--li ${props.cat_list ? 'categoryDropdown--li' : ''}`}>
        {!open && (
        <a className="genreDropdown--mainEl" href="#" onClick={openUp}>
          {genreIsChosen || mainElement}
        </a>)}
        {open && updateChildWithProps}
      </li>
      


  
    </Fragment>
  )
}

export default DropdownClick
