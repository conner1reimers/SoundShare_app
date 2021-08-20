import React, { useEffect } from 'react'
import MouseOverLabel from "../../../util/MouseOverLabel";
import more from "/public/search.svg";
import { useForm } from "../../../util/hooks/useForm";
import { VALIDATOR_REQUIRE } from "../../../util/validators";
import { Fragment } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Media from 'react-media';
import { useHttpClient } from '../../../util/hooks/http-hook';
import { saveXtraBrowseOptions } from "../../../store/actions";
import { useGlobalMsg } from '../../../util/hooks/useGlobalMsg';
import { BrowseState } from '../../../store/reducers/browseReducer';
import Input from '../../common_reusable/Input';
import Image from 'next/image';
import { FilterMsg } from './FilterMsg';




const filterVariants = {
    initial: {
      y: "5%",
      x: "-10%",
      scale: 0.5,
      opacity: 0,
    },
    out: {
      y: 0,
      x: "-10%",
      scale: 0,
      opacity: 0,
    },
    in: {
      y: "-30%",
      x: "12vw",
      scale: 1,
      opacity: 1,
    },
  };
  
  const filterTransition = {
    type: "spring",
    mass: 3.5,
    damping: 100,
    stiffness: 1000,
    velocity: 0.01,
  };
  
  const filterVariantsSmall = {
    initial: {
      y: "5%",
      x: "-10%",
      scale: 0.5,
      opacity: 0,
    },
    out: {
      y: 0,
      x: "-10%",
      scale: 0,
      opacity: 0,
    },
    in: {
      y: "0",
      x: "0",
      scale: 1,
      opacity: 1,
    },
  };
  
  const filterVariants2 = {
    initial: {
      y: "5%",
      x: "-10%",
      scale: 0.5,
      opacity: 0,
    },
    out: {
      y: 0,
      x: "-10%",
      scale: 0,
      opacity: 0,
    },
    in: {
      y: "1rem",
      x: "2rem",
      scale: 1,
      opacity: 1,
    },
  };

  interface Props {
    category: any
  }
  
  interface RootStateConst {
    browse: BrowseState
  };

const MoreFilters: React.FC<Props> = ({category}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [xtraOpen, setXtraOpen] = useState<boolean>(false);
    const [orderByOptions, setOrderByOptions] = useState<boolean>(false);
    const [activeOrderbyOption, setActiveOrderbyOption] = useState<string>('title');
    const xtraOptionsState = useSelector((state: RootStateConst) => state.browse.xtraOptions);
    const dispatch = useDispatch();
    const browseState = useSelector((state: RootStateConst) => state.browse);
    const setGlobalMsg = useGlobalMsg();
  
    const openFilters = () => {
      if (!open) {
        setOpen(true);
        if (browseState.mainOpen) {
          dispatch({ type: "CLOSE_MAIN_BROWSE_OPTIONS" });
        }
      } else {
        setOpen(false);
        if (orderByOptions) setOrderByOptions(false);
      }
  
  
    };
  
    const [formState, inputHandler, setData] = useForm(
      {
        keyword: {
          value: "",
          isValid: true,
        },
        author: {
          value: "",
          isValid: true,
        },
        bpm1: {
          value: "",
          isValid: true,
        },
        bpm2: {
          value: "",
          isValid: true,
        },
      },
      true
    );
  
    const clickSpan = (e: any) => {
      e.stopPropagation();
      e.preventDefault();
    };
  
    useEffect(() => {
      if (browseState.mainOpen && (open || xtraOpen)) {
        setXtraOpen(false);
        setOpen(false);
      }
    }, [browseState]);
  
    useEffect(() => {
      if (formState) {
        dispatch(saveXtraBrowseOptions(formState.inputs));
      }
    }, [formState]);
  
    
    const closeMain = (e: any) => {
      e.stopPropagation()
      
      if (orderByOptions) {
        setOrderByOptions(false);
      } else {
        setOpen(false);
        setXtraOpen(false);
      }
    };
  
    const { isLoading, sendRequest } = useHttpClient();
  
    // Add an option to filter ANY of the things the typed or if you want EXACTLY ()
    const refreshBrowse = async (e: any) => {
      e.preventDefault();
      let keyword =
        formState.inputs.keyword.value !== ""
          ? formState.inputs.keyword.value
          : "none";
      let author =
        formState.inputs.author.value !== ""
          ? formState.inputs.author.value
          : "none";
      let bpm1 =
        formState.inputs.bpm1.value !== "" ? formState.inputs.bpm1.value : "none";
      let bpm2 =
        formState.inputs.bpm2.value !== "" ? formState.inputs.bpm2.value : "none";
  
      if (!browseState.lastQuery.text) {
        let res;
        
        try {
          res = await sendRequest(
            `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/users/filtersounds/${category}/${keyword}/${author}/${bpm1}/${bpm2}/${activeOrderbyOption}`
          );
          dispatch({ type: "SEARCH_BROWSE_HOME", results: res });
        } catch (err) {}
      } else {
        let res;
        try {
  
          dispatch({
            type: "FETCH_BROWSE",
            payload: {
              option: "load",
              lastQuery: browseState.lastQuery,
              params: {category: category, keyword, author, bpm1, bpm2, activeOrderbyOption },
              browseType: "filterWquery",
              
            },
          });
  
        } catch (err) {}
      }
    };
  
    
  
    const openOrderBy = () => {
      setOrderByOptions(true);
    }
  
    const selectOrderbyOption = (e: any) => {
      e.stopPropagation();
      e.cancelBubble = true;
  
      setActiveOrderbyOption(e.currentTarget.dataset.option);
      setOrderByOptions(false);
  }
  

    useEffect(() => {
      dispatch({type: "SET_BROWSE_MSG", msg: "Filter sounds"})

    }, [])
    
    return (
      <div onClick={openFilters} className="navtest--nav--more">
        <MouseOverLabel
          label={<button className="btn nohover">More Filters</button>}
          labelClass="user-page--loopList--item--moreBtn--mouse--label"
          classname="user-page--loopList--item--moreBtn--mouse"
        >
          <div className="navtest--nav--more--img">
            <Image height={30} width={30} src={more} alt="" />
          </div>
        </MouseOverLabel>
        
        <Media queries={{
          smaller: "(max-width: 550px)",
          small: "(max-width: 1099px)",
          big: "(min-width: 1100px)",
          }}>
            {matches => (
            <Fragment>
            
            <AnimatePresence exitBeforeEnter>
              {open && (
                <Fragment>
                
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={matches.big ? filterVariants : filterVariantsSmall}
                  transition={filterTransition}
                  className="filter-menu"
                  onClick={clickSpan}
                >
                  <div onClick={clickSpan} className="filter-menu--labels">
                    <span>By Keyword</span>
                    <span>By Author</span>
                    <span>BPM</span>
                    <span className="order-label-browse">Order By</span>
                  </div>
  
                  <div onClick={clickSpan} className="filter-menu--inputs">
                    
                    <form onSubmit={refreshBrowse}>
                      <Input
                        onInput={inputHandler}
                        id="keyword"
                        class="uploadmodal-big--info-form--input filter-menu--inputs--input"
                        element="input"
                        validators={VALIDATOR_REQUIRE()}
                        formControlClass="filter-menu--inputs--input"
                        value={
                          xtraOptionsState
                            ? xtraOptionsState.keyword.value
                            : formState.inputs.keyword.value
                        }
                        type="input"
                      />
                      <Input
                        onInput={inputHandler}
                        id="author"
                        class="uploadmodal-big--info-form--input"
                        element="input"
                        validators={VALIDATOR_REQUIRE()}
                        formControlClass="filter-menu--inputs--input"
                        value={
                          xtraOptionsState
                            ? xtraOptionsState.author.value
                            : formState.inputs.author.value
                        }
                        type="input"
                      />
  
                      <div className="filter-menu--inputs--extra-btn">
                        {/* <button type="button" onClick={openExtra}>
                          SEE OPTIONS
                        </button> */}
  
                        <Input
                          onInput={inputHandler}
                          id="bpm1"
                          class="uploadmodal-big--info-form--input filter-menu--inputs--input"
                          element="input"
                          validators={VALIDATOR_REQUIRE()}
                          formControlClass="filter-menu--inputs--input filter-menu--inputs--input--bpm"
                          label="from"
                          labelClass="filter-menu--extra-options--input--label"
                          value={
                            xtraOptionsState
                              ? xtraOptionsState.bpm1.value
                              : formState.inputs.bpm1.value
                          }
                          type="input"
                        />
                        <Input
                          onInput={inputHandler}
                          id="bpm2"
                          class="uploadmodal-big--info-form--input filter-menu--inputs--input"
                          element="input"
                          validators={VALIDATOR_REQUIRE()}
                          formControlClass="filter-menu--inputs--input filter-menu--inputs--input--bpm filter-menu--inputs--input--bpm--2"
                          label="to"
                          labelClass="filter-menu--extra-options--input--label"
                          value={
                            xtraOptionsState
                              ? xtraOptionsState.bpm2.value
                              : formState.inputs.bpm2.value
                          }
                          type="input"
                        />
                      </div>
  
                      <div className="filter-menu--inputs--extra-btn filter-menu--inputs--orderby">
                        <button type="button" onClick={openOrderBy}>
                          {activeOrderbyOption}
                        </button>
                      </div>
  
  
                      <button
                        type="submit"
                        onClick={refreshBrowse}
                        className="btn-hidden"
                      />
                    </form>
                    
                  </div>
  
                  <div onClick={clickSpan} className="filter-menu--submit">
                    <button type="button" onClick={refreshBrowse}>
                      REFRESH
                    </button>
                  </div>
  
                 
                  <AnimatePresence exitBeforeEnter>
                {orderByOptions && (
                  <div className="orderby-option-contain">
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={filterVariants2}
                    transition={filterTransition}
                    className="filter-menu--extra-options orderby-options"
                  >
                    <ul className="globalList orderby-options--list">
                      <li>
                        <button onClick={selectOrderbyOption} data-option="title" className="btn nohover">Title</button>
                      </li>
        
                      <li>
                        <button onClick={selectOrderbyOption} data-option="downloads" className="btn nohover">Downloads</button>
                      </li>
        
                      <li>
                        <button onClick={selectOrderbyOption} data-option="likes" className="btn nohover">Likes</button>
                      </li>
        
                      <li>
                        <button onClick={selectOrderbyOption} data-option="reposts" className="btn nohover">Reposts</button>
                      </li>
        
                      <li>
                        <button onClick={selectOrderbyOption} data-option="comments" className="btn nohover">Comments</button>
                      </li>
        
                    </ul>
                  </motion.div>
                  </div>)}
                  
                  </AnimatePresence>
                </motion.div>
                
                  </Fragment>
              )}
            </AnimatePresence>
        
            
            </Fragment>)}
        </Media>

        <FilterMsg/>
        {open && <div onClick={closeMain} className="close-filters"></div>}
      </div>
    );
  };

export default MoreFilters
