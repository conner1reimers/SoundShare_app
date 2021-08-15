import React from 'react'
import { Fragment } from 'react';
import check from "/public/check1.svg";
import DropItem from '../Dropdown/DropItem';
import Image from 'next/image';

interface Props {
  curOptions: any,
  setIsBigger?: any,
  optionSelect: any,
  open: any
}


const EffectTypes: React.FC<Props> = ({curOptions, open, setIsBigger, optionSelect}) => {
    
    return (
            <Fragment>
                <DropItem
                  optionSelect={optionSelect}
                  setIsBigger={setIsBigger}
                  open={open}
                  curOptions={curOptions}
                  option="dark"
                  type="type"
                  rightIcon={
                    curOptions.type.dark && <Image src={check} alt="" />
                  }
                >
                  <span>Dark</span>
                </DropItem>
  
                <DropItem
                  optionSelect={optionSelect}
                  open={open}
                  curOptions={curOptions}
                  option="crisp"
                  type="type"
                  setIsBigger={setIsBigger}
                  rightIcon={
                    curOptions.type.crisp && <Image src={check} alt="" />
                  }
                >
                  <span>Crisp</span>
                </DropItem>
  
                <DropItem
                  optionSelect={optionSelect}
                  open={open}
                  curOptions={curOptions}
                  option="pretty"
                  type="type"
                  setIsBigger={setIsBigger}
                  rightIcon={
                    curOptions.type.pretty && <Image src={check} alt="" />
                  }
                >
                  <span>Pretty</span>
                </DropItem>
  
                <DropItem
                  optionSelect={optionSelect}
                  open={open}
                  curOptions={curOptions}
                  option="harsh"
                  type="type"
                  setIsBigger={setIsBigger}
                  rightIcon={
                    curOptions.type.harsh && <Image src={check} alt="" />
                  }
                >
                  <span>Harsh</span>
                </DropItem>
  
                <DropItem
                  optionSelect={optionSelect}
                  open={open}
                  curOptions={curOptions}
                  option="loud"
                  type="type"
                  setIsBigger={setIsBigger}
                  rightIcon={
                    curOptions.type.loud && <Image src={check} alt="" />
                  }
                >
                  <span>Loud</span>
                </DropItem>
  
                <DropItem
                  optionSelect={optionSelect}
                  open={open}
                  curOptions={curOptions}
                  option="unique"
                  type="type"
                  setIsBigger={setIsBigger}
                  rightIcon={
                    curOptions.type.unique && <Image src={check} alt="" />
                  }
                >
                  <span>Unique</span>
                </DropItem>
  
                <DropItem>
                  <span>more</span>
                </DropItem>
              </Fragment>
            
    )
}

export default EffectTypes
