import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import game_controller from '../../../../../public/game-controller.svg';
import microphone from '../../../../../public/microphone.svg';
import headphones from '../../../../../public/headphones.svg';
import { useGlobalMsg } from '../../../../../util/hooks/useGlobalMsg';
import Image from 'next/image';


const CategoryPage: React.FC = () => {
    const dispatch = useDispatch();
    const sound = useSelector((state: any) => state.upload.buffer);
    const setGlobalMsg = useGlobalMsg();

    
    const chooseCategory = (e: any) => {
        e.preventDefault();
        const category = e.target.dataset.option;

        if (sound) {
            if (category === 'loops') {
                if (sound.duration > 180) {
                    setGlobalMsg('Loops and samples must be less than 3 minutes long', 'error')
                } else {
                    dispatch({type: "SET_CATEGORY", cat: category});
                }
            } else if (category === 'fx') {
                if (sound.duration > 7) {
                    setGlobalMsg('This type of sound must be 7 seconds or shorter', 'error')
                } else {
                    dispatch({type: "SET_CATEGORY", cat: category});
                }
            } else if (category === 'vocal') {
                if (sound.duration > 180) {
                    setGlobalMsg('vocals must be 3 minutes or shorter', 'error')
                } else {
                    dispatch({type: "SET_CATEGORY", cat: category});
                }
            }
            

        }
        

    }
    

    useEffect(() => {
        setGlobalMsg('What kind of sound are you uploading?', 'question', 3500);
    }, []);


    return (
        <div className="upload-category-page">
            <div className="browse-modal--inner-window">

                <div className="browse-modal--inner-window--box" onClick={chooseCategory} data-option="fx">
                    <div className="browse-modal-image-container">
                        <Image src={game_controller} alt=""/>
                    </div>

                    <span className="browse-modal-category-name">
                        Sound Effects / Game Sounds
                    </span>

                    

                    <div className="browse-modal-underline"></div>

                    <div className="browse-modal-text-contain">
                        <span>
                            Upload short sounds, sound effects, or various sounds to be used in video games,
                            music, movies and more.
                        </span>
                    </div>

                </div>
                <div className="browse-modal--inner-window--box" onClick={chooseCategory} data-option="loops">
                    <div className="browse-modal-image-container">
                        <Image src={headphones} alt=""/>
                    </div>

                    <span className="browse-modal-category-name">
                        Music Loops / Samples 
                    </span>

                    <div className="browse-modal-underline"></div>

                    <div className="browse-modal-text-contain">
                        <span>
                            Upload full instrumental loops or music samples to be used in any music or audio creation.
                        </span>
                    </div>


                </div>
                <div className="browse-modal--inner-window--box" onClick={chooseCategory} data-option="vocal">

                    <div className="browse-modal-image-container">
                        <Image src={microphone} alt=""/>
                    </div>

                    <span className="browse-modal-category-name">
                        Vocals
                    </span>

                    <div className="browse-modal-underline"></div>

                    <div className="browse-modal-text-contain">
                        <span>
                            Upload raw vocals / accepellas from artists to put over an instrumental, or for any other reason.
                        </span>
                    </div>
                </div>

                </div>

        </div>
    )
}

export default CategoryPage
