import React from 'react'
import check from "../../icons/check1.svg";
import { Fragment } from 'react';
import DropItem from '../Dropdown/DropItem';


interface Props {
  curOptions: any,
  setIsBigger?: any,
  optionSelect: any,
  open: any
}

const EffectGenres: React.FC<Props> = ({curOptions, open, setIsBigger, optionSelect}) => { 

    return (
        <Fragment>
                <DropItem
                  optionSelect={optionSelect}
                  option="all-genre"
                  type="genre"
                  setIsBigger={setIsBigger}
                  open={open}
                  curOptions={curOptions}
                  rightIcon={
                    curOptions.genre.all && <img src={check} alt="" />
                  }
                >
                  {" "}
                  <span>All</span>
                </DropItem>
  
                <DropItem
                  optionSelect={optionSelect}
                  option="aggressive"
                  type="genre"
                  setIsBigger={setIsBigger}
                  open={open}
                  curOptions={curOptions}
                  rightIcon={
                    curOptions.genre.aggressive && <img src={check} alt="" />
                  }
                >
                  <span>Aggressive</span>
                </DropItem>
                <DropItem
                  optionSelect={optionSelect}
                  option="calm"
                  type="genre"
                  setIsBigger={setIsBigger}
                  open={open}
                  curOptions={curOptions}
                  rightIcon={
                    curOptions.genre.calm && <img src={check} alt="" />
                  }
                >
                  <span>Calm</span>
                </DropItem>
                <DropItem
                  optionSelect={optionSelect}
                  option="alerts"
                  type="genre"
                  setIsBigger={setIsBigger}
                  open={open}
                  curOptions={curOptions}
                  rightIcon={
                    curOptions.genre.alerts && <img src={check} alt="" />
                  }
                >
                  <span>Alerts</span>
                </DropItem>
                <DropItem
                  optionSelect={optionSelect}
                  option="digital"
                  type="genre"
                  setIsBigger={setIsBigger}
                  open={open}
                  curOptions={curOptions}
                  rightIcon={
                    curOptions.genre.digital && <img src={check} alt="" />
                  }
                >
                  <span>Digital</span>
                </DropItem>
                <DropItem
                  optionSelect={optionSelect}
                  option="nature"
                  type="genre"
                  setIsBigger={setIsBigger}
                  open={open}
                  curOptions={curOptions}
                  rightIcon={
                    curOptions.genre.nature && <img src={check} alt="" />
                  }
                >
                  <span>Nature</span>
                </DropItem>
                <DropItem
                  optionSelect={optionSelect}
                  option="other"
                  type="genre"
                  setIsBigger={setIsBigger}
                  open={open}
                  curOptions={curOptions}
                  rightIcon={
                    curOptions.genre.other && <img src={check} alt="" />
                  }
                >
                  <span>other</span>
                </DropItem>
              </Fragment>
            
    )
}

export default EffectGenres
