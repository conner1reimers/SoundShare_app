import React from 'react'
import { Fragment } from 'react'
import ReactDOM from 'react-dom';
import Backdrop from '../../../Backdrop';
import game_controller from '../../../../public/game-controller.svg';
import microphone from '../../../../public/microphone.svg';
import headphones from '../../../../public/headphones.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useGlobalMsg } from '../../../../util/hooks/useGlobalMsg';
import { useEffect } from 'react';
import { useHttpClient } from '../../../../util/hooks/http-hook';
import { setModalClosed, setModalOpen } from '../../../../store/actions';
import close from '../../../../public/close.svg';
import Media from 'react-media';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface Props {
    setOpen?: any,
    searchTxt?: any,
    mobile?: any,
    search?: any,
    open?: any
}
const BrowseOptionModal: React.FC<Props> = ({setOpen, searchTxt, mobile, search, open}) => {
    const history = useRouter();
    const dispatch = useDispatch();
    const { sendRequest } = useHttpClient();
    const browseModalOpen = useSelector((state: any) => state.browse.modalOpen);

    
    const cancelHandler = () => {
        setOpen(false);
        dispatch(setModalClosed());
        dispatch({ type: "SET_BROWSE_MODAL_CLOSED" });

    }

    const searchSounds = async (category: any) => {
        let res;
        try {
        dispatch({type: "MAIN_LOADER_START"});

        res = await sendRequest(`${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/users/searchsounds/${category}/${searchTxt.value}`);
            dispatch({ type: "SEARCH_BROWSE_HOME", results: res });
            dispatch({type: "MAIN_LOADER_FINISH"})
            
        } catch (err) {
            
        }
    }

    const goToLoops = (e: any) => {
        e.preventDefault();
        if (history.pathname !== '/browseloops') {
            dispatch({ type: "MAIN_LOADER_START" });
            if (search) {
                searchSounds('loops');
            }
            history.push('/browseloops');

        }

        
        if (mobile) {
            dispatch({type: "CLOSE_SIDE_DRAWER"});
        }
        cancelHandler();

    }

    const goToEffects = (e: any) => {
        e.preventDefault();

        if (history.pathname !== '/browsefx') {
            dispatch({ type: "MAIN_LOADER_START" });
            if (search) {
                searchSounds('fx');
            }
            history.push('/browsefx');
            
        }


        cancelHandler();
        
        if (mobile) {
            dispatch({type: "CLOSE_SIDE_DRAWER"});
        }

    }

    const goToVocals = (e: any) => {
        e.preventDefault();
        
        if (history.pathname !== '/browsevocal') {
            dispatch({ type: "MAIN_LOADER_START" });
            if (search) {
                searchSounds('vocal');
            }
            history.push('/browsevocal');

        }

        cancelHandler();
        
        if (mobile) {
            dispatch({type: "CLOSE_SIDE_DRAWER"});
        }

    }

    const setGlobalMsg = useGlobalMsg();

    useEffect(() => {
        if (open) {
            dispatch(setModalOpen());
            setGlobalMsg('What kind of sound are you looking for?', 'question');
        }
    }, [open]);

    const finalEl = process.browser ? ReactDOM.createPortal(
        
                <Fragment>
                    <div className={`browse-modal ${mobile ? 'mobile-browse-options' : ''}`}>

                        <div className="browse-modal--windows">

                            {/* <div className="browse-modal--head">
                            <h1>
                                What kind of sounds are you looking for?
                            </h1>
                        </div> */}

                            <Media query="(max-width: 1099px)">
                                <div className="auth-modal-close-contain browse-modal-close">
                                    <div onClick={cancelHandler}>
                                        <Image height={25} width={25} src={close} alt="" />
                                    </div>
                                
                                </div>
                            </Media>

                        

                            <div className="browse-modal--inner-window">

                                <div className="browse-modal--inner-window--box" onClick={goToEffects}>
                                    <div className="browse-modal-image-container">
                                        <Image src={game_controller} alt="" />
                                    </div>

                                    <span className="browse-modal-category-name">
                                            Short Sounds / Sound Effects
                                    </span>

                                

                                    <div className="browse-modal-underline"></div>

                                    <div className="browse-modal-text-contain">
                                        <span>
                                            Looking for short sounds, sound effects, or various sounds to be used in video games,
                                            music, movies and more? Look here.
                                        </span>
                                    </div>

                                </div>
                                <div className="browse-modal--inner-window--box" onClick={goToLoops}>
                                    <div className="browse-modal-image-container">
                                        <Image src={headphones} alt="" />
                                    </div>

                                    <span className="browse-modal-category-name">
                                        Music Loops / Samples
                                    </span>

                                    <div className="browse-modal-underline"></div>

                                    <div className="browse-modal-text-contain">
                                        <span>
                                            Looking for full instrumental loops or music samples from various producers and creators?
                                            Look here.
                                        </span>
                                    </div>


                                </div>
                                <div className="browse-modal--inner-window--box" onClick={goToVocals}>

                                    <div className="browse-modal-image-container">
                                        <Image src={microphone} alt="" />
                                    </div>

                                    <span className="browse-modal-category-name">
                                        Vocals
                                    </span>

                                    <div className="browse-modal-underline"></div>

                                    <div className="browse-modal-text-contain">
                                        <span>
                                            Looking for raw vocals / accepellas from artists to put over an instrumental, or for any other reason?
                                            Look here.
                                        </span>
                                    </div>
                                </div>

                            </div>

                        

                        </div>

                    </div>

                    <Backdrop onClick={cancelHandler} />

                </Fragment>, document.getElementById('modal-hook') as HTMLElement) : null;

    return <Fragment>
        {(open || browseModalOpen) && finalEl}
        </Fragment>
}

export default BrowseOptionModal
