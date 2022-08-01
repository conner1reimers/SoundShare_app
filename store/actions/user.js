import * as actionTypes from "./actionTypes";

export const loginUser = (userId, token, userName) => {
    return {
        type: actionTypes.SIGN_IN,
        userId: userId,
        token: token,
        userName: userName
    }
}

export const logoutUser = () => {
    return {
        type: actionTypes.LOGOUT
    }
}

export const fetchUser = (id, loadType) => {
    return {
        type: actionTypes.FETCH_USER,
        id,
        loadType
    }
}

export const fetchUserServer = (id) => {
    return {
        type: actionTypes.FETCH_USER_SERVER,
        id: id
    }
}
