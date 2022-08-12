import React, { useRef, useState, useEffect, Fragment, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUploadSound, setUploadBuffer } from '../../store/actions';
import { Buffer } from 'tone';
import musicDownload from '../../public/music-downloads.svg';
import {useDropzone} from 'react-dropzone'
// import { analyze, guess } from 'web-audio-beat-detector';
import {useGlobalMsg} from '../../util/hooks/useGlobalMsg'
import CloseUpload from '../shared/Modals/Upload/CloseUpload';
import Image from 'next/image';

interface Props {
    onInput: any,
    id: any,
    center?: any,
    errorText?: any,
    open?: boolean
}

const SoundUpload: React.FC<Props> = ({onInput, id, center, errorText, open}) => {
    const [file, setFile] = useState<any>();
    const [isValid, setIsValid] = useState<any>(false);
    const setErrMsg = useGlobalMsg();
    


    const onDrop = useCallback((acceptedFiles: any) => {
        let pickedFile: any;
        let fileIsValid = isValid;
        
        if (acceptedFiles && acceptedFiles.length === 1) {
            pickedFile = acceptedFiles[0];
            
            if (pickedFile.type === "audio/mp3" || pickedFile.type === "audio/wav" || pickedFile.type === "audio/x-mp3" || pickedFile.type === "audio/x-wav" || pickedFile.type === "audio/mpeg") {
                setFile(pickedFile);
                setIsValid(true);
                fileIsValid = true;
                onInput(id, pickedFile, fileIsValid);
            } else {
                setErrMsg('Only accepts Mp3/WAV files', 'error');
                setIsValid(false);
                fileIsValid = false;
            }
        } else if (acceptedFiles && acceptedFiles.length > 1 && acceptedFiles.length <= 10) {
            let i = 1;
            let fileArray: Array<any> = [];
            acceptedFiles.forEach((element: any) => {
                
                if (element.type === "audio/mp3" || element.type === "audio/wav" || element.type === "audio/x-mp3" || element.type === "audio/x-wav" || element.type === "audio/mpeg") {
                    fileArray = [...fileArray, element];
                    if (i === acceptedFiles.length) {
                        setIsValid(true);
                        fileIsValid = true;
                        onInput(id, fileArray, fileIsValid);
                        setFile(fileArray);
                        
                    }
                    i++;
                } else {
                    setErrMsg('Only accepts Mp3/WAV files', 'error');
                    setIsValid(false);
                    fileIsValid = false;
                }
                
            });
        }
        else {
            setIsValid(false);
            fileIsValid = false;
            setErrMsg('this is not work', 'error');
        }
    }, [isValid])

    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    const filePickerRef = useRef<any>();
    const dispatch = useDispatch();

    // const getBpm = (buff: any) => {
    //     guess(buff)
    //         .then(({ bpm }) => {
    //             dispatch({type: 'FOUND_BPM', bpm: bpm});
    //             onInput('bpm', bpm.toString(), true);

    //         })
    //         .catch((err) => {
    //             return
    //         });
    // }

    let AudioContext = window.AudioContext;
    let context = new AudioContext(); // Make it crossbrowser    


  

    useEffect(() => {
        if (!file) {
            return;
        } else if (!file.length) {
            
            const fileReader: any = new FileReader();
            const fileReaderBuff: any = new FileReader();
    
            fileReader.onload = () => {
                dispatch(setUploadSound(fileReader.result))
                
            };
           
                
            fileReaderBuff.onload = () => {
                context.decodeAudioData(fileReaderBuff.result,
                    (buff) => {
                        // getBpm(buff)
                        dispatch(setUploadBuffer(new Buffer(buff)))
                    }, (err) => {
                        setErrMsg(err)
                    });
            };
            
            fileReader.readAsDataURL(file);
            fileReaderBuff.readAsArrayBuffer(file);
        } else if (file.length > 1) {
            dispatch({ type: "SET_UPLOAD_SOUND_LIST", list: file })
        }
        
    }, [file]);

    const pickedHandler = (event: any) => {
        // GENERATE SOMETHING THAT HELPS US PREVIEW THAT PICKED FILE
        // ALSO FORWARDS THE FILE TO THE SURROUNDING COMPONENT WHERE WE USE THE 
        // IMAGE UPLOAD COMPONENT IN

        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } 
        else {
            setIsValid(false);
            fileIsValid = false;
        }
        onInput(id, pickedFile, fileIsValid);
    }

    

    return (
    <Fragment>
        <CloseUpload upload/>
        {open && <div className="form-control choose-sound-btn-contain" {...getRootProps()}>

            <input 
                type="file" 
                ref={filePickerRef}
                id={id} 
                style={{display: 'none'}} 
                accept=".mp3,.wav"
                onChange={pickedHandler} 
                {...getInputProps()}
            />
            <div className={`sound-upload ${center && 'center'}`}>
                <div className="sound-upload--img">
                    <Image height={80} width={80} src={musicDownload} alt=""/>
                </div>

                <div className="sound-upload--desc">
                    <span className="drag-text">Drag and drop sound files to upload</span> <br/>
                    <span>Your sounds can be used by other people once you publish them.</span>
                </div>

                <button className="btn nohover upload-sound-button" type="button"><span className="btnspan">Pick Sound</span></button>
            </div>
            {!isValid && <p>{errorText}</p>}
        </div>}
    </Fragment>
    )
}

export default React.memo(SoundUpload)
