import { motion } from 'framer-motion';
import React, { Fragment, useState } from 'react'
import Media from 'react-media';
import pop from '../../../../../../util/img/tag.svg';
import pop2 from '../../../../../../util/img/price-tag.svg';
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


interface XtraDropProps {
  inputHandler: any,
  setXtraOptions: any
}

const XtraDropdowns: React.FC<XtraDropProps> = React.memo(({setXtraOptions, inputHandler}) => {
  const clickHandler = (event: any, options: any) => {
    event.preventDefault();
    event.stopPropagation();
    setXtraOptions((prevState: any) => {
      inputHandler('xtraOptions', [...prevState, options], true)
      return [...prevState, options];
    });
    
  };


  const clickHandlerRemove = (event: any, options: any) => {
      event.preventDefault();
      event.stopPropagation();
      setXtraOptions((prevState: any) => {
        const filtered = prevState.filter((el: any) => {
          return el !== options
        })
        inputHandler('xtraOptions', filtered, true);
        return filtered;
        
      });
      
  };
  
  interface DropProps{
    option: any,
    rightIcon: any,
    leftIcon: any,
    children: any
  }


  const DropItem: React.FC<DropProps> = ({option, rightIcon, leftIcon, children}) => {
    const [active, setActive] = useState<any>(false);

    return (
      <motion.div 
        initial="initial"
        animate="in"
        exit="out"
        variants={dropdownVariants}
        transition={dropdownTransition}
        className={`xtraOption-dropdown--item ${active && 'xtraOption-dropdown--item--active'}`}
        onClick={(event: any) => {
          if (!active) {
            setActive(true);
            clickHandler(event, option);
          } else {
            setActive(false);
            clickHandlerRemove(event, option);
          }
          }}>

            {children}

            {rightIcon && active && rightIcon}
            {leftIcon && !active && leftIcon}
      </motion.div>
    )
  }
  return (
    <Fragment>
      <Media queries={{
      smallest: "(max-width: 825px)",
      small: "(max-width: 1830px) and (min-width: 771px)",
      big: "(min-width: 1829px)"
      }}>
        {matches => (
            <Fragment>

        {matches.smallest && (
            <Fragment>
            <div className="xtraOption-dropdown--li--main--col">

              <DropItem
                rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="loop"
              >
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>

                <span className="unstretch">Loop</span>
              </DropItem>

              <DropItem rightIcon={<Image className="unstretch" src={pop} alt=""/>} leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="synth">
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>
                <span className="unstretch">Synth</span>
              </DropItem>

              <DropItem
                rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="trap"
              >
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>

                <span className="unstretch">Trap</span>
              </DropItem>

              <DropItem rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                        leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                    option="lofi">
                    <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                      <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                    </div>
                    <span className="unstretch">Lofi</span>
                </DropItem>

                <DropItem
                rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="dark"
              >
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>

                <span className="unstretch">Dark</span>
              </DropItem>
              
              <DropItem rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                        leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                        option="strings">
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>
              <span className="unstretch">Strings</span>
              </DropItem>

              

            

              <DropItem
                rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="acappella"
              >
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>

                <span className="unstretch">Acappella</span>
              </DropItem>

              <DropItem rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                        leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="sample">
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>
              <span className="unstretch">Sample</span>
              </DropItem>

              <DropItem
                rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="pluck"
              >
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>

                <span className="unstretch">Pluck</span>
              </DropItem>

              <DropItem rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                        leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="bells">
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>
              <span className="unstretch">Bells</span>
              </DropItem>

              <DropItem
                rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="electronic"
              >
                  <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                    <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                  </div>
                  <span className="unstretch">Electronic</span>
              </DropItem>
              <DropItem rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                        leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="loop"> 
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                    <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>
                <span className="unstretch">Synth</span>
              </DropItem>
              </div>

            </Fragment>) }


            {matches.small && (
            <Fragment>
            <div className="xtraOption-dropdown--li--main--col">

              <DropItem
                rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="loop"
              >
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>

                <span className="unstretch">Loop</span>
              </DropItem>

              <DropItem rightIcon={<Image className="unstretch" src={pop} alt=""/>} leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="synth">
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>
                <span className="unstretch">Synth</span>
              </DropItem>

              <DropItem
                rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="trap"
              >
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>

                <span className="unstretch">Trap</span>
              </DropItem>

              <DropItem rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                        leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                    option="lofi">
                    <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                      <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                    </div>
                    <span className="unstretch">Lofi</span>
                </DropItem>

                <DropItem
                rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="dark"
              >
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>

                <span className="unstretch">Dark</span>
              </DropItem>
              
              <DropItem rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                        leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                        option="strings">
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>
              <span className="unstretch">Strings</span>
              </DropItem>

              </div>

              <div className="xtraOption-dropdown--li--main--col">

              <DropItem
                rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="acappella"
              >
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>

                <span className="unstretch">Acappella</span>
              </DropItem>

              <DropItem rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                        leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="sample">
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>
              <span className="unstretch">Sample</span>
              </DropItem>

              <DropItem
                rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="pluck"
              >
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>

                <span className="unstretch">Pluck</span>
              </DropItem>

              <DropItem rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                        leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="bells">
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>
              <span className="unstretch">Bells</span>
              </DropItem>

              <DropItem
                rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="electronic"
              >
                  <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                    <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                  </div>
                  <span className="unstretch">Electronic</span>
              </DropItem>
              <DropItem rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                        leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="loop"> 
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                    <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>
                <span className="unstretch">Synth</span>
              </DropItem>
              </div>

            </Fragment>) }

            {matches.big && (
            <Fragment>
            <div className="xtraOption-dropdown--li--main--col">

              <DropItem
                rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="loop"
              >
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>

                <span className="unstretch">Loop</span>
              </DropItem>
              
              <DropItem rightIcon={<Image className="unstretch" src={pop} alt=""/>} leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="synth">
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>
                <span className="unstretch">Synth</span>
              </DropItem>

              <DropItem
                rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="trap"
              >
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>

                <span className="unstretch">Trap</span>
              </DropItem>
              
              <DropItem rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                        leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                    option="lofi">
                    <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                      <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                    </div>
                    <span className="unstretch">Lofi</span>
                </DropItem>

            </div>
            
            <div className="xtraOption-dropdown--li--main--col">

              <DropItem
                rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="acappella"
              >
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>

                <span className="unstretch">Acappella</span>
              </DropItem>
              
              <DropItem rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                        leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="sample">
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>
              <span className="unstretch">Sample</span>
              </DropItem>

              <DropItem
                rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="pluck"
              >
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>

                <span className="unstretch">Pluck</span>
              </DropItem>
              
              <DropItem rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                        leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="bells">
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>
              <span className="unstretch">Bells</span>
              </DropItem>

            </div>

            <div className="xtraOption-dropdown--li--main--col">
              <DropItem
                rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="electronic"
              >
                  <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                    <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                  </div>
                  <span className="unstretch">Electronic</span>
              </DropItem>
              <DropItem rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                        leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="loop"> 
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                    <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>
                <span className="unstretch">Synth</span>
              </DropItem>

              <DropItem
                rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                option="dark"
              >
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>

                <span className="unstretch">Dark</span>
              </DropItem>
              
              <DropItem rightIcon={<Image className="unstretch" src={pop} alt=""/>}
                        leftIcon={<Image className="unstretch" src={pop2} alt=""/>}
                        option="strings">
                <div className="uploadmodal-big--fxpage--box--fxMenu--preset-page--item--checkbox check checkbox-upload">
                  <div className="checkbox-contain-upload"> <div className="inner-dot"></div> </div>
                </div>
              <span className="unstretch">Strings</span>
              </DropItem>
            </div>
            
              </Fragment>)}

        </Fragment>)} 
      
      </Media>
    </Fragment>
  )
})

XtraDropdowns.displayName = "Xtradrop";

export default XtraDropdowns
