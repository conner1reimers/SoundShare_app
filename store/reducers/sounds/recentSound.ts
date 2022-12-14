import { Console } from "console";
import { HYDRATE } from "next-redux-wrapper";
import * as actionTypes from "../../actions/actionTypes";

export interface RecentSoundState {
    sounds: any,
    topLiked: any,
    topDownloaded: any,
    currentIndex: any,
    offset: any,
    refreshFinished: any,
    topLikedAll: any,
    topDownloadedAll: any,
    category: any,
    refreshTopList: any
}
const initRecSoundState: RecentSoundState = {
    sounds: null,
    topLiked: null,
    topDownloaded: null,
    currentIndex: null,
    offset: 30,
    refreshFinished: false,
    topLikedAll: null,
    topDownloadedAll: null,
    category: 'all',
    refreshTopList: {
        type: null,
        offset: 20,
        refreshFinished: false,
        msgShown: false,
    }
}

const recentSoundReducer = (state = initRecSoundState, action: any) => {
    switch (action.type) {
        case HYDRATE: {
            if (action.payload) {
                return { ...state, ...action.payload.recentSounds }
            } else {
                return {...state}
            }
            
        }
        case 'FETCH_RECENT_ASYNC':
            return {
                ...state,
                sounds: action.results.sounds,
                topLiked: action.results.topLiked,                
                topDownloaded: action.results.topDownloaded,
                offset: action.results.sounds.length,
                refreshFinished: false
            }
        case 'FETCH_RECENT_SERVER_ASYNC':
            return {
                ...state,
                sounds: action.results.sounds,
                topLiked: action.results.topLiked,                
                topDownloaded: action.results.topDownloaded,
            }
        case 'FETCH_RECENT_CAT_ASYNC':
            return {
                ...state,
                sounds: action.results.sounds,
                refreshFinished: ((action.results.sounds.length % 15) !== 0),
                offset: action.results.sounds.length

            }
        case 'FETCH_RECENT_MORE_ASYNC':
            let newOffset = state.offset + action.results.length;
            if (action.results.length === 0) {
                return {
                  ...state,
                  refreshFinished: true
                }
              }
            else {
                return {
                    ...state,
                    sounds: [...state.sounds, ...action.results],
                    offset: newOffset
                }
            }
        case actionTypes.SET_INDEX_RECENT:
            let indexNum = state.sounds.length
            return {
                ...state
            }
        case 'FETCH_TOP_DOWNLOADS_ASYNC':
            return {
                ...state,
                topDownloadedAll: action.results
            }
        case 'FETCH_TOP_LIKES_ASYNC':
            return {
                ...state,
                topLikedAll: action.results
            }
        case 'REFRESH_ALL_DOWNLOADS_ASYNC':
            let newOffsetDownloaded = state.refreshTopList.offset + action.results.length;

            if (action.results.length === 0) {
                return {
                  ...state,
                  refreshTopList: {
                    ...state.refreshTopList,
                    refreshFinished: true
                  }
                }
            }
            else {
                return {
                    ...state,
                    topDownloadedAll: [...state.topDownloadedAll, ...action.results],
                    refreshTopList: {
                        ...state.refreshTopList,
                        offset: newOffsetDownloaded,
                    }
                }
            }
        case 'REFRESH_ALL_LIKES_ASYNC':
            let newOffsetLiked = state.refreshTopList.offset + action.results.length
            if (action.results.length === 0) {
                return {
                  ...state,
                  refreshTopList: {
                    ...state.refreshTopList,
                    refreshFinished: true
                  }
                }
            }
            else {
                return {
                    ...state,
                    topLikedAll: [...state.topLikedAll, ...action.results],
                    refreshTopList: {
                        ...state.refreshTopList,
                        offset: newOffsetLiked,
                    }
                }
            }
        case 'TOP_LIKE_MSG_SHOWN':
            return {
                ...state,
                refreshTopList: {
                    ...state.refreshTopList,
                    msgShown: true
                }
            }
        case 'TOP_DOWNLOAD_MSG_SHOWN':
            return {
                ...state,
                refreshTopList: {
                    ...state.refreshTopList,
                    msgShown: true
                }
            }
        case 'RECENT_SOUND_CHANGE_CATEGORY':
            return {
                ...state,
                category: action.category
            }
        case 'RESET_TOP_SOUNDS':
            return {
                ...state,
                topLikedAll: null,
                topDownloadedAll: null,
                refreshTopList: {
                    ...state.refreshTopList,
                    offset: 20,
                    refreshFinished: false,
                    type: null,
                    msgShown: false
                }
            }
        case 'SET_TOP_LIST':
            return {
                ...state,
                refreshTopList: {
                    ...state.refreshTopList,
                    type: action.payload
                }
            }
            
        default:
            return state
    }
}


export default recentSoundReducer