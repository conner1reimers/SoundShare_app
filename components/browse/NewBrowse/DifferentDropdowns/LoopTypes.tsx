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


const LoopTypes: React.FC<Props> = ({curOptions, open, setIsBigger, optionSelect}) => {
    return (
        <Fragment>
              <DropItem
                optionSelect={optionSelect}
                option="loops"
                type="type"
                open={open}
                curOptions={curOptions}
                setIsBigger={setIsBigger}
                rightIcon={
                  curOptions.type.loops && <Image height={20} width={20} src={check} alt="" />
                }
              >
                <span>Loops</span>
              </DropItem>

              <DropItem
                optionSelect={optionSelect}
                option="acapella"
                type="type"
                open={open}
                curOptions={curOptions}
                setIsBigger={setIsBigger}
                rightIcon={
                  curOptions.type.acapella && <Image height={20} width={20} src={check} alt="" />
                }
              >
                <span>Accapella</span>
              </DropItem>

              <DropItem
                optionSelect={optionSelect}
                option="samples"
                type="type"
                open={open}
                curOptions={curOptions}
                setIsBigger={setIsBigger}
                rightIcon={
                  curOptions.type.samples && <Image height={20} width={20} src={check} alt="" />
                }
              >
                <span>Samples</span>
              </DropItem>

              <DropItem
                optionSelect={optionSelect}
                option="synth"
                type="type"
                open={open}
                curOptions={curOptions}
                setIsBigger={setIsBigger}
                rightIcon={
                  curOptions.type.synth && <Image height={20} width={20} src={check} alt="" />
                }
              >
                <span>Synth</span>
              </DropItem>

              <DropItem
                optionSelect={optionSelect}
                option="guitar"
                type="type"
                open={open}
                curOptions={curOptions}
                setIsBigger={setIsBigger}
                rightIcon={
                  curOptions.type.guitar && <Image height={20} width={20} src={check} alt="" />
                }
              >
                <span>Guitar</span>
              </DropItem>

              <DropItem
                optionSelect={optionSelect}
                option="unique"
                type="type"
                open={open}
                curOptions={curOptions}
                setIsBigger={setIsBigger}
                rightIcon={
                  curOptions.type.unique && <Image height={20} width={20} src={check} alt="" />
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

export default LoopTypes
