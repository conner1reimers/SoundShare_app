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

export const fetchUser = (id) => {
    return {
        type: actionTypes.FETCH_USER,
        id: id
    }
}
