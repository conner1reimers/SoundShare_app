import React from 'react'
import { Fragment } from 'react'
import ReactDOM from 'react-dom';
import Backdrop from '../../../Backdrop';
import game_controller from '../../../../util/img/game-controller.svg';
import microphone from '../../../../util/img/microphone.svg';
import headphones from '../../../../util/img/headphones.svg';
import { useDispatch } from 'react-redux';
import { useGlobalMsg } from '../../../../util/hooks/useGlobalMsg';
import { useEffect } from 'react';
import { useHttpClient } from '../../../../util/hooks/http-hook';
import { setModalClosed, setModalOpen } from '../../../../store/actions';
import close from '../../../../util/img/close.svg';
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

    
    const cancelHandler = () => {
        setOpen(false);
        dispatch(setModalClosed());
    }

    const searchSounds = async (category: any) => {
        let res;
        
        try {
        res = await sendRequest(`${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/users/searchsounds/${category}/${searchTxt.value}`);
        dispatch({ type: "SEARCH_BROWSE_HOME", results: res });
        } catch (err) {}
    }

    const goToLoops = (e: any) => {
        e.preventDefault();
        cancelHandler();
        if (search) {
            searchSounds('loops');
        }
        if (mobile) {
            dispatch({type: "CLOSE_SIDE_DRAWER"});
        }
        history.push('/browseloops');
    }

    const goToEffects = (e: any) => {
        e.preventDefault();
        cancelHandler();
        if (search) {
            searchSounds('fx');
        }
        if (mobile) {
            dispatch({type: "CLOSE_SIDE_DRAWER"});
        }
        history.push('/browsefx');

    }

    const goToVocals = (e: any) => {
        e.preventDefault();
        cancelHandler();
        if (search) {
            searchSounds('vocal');
        }
        if (mobile) {
            dispatch({type: "CLOSE_SIDE_DRAWER"});
        }
        history.push('/browsevocal');

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
            {open && (
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
                                        <Image src={close} alt="" />
                                    </div>
                                
                                </div>
                            </Media>

                        

                            <div className="browse-modal--inner-window">

                                <div className="browse-modal--inner-window--box" onClick={goToEffects}>
                                    <div className="browse-modal-image-container">
                                        <Image src={game_controller} alt="" />
                                    </div>

                                    <span className="browse-modal-category-name">
                                        Sound Effects / Game Sounds
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

                </Fragment>)}
        </Fragment>, document.getElementById('modal-hook') as HTMLElement) : null;

    return finalEl;
}

export default BrowseOptionModal
