// SELECTORS ARE JUST FUNCTIONS THAT TAKE ENTIRE REDUX STATE AND RETURN SOMETHING


export const getUserSection = (state) => state.user;

export const getUserFullName = (state) => {
    const user = getUserSection();
    const preFix = user.gender === 'F' ? 'Mrs.' : 'Mr.';

    return `${preFix} ${user.firstName} ${user.lastName}`
}


export const getUserSess = (state) => state.session;

export const isBrowseLoading = (state) => {
    return state.ui.loader.actions.some(action => action.name === 'FETCH_BROWSE')
}

export const isBrowseRefreshing = (state) => {
    return state.ui.loader.actions.some(action => action.name === 'REFRESH_BROWSE')
}

export const isUserPageLoading = (state) => {
    return state.ui.loader.actions.some(action => action.name === 'FETCH_USER')
}

export const isUserGetFollowersLoading = (state) => {
    return state.ui.loader.actions.some(action => action.name === 'FETCH_FOLLOWERS')
}

export const isUserFeedLoading = (state) => {
    return state.ui.loader.actions.some(action => action.name === 'FETCH_FEED')
}

export const fetchMoreRecentSoundsloading = (state) => {
    return state.ui.loader.actions.some(action => action.name === 'FETCH_RECENT_MORE')
}

export const fetchTopDownloadsLoading = (state) => {
    return state.ui.loader.actions.some(action => action.name === 'FETCH_TOP_DOWNLOADS')
}

export const fetchTopLikedLoading = (state) => {
    return state.ui.loader.actions.some(action => action.name === 'FETCH_TOP_LIKES')
}

export const refreshTopLikedLoading = (state) => {
    return state.ui.loader.actions.some(action => action.name === 'REFRESH_ALL_LIKES')
}

export const RefreshTopDownloadsLoading = (state) => {return state.ui.loader.actions.some(action => action.name === 'REFRESH_ALL_DOWNLOADS' || action.name === 'REFRESH_ALL_LIKES');}

export const singlesoundLoading = (state) =>{ 
    return state.ui.loader.actions.some(action => 
       action.name === "__NEXT_REDUX_WRAPPER_HYDRATE__" 
        || action.name === "FETCH_SINGLE_SOUND_SERVER" 
        || action.name === "FETCH_SINGLE_SOUND"
    );
}

    

export const getCurrentListForm = (state, index) => {
    return state.find((el) => {
        return el.index === index
    })
}

// THEN IN COMPONENT WE WANT TO USE IT IN ---

// const mapStateToProps = state => ({
//     userFullName: getUserFullName(state),
// })