import * as actionTypes from "../../actions/actionTypes";


export interface UploadState {
    uploadSound: any,
    modalOpen: any,
    buffer: any,
    form: any,
    imgPrev: any,
    foundBpm: any,
    fxState: any,
    category: any,
    fxBuff: any,
    hasFx: any,
    soundList: any,
    soundListInfo: any
}
const initialState: UploadState = {
    uploadSound: null,
    modalOpen: false,
    buffer: null,
    form: null,
    imgPrev: null,
    foundBpm: null,

    fxState: {
        fxpageOpen: false,
        playing: false,
        tutorialShown: false,
        tutorialShown2: false,
        distSlider: {
            distortion: 0,
            oversample: 0,     //  The oversampling of the effect. Can either be "none", "2x" or "4x".
            maxDelay:0,
            wet: 0
        },

        chorusSlider: {
            freq: 0,
            delay: 0,
            depth: 0,
            spread: 0
        },

        delaySlider: {
            delay: 0,
            feedback: 0,
            wet: 0
        },

        pingPong: {
            delay: 0,
            feedback: 0,
            wet: 0
        },


        reverbSlider: {
            decay: 0,
            preDelay: 0,
            wet: 0
        },

        phaserSlider: {
            freq: 0,
            octaves: 0,
            baseFrequency: 0
        },

        pitchShift: {
            pitch: 0,
            windowSize: 0.1,
            delayTime: 0,
            feedback: 0,
            wet: 0
        },
        tremolo: {
            frequency : 0,
            depth : 0,
        },

        filterSlider: {
            frequency : 1,
            baseFrequency: 200,
            octaves: 0,
            feedback: 0
        },

        dryWet: 1,
        stereoWidener: 0.5,
        bitcrushSlider: null,
        chebySlider: null
    },
    category: null,
    fxBuff: null,
    hasFx: false,
    soundList: false,
    soundListInfo: []
}


//REDUCER
const uploadReducuer = (state = initialState, action: any) => {
    switch (action.type) {
    
    case 'OPEN_UPLOAD_MODAL':
        return {
            ...state,
            modalOpen: true
        }
    case 'CLOSE_UPLOAD_MODAL':
        return {
            ...state,
            modalOpen: false
        }
    case 'CLOSE_RESET_UPLOAD_MODAL':
        return initialState
    case 'RESET_UPLOAD_MODAL':
        return {
            ...initialState,
            modalOpen: true
        }
      case actionTypes.SET_UPLOAD_SOUND:
        return {
            ...state,
            uploadSound: action.sound
        }
    case actionTypes.SET_UPLOAD_BUFFER:
        return {
            ...state,
            buffer: action.buff
        }
    case actionTypes.SAVE_UPLOAD_FORM:
        return {
            ...state,
            form: action.form,
            imgPrev: action.imgPrev
        }
    case actionTypes.SAVE_FX_BUFF: 
        
        return {
            ...state,
            fxBuff: action.buff,
            hasFx: true
        }
    case actionTypes.SET_FX_PLAY:
        return {
            ...state,
            fxState: {
                ...state.fxState,
                playing: true
            }
        }
    case actionTypes.SET_FX_PAUSE:
        return {
            ...state,
            fxState: {
                ...state.fxState,
                playing: false
            }
        }
    case 'OPEN_FX':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    fxpageOpen: true
                }
            }
    case 'SET_CATEGORY':
            return {
                ...state,
                category: action.cat
            }
    case 'CLOSE_FX':
            return {
                ...state,
                fxState: {
                    ...initialState.fxState,
                    tutorialShown: true
                }
            }
        case 'dist':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    distSlider: {
                        ...state.fxState.distSlider,
                        distortion: action.val,
                    }
                }
                
                
            }
        case 'chorusfreq':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    chorusSlider: {
                        ...state.fxState.chorusSlider,
                        freq: action.val
                    }
            }
        }
        case 'chorusdelay':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    chorusSlider: {
                        ...state.fxState.chorusSlider,
                        delay: action.val
                    }
            }
        }
        case 'chorusdepth':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    chorusSlider: {
                        ...state.fxState.chorusSlider,
                        depth: action.val
                    }
            }}
        case 'chorusspread':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    chorusSlider: {
                        ...state.fxState.chorusSlider,
                        spread: action.val
                    }
            }}
        case 'phaserfreq':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    phaserSlider: {
                        ...state.fxState.phaserSlider,
                        freq: action.val
                    }
            }}
        case 'phaseroctave':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    phaserSlider: {
                        ...state.fxState.phaserSlider,
                        octaves: action.val
                    }
            }}
        case 'phaserbass':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    phaserSlider: {
                        ...state.fxState.phaserSlider,
                        baseFrequency: action.val
                    }
            }}
        case 'reverbwet':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    reverbSlider: {
                        ...state.fxState.reverbSlider,
                        wet: action.val
                    }
            }}
        case 'reverbdecay':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    reverbSlider: {
                        ...state.fxState.reverbSlider,
                        decay: action.val
                    }
            }}
        case 'reverbdelay':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    reverbSlider: {
                        ...state.fxState.reverbSlider,
                        preDelay: action.val
                    }
            }}
        case 'pingwet':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    pingPong: {
                        ...state.fxState.pingPong,
                        wet: action.val
                    }
            }}
        case 'pingdelay':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    pingPong: {
                        ...state.fxState.pingPong,
                        delay: action.val
                    }
            }}
        case 'pingfeedback':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    pingPong: {
                        ...state.fxState.pingPong,
                        feedback: action.val
                    }
            }}
        case 'delayTime':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    delaySlider: {
                        ...state.fxState.delaySlider,
                        delay: action.val
                    }
            }}
        case 'delayFeedback':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    delaySlider: {
                        ...state.fxState.delaySlider,
                        feedback: action.val
                    }
            }}
        case 'delayWet':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    delaySlider: {
                        ...state.fxState.delaySlider,
                        wet: action.val
                    }
            }}
        case 'bitcrush':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    bitcrushSlider: action.val
            }}
        case 'pshift_pitch':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    pitchShift: {
                        ...state.fxState.pitchShift,
                        pitch: action.val

                    }
            }}
        case 'pshift_feedback':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    pitchShift: {
                        ...state.fxState.pitchShift,
                        feedback: action.val

                    }
            }}
        case 'pshift_delay':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    pitchShift: {
                        ...state.fxState.pitchShift,
                        delayTime: action.val

                    }
            }}
        case 'pshift_size':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    pitchShift: {
                        ...state.fxState.pitchShift,
                        windowSize: action.val

                    }
            }}
        case 'pshift_wet':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    pitchShift: {
                        ...state.fxState.pitchShift,
                        wet: action.val

                    }
            }}
        case 'filter_freq':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    filterSlider: {
                        ...state.fxState.filterSlider,
                        frequency: action.val

                    }
            }}
        case 'filter_octave':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    filterSlider: {
                        ...state.fxState.filterSlider,
                        octaves: action.val

                    }
            }}
        case 'filter_basefreq':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    filterSlider: {
                        ...state.fxState.filterSlider,
                        baseFrequency: action.val

                    }
            }}
        case 'filter_feedback':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    filterSlider: {
                        ...state.fxState.filterSlider,
                        feedback: action.val

                    }
            }}

        case 'cheby_order':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    chebySlider: action.val
            }}
        case 'FOUND_BPM':
            return {
                ...state,
                foundBpm: action.bpm
            }
        case 'FX_TUTORIAL_DONE':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    tutorialShown: true
            }}
        case 'FX_TUTORIAL_DONE2':
            return {
                ...state,
                fxState: {
                    ...state.fxState,
                    tutorialShown2: true
            }}
        case 'RESET_FX_SLIDERS':
            return {
                ...state,
                fxState: {
                    ...initialState.fxState,
                    playing: state.fxState.playing,
                    fxpageOpen: true
                    
            }}
        case 'SET_UPLOAD_SOUND_LIST':
            return {
                ...state,
                soundList: action.list      
            }
        case actionTypes.SET_UPLOAD_SOUND_LIST_INFO:
            return {
                ...state,
                soundListInfo: [...state.soundListInfo, {
                    soundType: action.soundType,
                    bpm: action.bpm,
                    index: action.index,
                    name: action.name,
                    duration: action.duration
                }]
            }
        case actionTypes.SAVE_1_UPLOAD_SOUND_LIST:

            return {
                ...state,
                uploadSound: null,
                form: null,
                soundListInfo: state.soundListInfo.map((el: any) => {
                    if (el.index === action.index) {
                        return {
                            ...el,
                            name: state.form.inputs.name.value,
                            form: state.form.inputs
                        }
                    } else {
                        return el
                    }
                })
            }
        case actionTypes.SET_UPLOAD_SOUND_LIST_SINGLE_NAME:

            return {
                ...state,
                soundListInfo: state.soundListInfo.map((el: any) => {
                    if (el.index === action.index) {
                        if (el.form) {
                            return {
                                ...el,
                                name: action.name,
                                form: {
                                    ...el.form,
                                    name: {
                                        value: action.name,
                                        isValid: true
                                    }
                                }
                            }
                        } else {
                            return {
                                ...el,
                                name: action.name
                            }
                        }
                        
                    } else {
                        return el
                    }
                })
            }
            case actionTypes.CHANGE_1_SOUND_LIST_CATEGORY:

                return {
                    ...state,
                    soundListInfo: state.soundListInfo.map((el: any) => {
                        if (el.index === action.index) {
                            return {
                                ...el,
                                soundType: action.cat
                            }
                            
                        } else {
                            return el
                        }
                    })
                }
            case actionTypes.CHANGE_1_SOUND_LIST_GENRE:

                return {
                    ...state,
                    soundListInfo: state.soundListInfo.map((el: any) => {
                        if (el.index === action.index) {
                            return {
                                ...el,
                                genre: action.genre
                            }
                            
                        } else {
                            return el
                        }
                    })
            }
            case actionTypes.CHANGE_1_SOUND_LIST_TAGS:
                return {
                    ...state,
                    soundListInfo: state.soundListInfo.map((el: any) => {
                        if (el.index === action.index) {
                            return {
                                ...el,
                                tags: action.tags
                            }
                            
                        } else {
                            return el
                        }
                    })
                }
        
            

        default:
            return state
      
    }
  }


  

export default uploadReducuer;