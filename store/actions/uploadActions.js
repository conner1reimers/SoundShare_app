import * as actionTypes from "./actionTypes";


export const setUploadSound = (sound) => {
    return {
        type: actionTypes.SET_UPLOAD_SOUND,
        sound
    }
}



export const setUploadBuffer = (buff) => {
    return {
        type: actionTypes.SET_UPLOAD_BUFFER,
        buff
    }
}


export const saveUploadForm = (form,imgPrev) => {
    return {
        type: actionTypes.SAVE_UPLOAD_FORM,
        form,
        imgPrev
    }
}

export const playFx = () => {
    return {
        type: actionTypes.SET_FX_PLAY
    }
}

export const pauseFx = () => {
    return {
        type: actionTypes.SET_FX_PAUSE
        
    }
}

export const saveFxBuff = (buff) => {
    return {
        type: actionTypes.SAVE_FX_BUFF,
        buff: buff
        
    }
}

export const save1soundList = (index) => {
    return {
        type: actionTypes.SAVE_1_UPLOAD_SOUND_LIST,
        index: index
    }
}

export const setUploadListInfo = (index, name, bpm, soundType, duration) => {
    
    return {
        type: actionTypes.SET_UPLOAD_SOUND_LIST_INFO,
        index: index,
        soundType: soundType,
        bpm: bpm ? bpm : 0,
        name: name,
        duration: duration
    }
}

export const setUploadList1Name = (name, index) => {
    
    return {
        type: actionTypes.SET_UPLOAD_SOUND_LIST_SINGLE_NAME,
        name: name,
        index: index
    }
}

export const changeListSingleCategory = (cat, index) => {
    
    return {
        type: actionTypes.CHANGE_1_SOUND_LIST_CATEGORY,
        cat: cat,
        index: index
    }
}

export const changeListSingleGenre = (genre, index) => {
    
    return {
        type: actionTypes.CHANGE_1_SOUND_LIST_GENRE,
        genre: genre,
        index: index
    }
}

export const changeListSingleTags = (tags, index) => {
    
    return {
        type: actionTypes.CHANGE_1_SOUND_LIST_TAGS,
        tags: tags,
        index: index
    }
}


