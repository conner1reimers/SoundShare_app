import { HYDRATE } from "next-redux-wrapper";

const GOOGLE_MOVE_TO_USERNAME = 'GOOGLE_MOVE_TO_USERNAME';
const RESET_AUTH = 'RESET_AUTH';
const FORGOT_PASS_PAGE = 'FORGOT_PASS_PAGE';

interface loginInfo {
    email: string
}


export interface AuthState {
    isOnUsername: boolean,
    loginInfo: loginInfo,
    isOnPasswordReset: boolean
}

const initState: AuthState = {
    isOnUsername: false,
    loginInfo: {email: ''},
    isOnPasswordReset: false
}



interface GoogleMoveAction {
    type: typeof GOOGLE_MOVE_TO_USERNAME
    info: object
}

interface Hydration {
    type: typeof HYDRATE,
    payload: any
}

interface ResetAuthAction {
    type: typeof RESET_AUTH
}

interface ForgotPasswordAction {
    type: typeof FORGOT_PASS_PAGE
}

type AuthActionTypes = GoogleMoveAction | ResetAuthAction | ForgotPasswordAction | Hydration;



const authReducer = (state = initState, action: AuthActionTypes) => {
    switch (action.type) {
        
        case GOOGLE_MOVE_TO_USERNAME:
            return {
                ...state,
                isOnUsername: true,
                loginInfo: action.info

            }
        case RESET_AUTH:
            return {
                isOnUsername: false,
                isOnPasswordReset: false,
                loginInfo: {}
            }
        case FORGOT_PASS_PAGE:
            return {
                ...state,
                isOnUsername: false,
                isOnPasswordReset: true
            }
        default:
            return state
    }
}


export default authReducer;