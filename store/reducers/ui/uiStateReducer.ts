import * as actionTypes from "../../actions/actionTypes";

interface Loader {
    actions: Array<any>
    refreshing: Array<any>
}


export interface UiState {
    loader: Loader,
    gpuTier: any,
    singlesoundOptionsOpen: boolean,
    downloads: Array<number>,
    extraLoader: boolean,
    mainLoader: boolean,
    initialLoad: boolean,
    adShow: boolean,
    homeLoader: boolean,
    modalRef: null | React.MutableRefObject<any>
}


const initState: UiState = {
    loader: {
        actions: [],
        refreshing: []
    },
    gpuTier: null,
    singlesoundOptionsOpen: false,
    downloads: [],
    extraLoader: false,
    mainLoader: false,
    initialLoad: false,
    adShow: false,
    homeLoader: false,
    modalRef: null
}



interface StartAction {
    type: typeof actionTypes.START_ACTION
    info: object
}


interface ActionsForUi {
    type: string
    payload: any
}


type ActionTypes = ActionsForUi
    

const uiReducer = (state = initState, action: ActionTypes) => {
    const { loader } = state;
    const { actions, refreshing} = loader;

    switch (action.type) {
        case actionTypes.START_ACTION:
            return {
                ...state,
                loader: {
                    ...loader,
                    actions: [...actions, action.payload.action]
                }
            }
        case actionTypes.STOP_ACTION:
            return {
                ...state,
                loader: {
                    ...loader,
                    actions: actions.filter(actionz => actionz.name !== action.payload.name)
                }
            }
        case actionTypes.REFRESH_ACTION_START:
            return {
                ...state,
                loader: {
                    ...loader,
                    refreshing: [...refreshing, action.payload.refreshAction]
                }
            }
        case actionTypes.REFRESH_ACTION_STOP:
            return {
                ...state,
                loader: {
                    ...loader,
                    refreshing: refreshing.filter(ref => ref !== action.payload.refreshAction)
                }
            }
        case "OPEN_SINGLESOUND_OPTIONS":
            return {
                ...state,
                singlesoundOptionsOpen: true
            }
        case "CLOSE_SINGLESOUND_OPTIONS":
            return {
                ...state,
                singlesoundOptionsOpen: false
            }
        case "SHOW_AD":
            return {
                ...state,
                adShow: true
            }
        case "CLOSE_AD":
            return {
                ...state,
                adShow: false
            }
        case "GET_GPU_TIER":
            return {
                ...state,
                gpuTier: {
                    gpu: action.payload.gpu,
                    isMobile: action.payload.mobile,
                    tier: action.payload.tier,
                }
            }
        case "ADD_DOWNLOAD":
            return {
                ...state,
                downloads: [...state.downloads, action.payload.id]
            }
        case "EXTRA_LOADER_START":
            return {
                ...state,
                extraLoader: true
            }
        case "EXTRA_LOADER_FINISH":
            return {
                ...state,
                extraLoader: false
            }
        case "MAIN_LOADER_START":
            return {
                ...state,
                mainLoader: true
            }
        case "MAIN_LOADER_FINISH":
            return {
                ...state,
                mainLoader: false
            }
        case "HOME_LOADER_START":
            return {
                ...state,
                homeLoader: true
            }
        case "HOME_LOADER_FINISH":
            return {
                ...state,
                homeLoader: false
            }
        case "INIT_LOAD":
            return {
                ...state,
                initialLoad: true
            }
        case "SET_MODAL_REF":
            return {
                ...state,
                modalRef: action.payload
            }
        default:
            return state
    }
}

export default uiReducer;


