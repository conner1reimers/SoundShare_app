import * as actionTypes from "./actionTypes";


export const saveBrowseOptions = (options) => {
    return {
        type: actionTypes.SAVE_BROWSE,
        options: options
        
    }
}

export const saveBrowseTags = (tags) => {
    return {
        type: actionTypes.SAVE_BROWSE_TAGS,
        tags: tags
        
    }
}

export const saveXtraBrowseOptions = (options) => {
    return {
        type: actionTypes.SAVE_XTRA_BROWSE,
        options: options
        
    }
}

