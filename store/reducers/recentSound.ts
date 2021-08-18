import { HYDRATE } from "next-redux-wrapper";
import * as actionTypes from "../actions/actionTypes";

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
        topLikedOffset: 20,
        topDownloadedOffset: 20,
        refreshFinishedLike: false,
        refreshFinishedDownload: false,
        likeMsgShown: false,
        downloadMsgShown: false

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
                sounds: action.recents,
                topLiked: action.topLiked,                
                topDownloaded: action.topDownloaded,
                offset: action.recents.length,
                refreshFinished: false
            }
        case 'FETCH_RECENT_SERVER_ASYNC':
            return {
                ...state,
                sounds: action.recents,
                topLiked: action.topLiked,                
                topDownloaded: action.topDownloaded,
            }
        case 'FETCH_RECENT_CAT_ASYNC':
            return {
                ...state,
                sounds: action.recents,
                refreshFinished: action.recents.length < 29,
                offset: action.recents.length

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
                topDownloadedAll: action.result
            }
        case 'FETCH_TOP_LIKED_ASYNC':
            return {
                ...state,
                topLikedAll: action.result
            }
        case 'REFRESH_ALL_DOWNLOADS_ASYNC':
            let newOffsetDownloaded = state.refreshTopList.topDownloadedOffset + action.results.length;

            if (action.results.length === 0) {
                return {
                  ...state,
                  refreshTopList: {
                    ...state.refreshTopList,
                    refreshFinishedDownload: true
                  }
                }
            }
            else {
                return {
                    ...state,
                    topDownloadedAll: [...state.topDownloadedAll, ...action.results],
                    refreshTopList: {
                        ...state.refreshTopList,
                        topDownloadedOffset: newOffsetDownloaded,
                    }
                }
            }
        case 'REFRESH_ALL_LIKES_ASYNC':
            let newOffsetLiked = state.refreshTopList.topLikedOffset + action.results.length
            if (action.results.length === 0) {
                return {
                  ...state,
                  refreshTopList: {
                    ...state.refreshTopList,
                    refreshFinishedLike: true
                  }
                }
            }
            else {
                return {
                    ...state,
                    topLikedAll: [...state.topLikedAll, ...action.results],
                    refreshTopList: {
                        ...state.refreshTopList,
                        topLikedOffset: newOffsetLiked,
                    }
                }
            }
        case 'TOP_LIKE_MSG_SHOWN':
            return {
                ...state,
                refreshTopList: {
                    ...state.refreshTopList,
                    likeMsgShown: true
                }
            }
        case 'TOP_DOWNLOAD_MSG_SHOWN':
            return {
                ...state,
                refreshTopList: {
                    ...state.refreshTopList,
                    downloadMsgShown: true
                }
            }
        case 'RECENT_SOUND_CHANGE_CATEGORY':
            return {
                ...state,
                category: action.category
            }
            
        default:
            return state
    }
}


export default recentSoundReducer