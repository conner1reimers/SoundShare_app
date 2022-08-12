import React, { useRef, useState, useEffect, Fragment } from 'react';


interface Props {
    onInput: any,
    pass: any,
    singlesound?: any,
    errorText: any
}

const ImageUpload: React.FC<Props> = ({onInput, pass, singlesound, errorText}) => {
    const [file, setFile] = useState<any>();
    const [previewUrl, setPreviewUrl] = useState<any>();
    const [isValid, setIsValid] = useState<boolean>(true);

    const filePickerRef = useRef<any>();


    const pickedHandler = (event: any) => {
        let fileIsValid = isValid;
        let pickedFile;

        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            fileIsValid = false;
            setIsValid(false);
        }
        onInput('image', pickedFile, true)
    }

    const pickImgHandler = () => {
        filePickerRef.current.click();
    }


    useEffect(() => {
        if (!file) {
            return
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
            pass(fileReader.result);
        }
        fileReader.readAsDataURL(file);
        
    }, [file]);
    
    return (
        <div>
            <input
                type="file"
                ref={filePickerRef}
                id="imgPicker"
                style={{display: 'none'}} 
                accept=".jpeg,.png,.jpg,.svg,.gif"
                onChange={pickedHandler} 
            />
            {!singlesound ? <button type="button" onClick={pickImgHandler} className="uploadmodal-big--info-form--input--imgUpload--btn">Choose an image</button>
            : 
            <div className="singlesound-imgupload">
                <button type="button" onClick={pickImgHandler} className="uploadmodal-big--info-form--input--imgUpload--btn btn nohover upload-sound-button">Choose an image</button>
            </div>}
            {!isValid && <p>{errorText}</p>}
        </div>
    )
}

export default ImageUpload
