import React, { useEffect, useRef, useCallback, useState } from 'react'
import animationData from './animationDatas/ham.json';
import ReactDOM from 'react-dom';
import lottie from 'lottie-web';
import { Fragment } from 'react';
import LoadingAnimation from './LoadingAnimation/LoadingAnimation';
import { useSelector } from 'react-redux';
import { UiState } from '../../store/reducers/ui/uiStateReducer';
import { GlobalMsgState } from '../../store/reducers/global/globalMsg';

interface Root {
    ui: UiState,
    globalMsg: GlobalMsgState
}

interface Props {
    on: boolean,

}

const Hamburger: React.FC<Props> = ({on}) => {
    const [didFirstRender, setDidFirstRender] = useState<boolean>(false);
    const container = useRef<any>(null);
    const gpuTier = useSelector((state: Root) => state.ui.gpuTier);
    const isLoading = useSelector((state: Root) => state.ui.mainLoader);
    const modalOpen = useSelector((state: Root) => state.globalMsg.aModalIsOpen);

    let anim: any;
    
    useEffect(() => {
        setDidFirstRender(true)
        anim = lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        })
        try {
            anim.addEventListener('enterFrame', enteredFrameHandler);
            anim.addEventListener('DOMLoaded', changeLottieAnim)
            // etc ...
          } catch (error) {}

        return () => {
            if (!on) {
                anim.destroy()
            } else if (on) {
                lottie.setDirection(-1)
                anim.destroy()
            }
        }
    }, [on]);

    const enteredFrameHandler = useCallback(() => {
        if (anim.currentFrame > 25 && on) {
            return;
        }else if (anim.currentFrame > 25.4 && !on && didFirstRender) {
            lottie.setDirection(-1);
        }
    }, [on, anim, didFirstRender])

    const changeLottieAnim = useCallback(() => {
        if (on && anim.currentFrame < 25) {
                lottie.setDirection(1);
                lottie.play();
        } else {
                lottie.setDirection(-1);
                lottie.play();
        }
    }, [on, anim]);

    

    const finalEl = typeof window != 'undefined' ? ReactDOM.createPortal(
        <Fragment>

            <div className={`hamburger-container ${(modalOpen && gpuTier && gpuTier.isMobile) ? 'hamburger-contain-openmodal' : ''} ${(on || (modalOpen && gpuTier && !gpuTier.isMobile)) ? 'hamburger-contain-open' : ''}`}>
        
                <div className="lottie" ref={container}></div>

            </div>

            <LoadingAnimation loading={isLoading} />
        </Fragment>, document.getElementById('burger-hook') as HTMLElement) : null


    return finalEl
}

export default React.memo(Hamburger)
