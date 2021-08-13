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
                  curOptions.type.loops && <img src={check} alt="" />
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
                  curOptions.type.acapella && <img src={check} alt="" />
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
                  curOptions.type.samples && <img src={check} alt="" />
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
                  curOptions.type.synth && <img src={check} alt="" />
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
                  curOptions.type.guitar && <img src={check} alt="" />
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

export default LoopTypes
