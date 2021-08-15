import React, {
    useState,
    Fragment
  } from "react";
import { CSSTransition } from "react-transition-group";
import check from "/public/check1.svg";
import EffectGenres from "../DifferentDropdowns/EffectGenres";
import LoopGenres from "../DifferentDropdowns/LoopGenres";
import DropItem from "./DropItem";
import EffectTypes from "../DifferentDropdowns/EffectTypes";
import LoopTypes from "../DifferentDropdowns/LoopTypes";
import Image from 'next/image';
interface Props {
  menuLabel: any,
  curOptions: any,
  setIsBigger?: any,
  open?: boolean,
  optionSelect: any,
  types?: boolean,
  genres?: boolean,
  times?: boolean,
  browseType: string
}


const Dropdown: React.FC<Props> = ({menuLabel, curOptions, setIsBigger, open, optionSelect, types, genres, browseType, times}) => {
    const [activeMenu, setActive] = useState<string>("main");
    const [menuHeight, setMenuHeight] = useState<any>(null);
  
    const calcHeight = (el: any) => {
      const height = el.offsetHeight;
      setMenuHeight(height);
    };
  
  
    return (
      <div
        className="navtest--dropdown"
        style={{
          height: menuHeight,
        }}
      >
        <CSSTransition
          in={activeMenu === "main"}
          unmountOnExit
          onEnter={calcHeight}
          timeout={500}
          classNames="menu-primary"
        >
          <div className="navtest--dropdown--itemContain">
            <h1 className="navtest--dropdown--itemContain--top-btn">
              <span>{menuLabel}</span>
            </h1>
  
            {genres && (
              <Fragment>
                {browseType === "fx" ? (
                    <EffectGenres 
                      optionSelect={optionSelect} 
                      open={open} 
                      curOptions={curOptions}
                      setIsBigger={setIsBigger}
                    
                    />
                ) : (
                    <LoopGenres 
                      optionSelect={optionSelect} 
                      open={open} 
                      curOptions={curOptions}
                      setIsBigger={setIsBigger}
                    />
                ) }
              </Fragment>
            )}
  
            {types && (
              <Fragment>
                 {browseType === "fx" ? (
                    <EffectTypes 
                      optionSelect={optionSelect} 
                      open={open} 
                      curOptions={curOptions}
                      setIsBigger={setIsBigger}
                    />
                ) : (
                    <LoopTypes 
                      optionSelect={optionSelect} 
                      open={open} 
                      curOptions={curOptions}
                      setIsBigger={setIsBigger}

                    />
                ) }
              </Fragment>  
            )}
  
            {times && (
              <Fragment>
                <DropItem
                  optionSelect={optionSelect}
                  option="day"
                  type="time"
                  setIsBigger={setIsBigger}
                  curOptions={curOptions}
                  open={open}
                  rightIcon={
                    curOptions.time.day && <Image src={check} alt="" />
                  }
                >
                  <span>Day</span>
                </DropItem>
                <DropItem
                  optionSelect={optionSelect}
                  option="week"
                  type="time"
                  setIsBigger={setIsBigger}
                  curOptions={curOptions}
                  open={open}
                  rightIcon={
                    curOptions.time.week && <Image src={check} alt="" />
                  }
                >
                  <span>Week</span>
                </DropItem>
                <DropItem
                  optionSelect={optionSelect}
                  option="month"
                  curOptions={curOptions}
                  open={open}
                  type="time"
                  setIsBigger={setIsBigger}
                  rightIcon={
                    curOptions.time.month && <Image src={check} alt="" />
                  }
                >
                  <span>Month</span>
                </DropItem>
                <DropItem
                  optionSelect={optionSelect}
                  option="year"
                  curOptions={curOptions}
                  open={open}
                  type="time"
                  setIsBigger={setIsBigger}
                  rightIcon={
                    curOptions.time.year && <Image src={check} alt="" />
                  }
                >
                  <span>Year</span>
                </DropItem>
                <DropItem
                  optionSelect={optionSelect}
                  option="year"
                  curOptions={curOptions}
                  open={open}
                  type="time"
                  setIsBigger={setIsBigger}
                  rightIcon={
                    curOptions.time.year && <Image src={check} alt="" />
                  }
                >
                  <span>3 Years</span>
                </DropItem>
                <DropItem
                  optionSelect={optionSelect}
                  option="all-time"
                  curOptions={curOptions}
                  open={open}
                  type="time"
                  setIsBigger={setIsBigger}
                  rightIcon={
                    curOptions.time.all && <Image src={check} alt="" />
                  }
                >
                  <span>All-Time</span>
                </DropItem>
  
                <DropItem
                  curOptions={curOptions}
                  open={open}>
                    <span>more</span>
                </DropItem>
              </Fragment>
            )}
          </div>
        </CSSTransition>
  
        <CSSTransition
          in={activeMenu === "more"}
          unmountOnExit
          onEnter={calcHeight}
          timeout={500}
          classNames="menu-secondary"
        >
          <div>
            <DropItem>Main</DropItem>
          </div>

        </CSSTransition>
      </div>
    );
  };
  

export default Dropdown
