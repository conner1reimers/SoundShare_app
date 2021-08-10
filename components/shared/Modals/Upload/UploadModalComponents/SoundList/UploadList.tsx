import React, { Fragment, useEffect, useReducer, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../../../../common_reusable/Input'
import { analyze, guess } from 'web-audio-beat-detector';
import { Buffer } from 'tone'
import CategoryOption from './CategoryOption'

import ResetButton from '../Reusable/ResetButton'
import FullUploadForm from '../Reusable/FullUploadForm'
import { save1soundList, setUploadList1Name, setUploadListInfo } from '../../../../../../store/actions/uploadActions'
import { getCurrentListForm } from '../../../../../../store/selectors'
import { useGlobalMsg } from '../../../../../../util/hooks/useGlobalMsg'
import SubmitList from './SubmitList'
import { useForm } from '../../../../../../util/hooks/useForm';
import { VALIDATOR_MAXLENGTH } from '../../../../../../util/validators';
import BallLoader from '../../../../../animatedLoaders/BallLoader/BallLoader';

interface Props {
  list: any,
  reset: any
}

const pageStateReducer = (state: any, action: any) => {
  switch (action.type) {
      case 'toList': 
          return {
            list: true,
            details: false,
            fx: false,
            currIndex: -1,
            notFirstLoad: false

          };
      case 'toDetails': 
          return {
              list: false,
              details: true,
              fx: false,
              currIndex: action.indx,
              notFirstLoad: false
            
          };
      case 'toFx': 

        return {
            ...state,
            list: false,
            details: false,
            fx: true,
            notFirstLoad: false
           
          };
      
          
      default:
          return state;
  }
};


const UploadList: React.FC<Props> = ({list, reset}) => {
  
  const [pageState, dispatch] = useReducer(pageStateReducer, {
    list: true,
    details: false,
    fx: false,
    currIndex: -1,
    notFirstLoad: true

  });

  const reduxDispatch = useDispatch();
  const [soundToEdit, setSoundToEdit] = useState<any>(false);

  const goToFx = () => {
    dispatch({ type: "toFx" });
  }

  const goToList = () => {
    dispatch({ type: "toList" });
    reduxDispatch(save1soundList(pageState.currIndex));
  }

  const goToDetails = (id: any, sound: any) => {
    setSoundToEdit(sound)
    dispatch({ type: "toDetails", indx: id });
  }
  
  

  return (
    <Fragment>

      {pageState.list && !pageState.details && !pageState.fx && (
        <div className={`uploadmodal-big--form upload-sound-list ${list.length > 6 ? 'upload-sound-list--long' : ''}`}>
          <div className="list-reset-holder">
            <ResetButton click={reset}/>
          </div>
          

          {list && <ul>
            {list.map((el: any, indx: number) => {
              return <UploadItem reset={reset} notFirstLoad={pageState.notFirstLoad} element={el} key={el.path} indx={indx} goToDetails={goToDetails}/>
            })}
          </ul>}

          <SubmitList/>

        </div>)}

      {!pageState.list && pageState.details && !pageState.fx && soundToEdit && (
        <FullUploadForm isList sound={soundToEdit} resetUpload={goToList} goToFx={goToFx} curListIndex={pageState.currIndex}/>
      )}
    </Fragment>
  )
}


interface ItemProps {
  element: any,
  indx: number,
  goToDetails: any,
  notFirstLoad: boolean,
  reset: void
}

const UploadItem: React.FC<ItemProps> = ({ element, indx, goToDetails, notFirstLoad, reset }) => {
  const dispatch = useDispatch();
  const [loading, setLoadin] = useState<any>(notFirstLoad);
  const list = useSelector((state: any) => state.upload.soundList);
  const soundListInfo = useSelector((state: any) => state.upload.soundListInfo);
  const currentListForm = getCurrentListForm(soundListInfo, indx)
  const setGlobalMsg = useGlobalMsg();

  const [formState, inputHandler] = useForm({
    name: {
      value: '',
      isValid: false
    }
  }, false);

  const getBpm = (buff: any) => {
    guess(buff)
        .then(({ bpm }) => {
            return bpm;
        })
        .catch((err) => {
            return
      });
  }

  
  
  useEffect(() => {
    if ((element && list && list.length !== soundListInfo.length)) {
      let AudioContext = window.AudioContext;
      let context = new AudioContext();
      const fileReaderBuff: any = new FileReader();
      let buffer: any;
      
  
      fileReaderBuff.onload = () => {
        context.decodeAudioData(fileReaderBuff.result,
            (buff: any) => {
              buffer = new Buffer(buff);
              let soundType: any;


              if (buff.duration > 180) {
                setGlobalMsg('One of the sounds you uploaded were more than 3 minutes, which is the max', 'error')
              }
              else if (buff.duration > 4) {
                soundType = 'loop';
              } else {
                soundType = 'fx';
              }
              
              const bpm: any = getBpm(buff);
              dispatch(setUploadListInfo(indx, element.name, bpm, soundType, buffer.duration));
              setLoadin(false);

              
            }, (err) => {});
      };
      
      fileReaderBuff.readAsArrayBuffer(element);
    }
    
    

  }, [dispatch, element])

  const blur = () => {
    dispatch(setUploadList1Name(formState.inputs.name.value, indx))
  }

  const EditSoundDetails = () => {
    goToDetails(indx, element);
  }

  
  return (
    <Fragment>

      

      {loading && <div className="upload-list-loader">
        <BallLoader loading={loading}/>
      </div>}
    
    {element && !loading && <li className="upload-list-list-el">
      
      <div className="upload-list-numbers">
        <span>{indx+1}</span>
      </div>
      <Input
        class="uploadmodal-big--info-form--input"
        onInput={inputHandler}
        label="Name (Required)"
        validators={VALIDATOR_MAXLENGTH(60)}
        element="input"
        id="name"
        max={60}
        value={currentListForm.form ? currentListForm.form.name.value : currentListForm.name ? currentListForm.name : formState.inputs.name.value }
        labelClass="uploadmodal-big--info-form--input--label--name"
        formControlClass="uploadmodal-big--info-form--input--formcontrol uploadmodal-big--info-form--input--formcontrol--name"
        focusCap
        loseFocus={blur}
      />
      
        {currentListForm && <CategoryOption soundType={currentListForm.soundType} duration={currentListForm.duration} indx={indx}/>}
      
      <div onClick={EditSoundDetails} className="upload-list-edit-options-box">
        <div>
          <span>Edit details</span>
        </div>
          
        </div>
        
      </li>}
    </Fragment>
    


  )
}

export default UploadList
