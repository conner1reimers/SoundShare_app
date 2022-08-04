import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactTags from 'react-tag-autocomplete'
import AudioElement from '../AudioElement'
import DropdownBar from '../ChooseGenre/DropdownBar'
import DropdownClick from '../ChooseGenre/DropdownClick'
import GenreDropdown from '../ChooseGenre/GenreDropdown'
import NavItem from '../ExtraDropdown/NavItem'
import XtraDropdowns from '../ExtraDropdown/XtraDropdowns'
import XtraOptionDropdown from '../ExtraDropdown/XtraOptionDropdown'
import SubmitUpload from '../SubmitUpload'
import ResetButton from './ResetButton'
import noImg from '../../../../../../public/newErr.svg';
import Image from 'next/image'
import { saveUploadForm, setUploadSound } from '../../../../../../store/actions'
import { CLOSE_MODAL } from '../../../../../../store/actions/actionTypes'
import { changeListSingleGenre, changeListSingleTags } from '../../../../../../store/actions/uploadActions'
import { getCurrentListForm } from '../../../../../../store/selectors'
import { useHttpClient } from '../../../../../../util/hooks/http-hook'
import { useForm } from '../../../../../../util/hooks/useForm'
import { useGlobalMsg } from '../../../../../../util/hooks/useGlobalMsg'
import { VALIDATOR_MAXLENGTH } from '../../../../../../util/validators'
import LoadingAnimation from '../../../../../animatedLoaders/LoadingAnimation/LoadingAnimation'
import PlayPauseBtns from '../../../../../common_reusable/playPauseBtn/PlayPauseBtns'
import ImageUpload from '../../../../../ImageUpload'
import Input from '../../../../../common_reusable/Input'
import UploadSubmit from '../UploadSubmit'

const tagClasses = {
  root: 'upload-tags uploadmodal-big--info-form--input--tags',
  rootFocused: 'upload-tags--focused',
  selected: 'upload-tags--selected',
  selectedTag: 'upload-tags--selected-tag',
  selectedTagName: 'upload-tags--selected-tag-name',
  search: 'upload-tags--search',
  searchWrapper: 'inputclass upload-tags--search--wrapper',
  searchInput: 'upload-tags--input',
  suggestions: 'upload-tags--suggestions',
  suggestionActive: 'upload-tags--is-active',
  suggestionDisabled: 'upload-tags--is-disabled'
};

interface Props {
  goToFx: any,
  resetUpload: any,
  sound: any,
  isList?: boolean,
  curListIndex?: number
}

const FullUploadForm: React.FC<Props> = ({goToFx, resetUpload, sound, isList, curListIndex}) => {
  const {isLoading, sendRequest} = useHttpClient();
  const reduxDispatch = useDispatch();
  const soundToUpload = useSelector((state: any) => state.upload);
  const user = useSelector((state: any) => state.user)
  const gpuTier = useSelector((state: any) => state.ui.gpuTier);
  const [genreChosen, setGenreChosen] = useState<any>(null);
  const [xtraOptions, setXtraOptions] = useState<any>([]);
  const tagRef = useRef<any>(null);
  const [msgShown, setMsgShown] = useState<any>(false);
  const [imgPreview, setImgPreview] = useState<any>(null);
  const [listLoader, setlistLoader] = useState<any>(false);
  const currentListForm = useSelector((state: any) => getCurrentListForm(state.upload.soundListInfo, curListIndex))
  

  const setGlobalMsg = useGlobalMsg();

  const [formState, inputHandler, setData] = useForm({
    name: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: true
    },
    image: {
      value: null,
      isValid: true
    },
    bpm: {
      value: null,
      isValid: true
    },
    xtraOptions: {
      value: [],
      isValid: true
    }
    
  }, false);

  const [tagState, setTagState] = useState<any>({
    tags: [
      
    ]
  });



  useEffect(() => {
    if (gpuTier && gpuTier.isMobile && !msgShown) {
      setGlobalMsg('Audio preview may have issues on mobile (try visiting FX menu and coming back)', 'error', 3500);
      setMsgShown(true);
    }
  }, [gpuTier, msgShown, setGlobalMsg]);


  useEffect(() => {
    if (isList && genreChosen) {
      reduxDispatch(changeListSingleGenre(genreChosen, curListIndex));
    }
  }, [isList, genreChosen, reduxDispatch, curListIndex])



  const submitSound = async (event: any) => {
    event.preventDefault();

    if (formState.inputs) {
      if (formState.inputs.name.value != '') {
          const soundName = formState.inputs.name.value ? formState.inputs.name.value : 'untitled';
          const userName = user.isLoggedIn ? user.userName : 'anonymous'
          const creatorId = user.isLoggedIn ? user.userId : null;
          const genre = genreChosen ? genreChosen : 'other';
          const image = formState.inputs.image.value ? formState.inputs.image.value : null;
          const bpm = formState.inputs.bpm.value ? formState.inputs.bpm.value : 0;
        
         try {
          
          

            let tags;
            if (tagState.tags.length > 0) {
              tags = tagState.tags.map((el: any) => el.name).join('zzzz');
            } else if (formState.inputs.xtraOptions.value.length && formState.inputs.xtraOptions.value.length > 0) {
              tags = 'zzzz';
            } else {
              tags = ['sound'].join('zzzz');
            }
  
  
            const soundData = JSON.stringify({
              name: sound.name,
              lastmodified: sound.lastModified,
              size: sound.size.toString(),
            });
  
  
  
            const formData = new FormData();
            formData.append('name', soundName);
            formData.append('sound', sound);
            formData.append('description', formState.inputs.description.value);
            formData.append('type', sound.type);
            formData.append('category', soundToUpload.category);
            formData.append('data', soundData);
            formData.append('username', userName);
            formData.append('creator', creatorId);
            formData.append('genre', genre);
            formData.append('bpm', bpm);
            formData.append('xtra', formState.inputs.xtraOptions.value);
            formData.append('image', image);
            
            await sendRequest(`${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/upload/${tags}`, 'POST', formData, { 'Authorization': 'Bearer ' + user.token });
            
            setData(
              {
                inputs: {
                  name: {
                    value: '',
                    isValid: false
                  },
                  description: {
                    value: '',
                    isValid: true
                  },
                  image: {
                    value: null,
                    isValid: true
                  },
                  bpm: {
                    value: null,
                    isValid: true
                  },
                  xtraOptions: {
                    value: [],
                    isValid: true
                  }
                  
                }, isValid: false});
            reduxDispatch({type: 'CLOSE_RESET_UPLOAD_MODAL'});
            reduxDispatch({type: CLOSE_MODAL});
            
  
         } catch (err) {}
        
      } else {
        setGlobalMsg('Please title your sound', 'error')
        
      }
    }
        
    

  }
    
  const passImgPrev = (prev: any) => {
      setImgPreview(prev)
  }

  useEffect(() => {
    if (soundToUpload.foundBpm) {
      inputHandler('bpm', soundToUpload.foundBpm, true)
    }
  }, [soundToUpload.foundBpm, inputHandler]);




  useEffect(() => {
    if (!isList) {
      if (soundToUpload.form && !soundToUpload.hasFx) {
        setData(soundToUpload.form);
        
      } else if (soundToUpload.form && soundToUpload.hasFx) {
        setData({
          inputs: {
            ...soundToUpload.form.inputs,
            sound: {
              value: soundToUpload.fxBuff,
              isValid: true
            }
          },
          isValid: true
        });
        if (soundToUpload.imgPrev) {
          setImgPreview(soundToUpload.imgPrev);
          
        }
        
      }
    } else {
      if (!currentListForm.form) {
        if (currentListForm.tags) {
          setTagState(currentListForm.tags)
        }
        setData({
          inputs: {
            ...formState.inputs,
            name: {
              value: currentListForm.name,
              isValid: true
            },
            bpm: {
              value: currentListForm.bpm,
              isValid: true
            }
          },
          isValid: true
        });


      }
      else if (currentListForm.name !== currentListForm.form.name) {
        if (currentListForm.tags) {
          setTagState(currentListForm.tags)
        }
        setData({
          inputs: {
            ...currentListForm.form,
            name: {
              value: currentListForm.name,
              isValid: true
            }
            
          },
          isValid: true
        });

        if (currentListForm.form.image.value) {
          const fileReader = new FileReader();
          fileReader.onload = () => {
              setImgPreview(fileReader.result);
              
          }
          fileReader.readAsDataURL(currentListForm.form.image.value);
        }
      } else {
        if (currentListForm.tags) {
          setTagState(currentListForm.tags)
        }
        setData({
          inputs: {
            ...currentListForm.form
          },
          isValid: true
        })
        if (currentListForm.form.image.value) {
          const fileReader = new FileReader();
          fileReader.onload = () => {
              setImgPreview(fileReader.result);
              
          }
          fileReader.readAsDataURL(currentListForm.form.image.value);
        }


      }
    }
      
    }, []);


  const onAddTags = (tag: any) => {
    if (tagState.tags.length <= 6) {
      
      if (tag.name.length <= 25) {
        const tags = [].concat(tagState.tags, tag);
        setTagState({ tags });
        
        if (isList) {
          reduxDispatch(changeListSingleTags({tags}, curListIndex));
        }

        
      } else {
        setGlobalMsg('MAX 25 CHARACTER PER TAG', 'error');
      }
      
    } else {
      setGlobalMsg('MAX 6 TAGS', 'error');
    }
    
  }

  const onDeleteTags = (i: any) => {
    const tags: any = tagState.tags.slice(0);
    tags.splice(i, 1);
    setTagState({ tags });
    if (isList) {
      reduxDispatch(changeListSingleTags({tags}, curListIndex));
    }
  };



  useEffect(() => {
    
    if (!sound) {
      if (soundToUpload.form && !soundToUpload.hasFx) {
          
        setData(soundToUpload.form);
        if (soundToUpload.imgPrev) setImgPreview(soundToUpload.imgPrev);

      } else if (soundToUpload.form && soundToUpload.hasFx) {
        

        setData({
          inputs: {
            ...soundToUpload.form.inputs,
            sound: {
              value: soundToUpload.fxBuff,
              isValid: true
            }
          },
          isValid: true
        });

        if (soundToUpload.imgPrev) setImgPreview(soundToUpload.imgPrev);
          
      }
    }
  }, [sound]);


  useEffect(() => {
    if (imgPreview) {
      reduxDispatch(saveUploadForm(formState, imgPreview))
    }
  }, [imgPreview])



  useEffect(() => {
    
    if (!soundToUpload.form) {
      if ((formState.inputs.name.value) || (formState.inputs.description.value)
        || (formState.inputs.image.value)) {
        if (imgPreview) {
          reduxDispatch(saveUploadForm(formState, imgPreview));
        } else {
          reduxDispatch(saveUploadForm(formState, soundToUpload.imgPrev))
        }
      };
    } else if (((soundToUpload.form.inputs.name.value !== formState.inputs.name.value) && formState.inputs.name.value)
      || ((soundToUpload.form.inputs.description.value !== formState.inputs.description.value) && formState.inputs.description.value)
      || ((soundToUpload.imgPrev !== formState.inputs.image.value) && formState.inputs.image.value)
      || ((soundToUpload.form.inputs.bpm.value !== formState.inputs.bpm.value) && formState.inputs.bpm.value)) {
      if (imgPreview) {
        reduxDispatch(saveUploadForm(formState, imgPreview));
      } else {
        reduxDispatch(saveUploadForm(formState, soundToUpload.imgPrev));
        if (soundToUpload.imgPrev) {
          setImgPreview(soundToUpload.imgPrev)
        }
      }
      
    }
   
  }, [formState]);

  useEffect(() => {
    
    if (isList) {
      
      setlistLoader(true);
      const fileReader: any = new FileReader();


      fileReader.onload = () => {
        reduxDispatch(setUploadSound(fileReader.result));
        setlistLoader(false)
      };

      fileReader.readAsDataURL(sound);
    }

  }, [isList, sound, reduxDispatch]);

  

  
  return (
    <Fragment>
      {(isLoading || listLoader) && <LoadingAnimation loading={isLoading || listLoader }/>}
       
      
      

      <ResetButton click={resetUpload}/>
        

        
      <form 
              className="uploadmodal-big--info-form" 
              onSubmit={submitSound} 
          >
              <Input 
                class="uploadmodal-big--info-form--input"
                onInput={inputHandler}
                label="Name (Required)"
                validators={VALIDATOR_MAXLENGTH(60)}
                element="input"
                id="name"
                max={60}
                value={soundToUpload.form ? soundToUpload.form.inputs.name.value : formState.inputs.name.value}
                labelClass="uploadmodal-big--info-form--input--label--name"
                formControlClass="uploadmodal-big--info-form--input--formcontrol uploadmodal-big--info-form--input--formcontrol--name"
                focusCap
              />
              <Input 
              class="uploadmodal-big--info-form--input"
              onInput={inputHandler}
              label="Description (Optional)"
              validators={VALIDATOR_MAXLENGTH(320)}
              element="text"
              id="description"
              max={320}
              value={soundToUpload.form ? soundToUpload.form.inputs.description.value : formState.inputs.description.value}
              labelClass="uploadmodal-big--info-form--input--label--desc"
              formControlClass="uploadmodal-big--info-form--input--formcontrol uploadmodal-big--info-form--input--formcontrol--desc"
              focusCap
              />
            {soundToUpload.category !== 'fx' && (
              <Input 
                class="uploadmodal-big--info-form--input"
                onInput={inputHandler}
                label="BPM (Optional)"
                validators={VALIDATOR_MAXLENGTH(3)}
                element="input"
                id="bpm"
                value={soundToUpload.form ? soundToUpload.form.inputs.bpm.value : soundToUpload.foundBpm}
                labelClass="uploadmodal-big--info-form--input--label--name"
                formControlClass="uploadmodal-big--info-form--input--formcontrol uploadmodal-big--info-form--input--formcontrol--bpm"
                focusCap
              />)
            }
            
            <div className="uploadmodal-big--info-form--input--side">
                <div
                  className="uploadmodal-big--preview"
                >
                  <div className="uploadmodal-big--info-form--input--side--contain">

                     
                        <AudioElement/>

                        <div className="upload-playerbtns">
                          <PlayPauseBtns small/>
                        </div>
                    
                    
                  </div>
                </div>
              </div>

            <div className="uploadmodal-big--info-form--input--imgUpload">
                <h1 className="headings">Thumbnail for sound (optional)</h1>
                <p>Optional choice to add a picture for your sound, users 
                  will be able to see the image when they see or listen to your upload</p>
                <ImageUpload
                  pass={passImgPrev}
                  errorText="Sorry, that image was rejected"
                  onInput={inputHandler}
                />
            </div>

            <div className="uploadmodal-big--info-form--input--imgUpload--preview">
                <div className="uploadmodal-big--info-form--input--imgUpload--preview--contain">
                  {imgPreview ? (
                  <div className="uploadmodal-big--info-form--input--imgUpload--preview--contain-container">
                    <Image height={200} width={200} className="uploadimg-prev" src={imgPreview} alt=""/>
                  </div>) : (
                    <div className="uploadmodal-big--info-form--input--imgUpload--preview--contain-container"> 
                      <Image height={200} width={200} className="uploadimg-prev" src={noImg} alt=""/>
                    </div>)}
                </div>
            </div>
                  
              <ReactTags
                ref={tagRef}
                tags={tagState.tags}
                onAddition={onAddTags}
                onDelete={onDeleteTags}
                allowNew
                delimiters={['Enter', '13']}
                classNames={tagClasses}
              />

              <DropdownBar>
                <DropdownClick isList={isList} currentListForm={currentListForm}>
                    <GenreDropdown isList={isList} listCategory={currentListForm ? currentListForm.soundType : null} setGenre={setGenreChosen}/>
                </DropdownClick>
              </DropdownBar>
                  
              {gpuTier && !gpuTier.isMobile && soundToUpload.category === 'loops' && (
                <div className="uploadmodal-big--info-form--input--imgUpload3">
                  <h1 className="headings">More options for sound (optional)</h1>
                  <p>Optional choice to add more information to your upload, which would make it easier for users 
                    to find when browsing for sounds/loops. Click the button below to check off some options that is relevent to this upload.</p>
                    <XtraOptionDropdown>
                      <NavItem>
                        <XtraDropdowns inputHandler={inputHandler} setXtraOptions={setXtraOptions}/>
                        </NavItem>
                    </XtraOptionDropdown>
                </div>)}
      </form>

      {!isList && <UploadSubmit isMobile={gpuTier.isMobile} goToFx={goToFx} submitSound={submitSound}/>}
              
      </Fragment>
  )
}

export default FullUploadForm;
