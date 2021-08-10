import { createContext } from "react";


export const AuthContext = createContext(
    {
        isLoggedIn: false,
        userId: null,
        token: null,
        login: () => {},
        logout: () => {},
        aModalIsOpen: false,
        set_a_ModalIsOpen: () => {},
        globalMsg: false,
        setGlobalMsg: () => {},
        globalSoundPlaying: false,
        setGlobalSoundPlaying: () => {},
        recentSounds: [],
        singleSoundpageInfo: null,
        setSingleSoundpageInfo: () => {},
        topLiked: null


    }
)