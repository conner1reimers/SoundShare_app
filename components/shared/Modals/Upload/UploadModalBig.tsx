import React, { useState, useEffect, Fragment, useReducer, useRef, useCallback } from 'react'
import { useForm } from '../../../../util/hooks/useForm';
import { useHttpClient } from '../../../../util/hooks/http-hook';
import FXpage from './FXpage';
import { useSelector, useDispatch } from 'react-redux';
import { pauseFx, saveUploadForm } from '../../../../store/actions';
import { useGlobalMsg } from '../../../../util/hooks/useGlobalMsg';
import { CLOSE_MODAL } from '../../../../store/actions/actionTypes';
import CategoryPage from './UploadModalComponents/CategoryPage';
import UploadList from './UploadModalComponents/SoundList/UploadList';
import FullUploadForm from './UploadModalComponents/Reusable/FullUploadForm';
import LoadingAnimation from '../../../animatedLoaders/LoadingAnimation/LoadingAnimation';
import SoundUpload from '../../../SoundUpload';

const pageStateReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'goToFirst': 

            return {
                firstPage: true,
                secondPage: false,
                fxPage: false,
                categoryPage: false,
                soundList: false
            };
        case 'goToSecond': 

            return {
                firstPage: false,
                secondPage: true,
                fxPage: false,
                categoryPage: false,
                soundList: false
            };
        case 'goToFx': 

            return {
                firstPage: false,
                secondPage: false,
                fxPage: true,
                categoryPage: false,
                soundList: false
            };
        case 'goToCategory':
          return {
            firstPage: false,
            secondPage: false,
            fxPage: false,
            categoryPage: true,
            soundList: false
          };
        case 'goToList':
          return {
            firstPage: false,
            secondPage: false,
            fxPage: false,
            categoryPage: false,
            soundList: true
          };
            
        default:
            return state;
    }
};


interface Props {
  setBackdropVisibility: any,
  soundPreview?: any
}
const UploadModalBig: React.FC<Props> = ({setBackdropVisibility, soundPreview}) => {
    const {isLoading, sendRequest} = useHttpClient();
    const reduxDispatch = useDispatch();
    const soundToUpload = useSelector((state: any) => state.upload);
    const user = useSelector((state: any) => state.user)
    const fxOpen = useSelector((state: any) => state.upload.fxState.fxpageOpen);
    const gpuTier = useSelector((state: any) => state.ui.gpuTier);
    const [genreChosen, setGenreChosen] = useState<any>(null);
    const [xtraOptions, setXtraOptions] = useState<any>([]);
    const [msgShown, setMsgShown] = useState<any>(false);
    const [imgPreview, setImgPreview] = useState<any>(null);
  

    const setGlobalMsg = useGlobalMsg();
    
    
    const [formState, inputHandler, setData] = useForm({
        sound: {
          value: null,
          isValid: false
        },
        name: {
          value: '',
          isValid: false
        },
        description: {
          value: '',
          isValid: true
        },
        date: {
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
          
        ],
        suggestions: [
          
        ]
      });


    const [pageState, dispatch] = useReducer(pageStateReducer, {
          firstPage: fxOpen ? false : true,
          secondPage: false,
          fxPage: fxOpen,
          categoryPage: false,
          soundList: false

    });

    const saveFx = () => {
        dispatch({type: 'goToSecond'});
        reduxDispatch({type: "CLOSE_FX"});
    }


    useEffect(() => {
      if (gpuTier && gpuTier.isMobile && pageState.secondPage && !msgShown) {
        setGlobalMsg('Audio preview may have issues on mobile (try visiting FX menu and coming back)', 'error', 3500);
        setMsgShown(true);
      }
    }, [gpuTier, pageState.secondPage, msgShown, setGlobalMsg]);
  
    useEffect(() => {
      if (soundToUpload && soundToUpload.soundList) {
        dispatch({ type: "goToList" });
      }
    }, [soundToUpload.soundList])

    const submitSound = async (event: any) => {
          event.preventDefault();
          
          try {
            const soundName = formState.inputs.name.value ? formState.inputs.name.value : 'untitled';
            const userName = user.isLoggedIn ? user.userName : 'anonymous'
            const creatorId = user.isLoggedIn ? user.userId : null;
            const genre = genreChosen ? genreChosen : 'other';
            const image = formState.inputs.image.value ? formState.inputs.image.value : null;
            const bpm = formState.inputs.bpm.value ? formState.inputs.bpm.value : 0;

            let tags;
            if (tagState.tags.length > 0) {
              tags = tagState.tags.map((el: any) => el.name).join('zzzz');
            } else if (formState.inputs.xtraOptions.value.length && formState.inputs.xtraOptions.value.length > 0) {
              tags = 'zzzz';
            } else {
              tags = ['sound'].join('zzzz');
            }


            const soundData = JSON.stringify({
              name: formState.inputs.sound.value.name,
              lastmodified: formState.inputs.sound.value.lastModified,
              size: formState.inputs.sound.value.size.toString(),
            });


  
            const formData = new FormData();
            formData.append('name', soundName);
            formData.append('sound', formState.inputs.sound.value);
            formData.append('description', formState.inputs.description.value);
            formData.append('type', formState.inputs.sound.value.type);
            formData.append('category', soundToUpload.category);
            formData.append('data', soundData);
            formData.append('username', userName);
            formData.append('creator', creatorId);
            formData.append('genre', genre);
            formData.append('bpm', bpm);
            formData.append('xtra', formState.inputs.xtraOptions.value);
            formData.append('image', image);

            await sendRequest(`/sounds/${tags}`, 'POST', formData, {'Authorization': 'Bearer '+user.token});
            setData(
              {
                inputs: {
                  sound: {
                    value: null,
                    isValid: false
                  },
                  name: {
                    value: '',
                    isValid: false
                  },
                  description: {
                    value: '',
                    isValid: true
                  },
                  date: {
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
  
    }

    useEffect(() => {
        if(soundToUpload.uploadSound && !pageState.fxPage && !pageState.soundList) {
          dispatch({type: 'goToCategory'});
        }
      }, [soundToUpload.uploadSound]);


    useEffect(() => {
      if(soundToUpload.category && !pageState.fxPage) {
        dispatch({type: 'goToSecond'});
      }
    }, [soundToUpload.category])

      
    const passImgPrev = (prev: any) => {
        setImgPreview(prev)
    }

    useEffect(() => {
      if (soundToUpload.foundBpm) {
        inputHandler('bpm', soundToUpload.foundBpm, true)
      }
    }, [soundToUpload.foundBpm]);



    useEffect(() => {
      if (pageState.fxPage) {
        setBackdropVisibility(false);
        

      } else if (!pageState.fxPage) {
        setBackdropVisibility(true);   
        
      }
    }, [pageState.fxPage]);
    
    const goToFx = () => {
      reduxDispatch(saveUploadForm(formState, imgPreview));
      dispatch({type: "goToFx"});
      reduxDispatch({type: "OPEN_FX"});
    }

    const resetSecondPage = () => {
      reduxDispatch(pauseFx());
      setTimeout(() => {
        dispatch({type: 'goToSecond'});
        reduxDispatch({type: "CLOSE_FX"});
      }, 250);
    }

    useEffect(() => {
      if (pageState.secondPage && soundToUpload.form && !soundToUpload.hasFx) {
        setData(soundToUpload.form);
        
      } else if (pageState.secondPage && soundToUpload.form && soundToUpload.hasFx) {
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
    }, [pageState.secondPage]);


    const onAddTags = (tag: any) => {
      if (tagState.tags.length <= 6) {
        
        if (tag.name.length <= 25) {
          const tags = [].concat(tagState.tags, tag);
          setTagState({ tags });

          
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
      setTagState({tags});
    };

    const resetUploadModal = useCallback(() => {
      reduxDispatch({type: "RESET_UPLOAD_MODAL"});
      dispatch({type: "goToFirst"});
    }, []);

    useEffect(() => {
      if (formState && !formState.inputs.sound.value) {
        if (pageState.secondPage && soundToUpload.form && !soundToUpload.hasFx) {
            
          setData(soundToUpload.form);
          if (soundToUpload.imgPrev) setImgPreview(soundToUpload.imgPrev);

        } else if (pageState.secondPage && soundToUpload.form && soundToUpload.hasFx) {
          

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
    }, []);


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
      || ((soundToUpload.imgPrev !== formState.inputs.image.value) && formState.inputs.image.value)) {
        if (imgPreview) {
          reduxDispatch(saveUploadForm(formState, imgPreview));
        } else {
          reduxDispatch(saveUploadForm(formState, soundToUpload.imgPrev));
          if (soundToUpload.imgPrev) {
            setImgPreview(soundToUpload.imgPrev)
          }
        } 
        
    }
    }, [formState])

    

    return (
        <div className="uploadmodal-big">

          {isLoading && <LoadingAnimation loading={isLoading}/>}

                    {pageState.categoryPage && !pageState.firstPage && !pageState.FxPage && !pageState.soundList && (
                      <CategoryPage reset={resetUploadModal}/>
                    )}
                    
        
                    {pageState.soundList && !pageState.secondPage && !pageState.firstPage && !pageState.FxPage && (
                      <UploadList reset={resetUploadModal} list={soundToUpload.soundList}/>
                    )}
                    
              
                    {pageState.secondPage && !pageState.firstPage && !pageState.FxPage && !pageState.firstPage && !pageState.soundList &&
                      (<FullUploadForm goToFx={goToFx} resetUpload={resetUploadModal} sound={formState && formState.inputs.sound && formState.inputs.sound.value}/>)}


                    {(!pageState.secondPage && pageState.firstPage && !pageState.FxPage) && !pageState.soundList && (
                      <form 
                        className="uploadmodal-big--form" 
                        onSubmit={submitSound}>
                        <SoundUpload 
                          open={pageState.firstPage}
                          id="sound" 
                          onInput={inputHandler}
                          
                        />
                      </form>)}
                  
                    <Fragment>
                      
                    {pageState.fxPage && (
                    <div
                        
                        className="uploadmodal-big--fxpage"
                      > 
                        <FXpage
                          open={pageState.fxPage}
                          soundPrev={soundPreview}
                          saveFx={saveFx}
                          onInput={inputHandler}
                          resetSecondPage={resetSecondPage}
                        />

                      </div>)}
                    
                    
                    </Fragment> 

        </div>
    )
}

export default React.memo(UploadModalBig);










