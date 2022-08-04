import React from 'react'
import check from "/public/check1.svg";
import { Fragment } from 'react';
import DropItem from '../Dropdown/DropItem';
import Image from 'next/image';


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
                    curOptions.genre.all && <Image height={20} width={20} src={check} alt="" />
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
                    curOptions.genre.aggressive && <Image height={20} width={20} src={check} alt="" />
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
                    curOptions.genre.calm && <Image height={20} width={20} src={check} alt="" />
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
                    curOptions.genre.alerts && <Image height={20} width={20} src={check} alt="" />
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
                    curOptions.genre.digital && <Image height={20} width={20} src={check} alt="" />
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
                    curOptions.genre.nature && <Image height={20} width={20} src={check} alt="" />
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
                    curOptions.genre.other && <Image height={20} width={20} src={check} alt="" />
                  }
                >
                  <span>other</span>
                </DropItem>
              </Fragment>
            
    )
}

export default EffectGenres
