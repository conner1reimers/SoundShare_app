import React from 'react'
import { Fragment } from 'react';
import check from "public/check1.svg";
import DropItem from '../Dropdown/DropItem';

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
                    curOptions.type.dark && <img src={check} alt="" />
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
                    curOptions.type.crisp && <img src={check} alt="" />
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
                    curOptions.type.pretty && <img src={check} alt="" />
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
                    curOptions.type.harsh && <img src={check} alt="" />
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
                    curOptions.type.loud && <img src={check} alt="" />
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
                    curOptions.type.unique && <img src={check} alt="" />
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
