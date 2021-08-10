import {changeGlobalSound, seekSound } from '../../store/actions';
import { useGlobalMsg } from './useGlobalMsg';
var _ = require('lodash');
const { useDispatch, useSelector } = require("react-redux");

export const useChangeSound = () => {
    const globalPlaying = useSelector(state => state.globalSound);
    const globalProgress = useSelector(state => state.progress);
    const globalLocation = useSelector(state => state.globalSound.location);

    const recentSounds = useSelector(state => state.recentSounds);
    const userSounds = useSelector(state => state.userPage);
    const browseSounds = useSelector(state => state.browse);
    const feedSounds = useSelector(state => state.feed);
    const topLiked = useSelector(state => state.recentSounds.topLikedAll);
    const topDownloaded = useSelector(state => state.recentSounds.topDownloadedAll);
    const setGlobalMsg = useGlobalMsg();

    const dispatch = useDispatch();

    const gotoNext = (newSound) => {
        if (newSound) {
            dispatch(changeGlobalSound(newSound, globalLocation))
        } else {
            setGlobalMsg('No more sounds here...', 'error')
        }
    }

    const nextSound = () => {
        // Check location were playing from then play that next sound
        
        if (globalLocation === 'recent') {
            const index = _.findIndex(recentSounds.sounds, sound => sound.id === globalPlaying.sound.id);
            const newSound = recentSounds.sounds[index + 1];
            gotoNext(newSound);
            
        } else if (globalLocation === 'browse') {
            const index = _.findIndex(browseSounds.results, sound => sound.id === globalPlaying.sound.id);
            const newSound = browseSounds.results[index + 1];
            gotoNext(newSound);
            
        } else if (globalLocation === 'feed') {
            const index = _.findIndex(feedSounds.soundData, sound => sound.id === globalPlaying.sound.id);
            const newSound = feedSounds.soundData[index + 1];
            gotoNext(newSound);
            
        } else if (globalLocation === 'user-sounds') {
            const index = _.findIndex(userSounds.sounds, sound => sound.id === globalPlaying.sound.id);
            const newSound = userSounds.sounds[index + 1];
            gotoNext(newSound);
            
        } else if (globalLocation === 'user-favs') {
            const index = _.findIndex(userSounds.favSounds, sound => sound.id === globalPlaying.sound.id);
            const newSound = userSounds.favSounds[index + 1];
            gotoNext(newSound);
            
        } else if (globalLocation === 'user-reposts') {
            const index = _.findIndex(userSounds.userReposts, sound => sound.id === globalPlaying.sound.id);
            const newSound = userSounds.userReposts[index + 1];
            gotoNext(newSound);
            
        } else if (globalLocation === 'top-liked') {
            const index = _.findIndex(topLiked, sound => sound.id === globalPlaying.sound.id);
            const newSound = topLiked[index + 1];
            gotoNext(newSound);
            
        } else if (globalLocation === 'top-downloaded') {
            const index = _.findIndex(topDownloaded, sound => sound.id === globalPlaying.sound.id);
            const newSound = topDownloaded[index + 1];
            gotoNext(newSound);
        } 
        
    }

    const prevSound = () => {


        if (globalProgress.percent > 10) {
            const wholeLine = document.querySelector('.global-player--time--line');
            dispatch(seekSound(0, (wholeLine.offsetWidth - 60), true));
            setTimeout(() => {
                dispatch({type: 'UNDO_RESET_PROGRESS'})
            }, 100);
        }
        else {
            if (globalLocation === 'recent') {
                const index = _.findIndex(recentSounds.sounds, sound => sound.id === globalPlaying.sound.id);
                const newSound = recentSounds.sounds[index - 1];
                if (newSound) {
                    dispatch(changeGlobalSound(newSound, 'recent'))
                }
                
            } else if (globalLocation === 'browse') {
                const index = _.findIndex(browseSounds.results, sound => sound.id === globalPlaying.sound.id);
                const newSound = browseSounds.results[index - 1];
                if (newSound) {
                    dispatch(changeGlobalSound(newSound, 'browse'))
                }
                
            } else if (globalLocation === 'feed') {
                const index = _.findIndex(feedSounds.soundData, sound => sound.id === globalPlaying.sound.id);
                const newSound = feedSounds.soundData[index - 1];
                if (newSound) {
                    dispatch(changeGlobalSound(newSound, 'feed'))
                }
                
            } else if (globalLocation === 'user-sounds') {
                const index = _.findIndex(userSounds.sounds, sound => sound.id === globalPlaying.sound.id);
                const newSound = userSounds.sounds[index - 1];
                if (newSound) {
                    dispatch(changeGlobalSound(newSound, 'user-sounds'))
                }
                
            } else if (globalLocation === 'user-favs') {
                const index = _.findIndex(userSounds.favSounds, sound => sound.id === globalPlaying.sound.id);
                const newSound = userSounds.favSounds[index - 1];
                if (newSound) {
                    dispatch(changeGlobalSound(newSound, 'user-sounds'))
                }
                
            } else if (globalLocation === 'user-reposts') {
                
                const index = _.findIndex(userSounds.reposts, sound => sound.id === globalPlaying.sound.id);
                const newSound = userSounds.reposts[index - 1];
                if (newSound) {
                    dispatch(changeGlobalSound(newSound, 'user-sounds'))
                }
                
    }}}

    return {nextSound, prevSound}
}