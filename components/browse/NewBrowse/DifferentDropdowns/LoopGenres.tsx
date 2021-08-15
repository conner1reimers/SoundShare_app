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

const LoopGenres: React.FC<Props> = ({curOptions, open, setIsBigger, optionSelect}) => {
    
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
                  curOptions.genre.all && <Image src={check} alt="" />
                }
              >
                {" "}
                <span>All</span>
              </DropItem>

              <DropItem
                optionSelect={optionSelect}
                option="hip"
                type="genre"
                setIsBigger={setIsBigger}
                open={open}
                curOptions={curOptions}
                rightIcon={
                  curOptions.genre.hip && <Image src={check} alt="" />
                }
              >
                <span>Hip-Hop</span>
              </DropItem>
              <DropItem
                optionSelect={optionSelect}
                option="rock"
                type="genre"
                setIsBigger={setIsBigger}
                open={open}
                curOptions={curOptions}
                rightIcon={
                  curOptions.genre.rock && <Image src={check} alt="" />
                }
              >
                <span>Rock</span>
              </DropItem>
              <DropItem
                optionSelect={optionSelect}
                option="rnb"
                type="genre"
                setIsBigger={setIsBigger}
                open={open}
                curOptions={curOptions}
                rightIcon={
                  curOptions.genre.rnb && <Image src={check} alt="" />
                }
              >
                <span>Rnb</span>
              </DropItem>
              <DropItem
                optionSelect={optionSelect}
                option="elect"
                type="genre"
                setIsBigger={setIsBigger}
                open={open}
                curOptions={curOptions}
                rightIcon={
                  curOptions.genre.elect && <Image src={check} alt="" />
                }
              >
                <span>Electronic</span>
              </DropItem>
              <DropItem
                optionSelect={optionSelect}
                option="pop"
                type="genre"
                setIsBigger={setIsBigger}
                open={open}
                curOptions={curOptions}
                rightIcon={
                  curOptions.genre.pop && <Image src={check} alt="" />
                }
              >
                <span>Pop</span>
              </DropItem>
              <DropItem
                optionSelect={optionSelect}
                option="other"
                type="genre"
                setIsBigger={setIsBigger}
                open={open}
                curOptions={curOptions}
                rightIcon={
                  curOptions.genre.other && <Image src={check} alt="" />
                }
              >
                <span>other</span>
              </DropItem>
            </Fragment>
         
    )
}

export default LoopGenres
