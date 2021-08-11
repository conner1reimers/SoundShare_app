import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHttpClient } from '../../../../../../util/hooks/http-hook';
import { useGlobalMsg } from '../../../../../../util/hooks/useGlobalMsg';
import LoadingAnimation from '../../../../../animatedLoaders/LoadingAnimation/LoadingAnimation';


interface Props {
  
}
const SubmitList: React.FC<Props> = () => {
  const soundList = useSelector((state: any) => state.upload.soundList);
  const soundListInfo = useSelector((state: any) => state.upload.soundListInfo);
  const [finalFileList, setFiles] = useState<any>(false);
  const user = useSelector((state: any) => state.user);
  const setGlobalMsg = useGlobalMsg();
  const {isLoading, sendRequest} = useHttpClient();
  const dispatch = useDispatch();

  const submit = async () => {
    
    let isValid: boolean = true;
    let validateData: boolean = true;
      const fileList = soundList.map((el: any, indx: any) => {
      
        const soundData = JSON.stringify({
          name: el.name,
          lastmodified: el.lastModified,
          size: el.size.toString(),
        });
  
        const info = soundListInfo.find((el: any) => el.index === indx);
        const genre = info.genre ? info.genre : 'other';
        const bpm = info.form ? info.form.bpm.value : info.bpm;
        let tags: any;
  
        if (info.tags) {
          if (info.tags.tags.length > 0) {
            tags = info.tags.tags.map((el: any) => el.name).join('zzzz');
          } else {
            tags = [`${info.soundType}`].join('zzzz');
          }
        } else {
          tags = [`${info.soundType}`].join('zzzz');
        }
  
        
  
        if (!info.name) {
          setGlobalMsg('Make all sounds have a name', 'error');
          isValid = false;
        } else if (!bpm) {
          setGlobalMsg(`BPM not set for sound ${info.index + 1}`, 'error');
          isValid = false;
        }
        else {
          return {
            sound: el,
            soundData: soundData,
            info: {
              ...info,
              genre: genre,
              bpm: bpm,
              tags: tags
            }
          }
        }
        
      });

      if (isValid) {
        
      } else {
        setGlobalMsg('One of your files is invalid', 'error');
      }
    try {
        

      fileList.forEach(async (el: any, indx: any) => {
        try {
            let valid = await sendRequest(`${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/soundlist`, 'POST', JSON.stringify({
              name:  el.info.form.name.value,
              description: el.info.form.description.value,
              type: el.info.soundType,
              category: el.info.soundType,
              username: user.userName,
              data: el.soundData,
              creator: user.userId,
              genre: el.info.soundType,
              bpm: parseInt(el.info.bpm)}), { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.token });
              
            if (!valid.result) {
              validateData = false;
            }
          
          } catch (err) {

          }
          

        })
        
        
      
    } catch (err) {
    }

    if (!validateData) {
      setGlobalMsg('Invalid somewhere', 'error')
    } else {
      setFiles(fileList)
    }
    

  }

  const uploadFiles = () => {
    let isValid: boolean = true;
    let finalResult: any;

    finalFileList.forEach(async (el: any) => {
      try {
      
      const soundName = el.info.form.name.value ? el.info.form.name.value : el.info.name ? el.info.name : 'untitled';
      const userName = user.isLoggedIn ? user.userName : 'anonymous'
      const creatorId = user.isLoggedIn ? user.userId : null;
      const genre = el.info.genre ? el.info.genre : 'other';
      const image = el.info.form.image.value ? el.info.form.image.value : null;
      const bpm = el.info.form.bpm.value ? el.info.form.bpm.value : 0;

        let tags;

        if (typeof el.info.tags === "string") {
          tags = el.info.tags

        }
        else {
          if (el.info.tags.length > 0) {
            tags = el.info.tags.map((el: any) => el.name).join('zzzz');
          } else {
            tags = ['sound'].join('zzzz');
          }
        }
     


      const formData = new FormData();
      formData.append('name', soundName);
      formData.append('sound', el.sound);
      formData.append('description', el.info.form.description.value);
      formData.append('type', el.sound.type);
      formData.append('category', el.info.soundType);
      formData.append('data', el.soundData);
      formData.append('username', userName);
      formData.append('creator', creatorId);
      formData.append('genre', genre);
      formData.append('bpm', bpm);
      formData.append('image', image);
      
      finalResult = await sendRequest(`${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/upload/${tags}`, 'POST', formData, { 'Authorization': 'Bearer ' + user.token });
      setTimeout(() => {
        if (finalResult) {
          setGlobalMsg('Sounds uploaded!', 'success')
        }
        
      }, 1000);  
      } catch (err) {
        isValid = false;

       }
      
      if (isValid) {
        dispatch({type: 'CLOSE_RESET_UPLOAD_MODAL'});
        dispatch({type: 'CLOSE_MODAL'});
      }

      
    })
    
  }

  useEffect(() => {
    if (finalFileList) {
      uploadFiles();
    }
  }, [finalFileList])


  return (
    <Fragment>
      <LoadingAnimation loading={isLoading}/>
    <div onClick={submit} className="upload-list-submit-contain">
        <div>
          <span>Submit</span>
        </div>
      </div>
      </Fragment>
  )
}

export default SubmitList
