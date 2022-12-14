import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHttpClient } from '../../../util/hooks/http-hook'
import { useForm } from '../../../util/hooks/useForm'
import { UserState } from "../../../store/reducers/user/user";
import BallLoader from '../../animatedLoaders/BallLoader/BallLoader'
import ImageUpload from '../../global/ImageUpload'
import EditImgModal from '../../shared/Modals/EditImgModal'
import Image from 'next/image'
import { SoundState } from '../../../store/reducers/sounds/soundPageReducer'
import music from "../../../public/loop-background.svg";


interface Root {
user: UserState
  singleSound: SoundState
}

const optionsVariants = {
    initial: {
        y: "-5%",
        rotate: '-2deg',
        scale: 0.5,
        opacity: 0,
    },
    out: {

        y: 0,
        scale: 0,
        rotate: '-20deg',
        opacity: 0

    },
    in: {
        y: " 0%",
        scale: 1,
        rotate: '0deg',
        opacity: 1


    }
}

const optionsTransition = {
    type: 'spring',
    mass: 3.5,
    damping: 100,
    stiffness: 1000,
    velocity: .01
    
}

interface Props {
    setEditMode: any,
    open: any,

}


const EditImage: React.FC<Props> = ({setEditMode, open}) =>  {
    const [editSoundState, inputHandler] = useForm({
        image: {
            value: '',
            isValid: false
        } 
    }, false);
    const {isLoading, sendRequest} = useHttpClient();

    const sid = useSelector((state: Root) => state.singleSound.sound.id);
    const oldpath = useSelector((state: Root) => state.singleSound.sound.img_path);
    const uid = useSelector((state: Root) => state.user.userId);
    const token = useSelector((state: Root) => state.user.token);
    const dispatch = useDispatch();

    const closeMode = () => {
        setEditMode(null);
    }

    const submitEditImage = async (e: any) => {
        e.preventDefault();
        let response: any;
        
        if (editSoundState.inputs.image.value) {
            const newoldpath: string = oldpath ? oldpath : 'none';
            const formData = new FormData();

            formData.append('image', editSoundState.inputs.image.value);
            
            try {
                response = await sendRequest(`/sounds/changeimage/${sid}/${uid}/${newoldpath}`, 
                'POST', 
                formData,
                { "Authorization": "Bearer "+token})

                dispatch({type: "SINGLESOUND_CHANGE_IMG", payload: response.path})
                closeMode();
            } catch (err) {}
        }

    }
    const [imgPreview, setImgPreview] = useState<any>(null);

    const passImgPrev = (passed: any) => {
        setImgPreview(passed)
    }

    const closeModal = () => {
        setEditMode(null)
    }
    return (
    <EditImgModal closeModal={closeModal} open={open}>
        <AnimatePresence exitBeforeEnter>
            
            <div className="ball-loader-singlesound-desc">
                <BallLoader loading={isLoading}/>
            </div>
            
            {open && (
            <motion.div 
                initial="initial"
                animate="in"
                exit="out"
                key="edit-desc"
                variants={optionsVariants}
                transition={optionsTransition}
                className="single-sound--info--desc single-edit-img"
            >
                <form onSubmit={submitEditImage}>
                    <div className="single-edit-img--upload">
                        {imgPreview ? (
                            <div className="single-edit-img--upload--prev">
                                <Image height={50} width={50} src={imgPreview} alt=""/>
                            </div>
                        ) : (
                            <div className="single-edit-img--upload--prev">
                                <Image height={50} width={50} 
                                    src={
                                    oldpath ? `https://soundshare-bucket.s3.us-east-2.amazonaws.com/${oldpath}` : music} 
                                    alt="x"
                                />
                                
                            </div>)}
                        <ImageUpload
                            pass={passImgPrev}
                            errorText="Sorry, that image was rejected"
                            onInput={inputHandler}
                            singlesound
                            
                        />
                    </div>

                    
                        <div className="edit-btn-container-single">
                            <div className="edit-btn-container-single--btn">
                                <button type="submit" onClick={submitEditImage} className="btn nohover edit-btn-btn">SUBMIT</button>
                            </div>
                            <div className="edit-btn-container-single--btn">
                                <button onClick={closeMode} type="button" className="btn nohover edit-btn-btn">CANCEL</button>
                            </div>
                        </div>
                    


                </form>
            </motion.div>)}
        </AnimatePresence>
    </EditImgModal>)
}

export default EditImage
