import React, { useEffect, useContext, useRef, createRef, useState, Fragment, useCallback } from 'react'
import useWindowSize from '../../util/useWindowSize'
import { useSelector, useDispatch } from 'react-redux';
import { updateTime, resetProgress, seekSound, playGlobalSound, endGlobalSound, pauseGlobalSound, resetGlobalSound } from '../../store/actions';
import { useChangeSound } from '../../util/hooks/useChangeSound';
import { Slider, withStyles } from '@material-ui/core';
import Media from 'react-media';
import ReactDOM from 'react-dom';
import { isObjectEmpty } from '../../util/functions/useDownloadFile';
import { useGlobalMsg } from '../../util/hooks/useGlobalMsg';
import { UploadState } from '../../store/reducers/uploadReducer';
import { GlobalMsgState } from '../../store/reducers/globalMsg';
import { ProgressState } from '../../store/reducers/progressState';
import { UiState } from '../../store/reducers/uiStateReducer';
import { GlobalPlayingState } from '../../store/reducers/globalPlaying';
import { styled } from '@material-ui/core/styles';

const optionsVariants = {
    initial: {

        y: '150%',
        opacity: 0.9



    },
    out: {


        y: '200%',
        opacity: 0



    },
    in: {

        y: '0%',
        opacity: 1

    }
}

const optionsTransition = {
    type: 'spring',
    mass: .5,
    damping: 27,
    stiffness: 220,
    velocity: 1
    
}


interface Root {
  upload: UploadState,
  globalMsg: GlobalMsgState,
  progress: ProgressState,
  ui: UiState,
  globalSound: GlobalPlayingState
}

interface Props {
  fx?: any,
  singleSound?: any,
  hidden?: any,
  playing?: any,
  open?: any,
  small2?: any,
  global?: any

}



const ProgressBar: React.FC<Props> = ({fx, singleSound, hidden, playing, open, small2}) => {
    let ref = useRef<any>();
    const nodeRef = useRef<any>(null);
  
    const [runningInterval, setRunningInterval] = useState<any>(false);
    const [mouseOver, setMouseOver] = useState<any>(false);
    const [newTimeMoused, setNewTime] = useState<any>(null);

    const globalSoundPlaying = useSelector((state: Root) => state.globalSound);
    const uploadingSound = useSelector((state: Root) => state.upload);
    const aModalIsOpen = useSelector((state: Root) => state.globalMsg.aModalIsOpen);
    const gpuTier = useSelector((state: Root) => state.ui.gpuTier);
    const progress = useSelector((state: Root) => state.progress);
    const setGlobalMsg = useGlobalMsg();

    const browserDims = useWindowSize();

    const small = gpuTier && gpuTier.isMobile;
    const sound = globalSoundPlaying.sound;

    const dispatch = useDispatch();

  
    let shrunkClass: any = (playing && !open) ? '' : 'global-player--time--unshrunk';
    let timeInterval: any;


    const formatDuration = (durTime: any) => {
      if (durTime <= 0) {
        return '00:00.00';
      } else {
        const duration = (Math.round(durTime * 100) / 100).toString();
        const durationSplit = duration.split('.');
        if (!durationSplit[1]) durationSplit[1] = '00';
  
        let durationFurther;
          if (durationSplit[0].length < 2) {
            durationFurther = `00:0${durationSplit[0]}`
          } else if (durationSplit[0].length <= 4 && durationSplit[0].length >= 2) {
            durationFurther = `00:${durationSplit[0]}`
          }
  
          let durationFurther2;
          if (durationSplit[1].length < 2) {
            durationFurther2 = `${durationSplit[1]}0`
          } else {
            durationFurther2 = durationSplit[1]
          }
        return `${durationFurther}.${durationFurther2}`;
    }}

    const mouseOverLine = useCallback((e: any) => {
      if (!fx && !singleSound && process.browser) {
        e.persist();

        const timeEl: any = document.querySelector('.global-player--time--progress');
        const timelineEl: any = document.querySelector('.global-player--time--line');

        const leftSpaceEl: any = document.querySelector('.leftlength-global');

        const cursorEl: any = document.querySelector('.global-player--time--moveOver--followingTile');
        


        if (!hidden) {
            const mouseOverPosition: any =(e.clientX - (leftSpaceEl.offsetWidth + timeEl.offsetWidth)) ;
    
            const ratioMousedOver: any = (mouseOverPosition / (timelineEl.offsetWidth));
    
            const moustOverEl: any = document.querySelector('.global-player--time--moveOver--textcontain');
            const moustOverTextEl: any = document.querySelector('.global-player--time--moveOver--text');
            
            const newTime: any = progress.duration * ratioMousedOver;
            setNewTime(newTime)
            moustOverEl.style.left = e.clientX - 6 +'px';
            moustOverEl.style.display = 'inline-block';
            cursorEl.style.left = e.clientX - 6 +'px';
            cursorEl.style.bottom = browserDims.height - e.clientY - 6 +'px';
            cursorEl.style.display = 'inline-block';
            moustOverTextEl.innerHTML = formatDuration(newTime);
            
          } else {
            const closeEl: any = document.querySelector('.global-player--hidden--close');
            const xtraLeft: any = browserDims.width - timelineEl.offsetWidth - (timeEl.offsetWidth) - (closeEl.offsetWidth * 1.07)
            const mouseOverPosition: any = e.clientX - xtraLeft;
            const ratioMousedOver: any = (mouseOverPosition / (timelineEl.offsetWidth));
            const moustOverEl: any = document.querySelector('.global-player--time--moveOver--textcontain');
            const moustOverTextEl: any = document.querySelector('.global-player--time--moveOver--text');
            
            const newTime: any = progress.duration * ratioMousedOver;
            setNewTime(newTime)
            moustOverEl.style.left = e.clientX - 6 +'px';
            moustOverEl.style.display = 'inline-block';
            cursorEl.style.left = e.clientX - 6 +'px';
            cursorEl.style.bottom = browserDims.height - e.clientY - 6 +'px';
            cursorEl.style.display = 'inline-block';
            moustOverTextEl.innerHTML = formatDuration(newTime);
          }
      } else if (fx && !singleSound && process.browser) {
        e.persist();
          const cursorEl: any = document.querySelector('.global-player--time--moveOver--followingTile');

          const lengthToBarEl: any = document.querySelector('.length-to-fxbar');
          const timelineEl: any = document.querySelector('.global-player--time--line');
          const bottomwindowEl: any = document.querySelector('.fx-bottomwindow');


          const xtraSpaceRight: any = browserDims.width - bottomwindowEl.offsetWidth - (browserDims.width * .05);
          const xtraSpaceBarLeft: any = lengthToBarEl.offsetWidth;
          const xtraSpaceLeft: any = browserDims.width - bottomwindowEl.offsetWidth - xtraSpaceRight;

          const xtraLeft: any = xtraSpaceBarLeft + xtraSpaceLeft;

          const mouseOverPosition: any = e.clientX - xtraLeft;

          const ratioMousedOver: any = (mouseOverPosition / (timelineEl.offsetWidth));
    
          const moustOverEl: any = document.querySelector('.global-player--time--moveOver--textcontain');
          const moustOverTextEl: any = document.querySelector('.global-player--time--moveOver--text');
          const newTime: any = progress.duration * ratioMousedOver;
        
          setNewTime(newTime)
          moustOverEl.style.left = e.clientX - 6 +'px';
          moustOverEl.style.display = 'inline-block';
          cursorEl.style.left = e.clientX - 6 +'px';
          cursorEl.style.bottom = browserDims.height - e.clientY - 6 +'px';
          cursorEl.style.display = 'inline-block';
          moustOverTextEl.innerHTML = formatDuration(newTime);

      } else if (!fx && singleSound && process.browser) {
        e.persist();
        const timeEl: any = document.querySelector('.global-player--time--progress');
        const timelineEl: any = document.querySelector('.global-player--time--line');
        const cursorEl: any = document.querySelector('.global-player--time--moveOver--followingTile');
        const playerContainer: any = document.querySelector('.single-sound--player--container');

        const xtraPlayerLeft: any = (playerContainer.offsetWidth * .4) + timeEl.offsetWidth;
        const xtraSpace: any = (browserDims.width - playerContainer.offsetWidth) / 2;

        const mouseOverPosition: any = e.clientX - (xtraPlayerLeft + xtraSpace);
        const ratioMousedOver: any = (mouseOverPosition / (timelineEl.offsetWidth));

        const moustOverEl: any = document.querySelector('.global-player--time--moveOver--textcontain');
        const moustOverTextEl: any = document.querySelector('.global-player--time--moveOver--text');
        
        const newTime: any = progress.duration * ratioMousedOver;
        setNewTime(newTime)
        moustOverEl.style.left = e.clientX - 6 +'px';
        moustOverEl.style.display = 'inline-block';
        cursorEl.style.left = e.clientX - 6 +'px';
        cursorEl.style.bottom = browserDims.height - e.clientY - 6 +'px';

        cursorEl.style.display = 'inline-block';
        moustOverTextEl.innerHTML = formatDuration(newTime);
      }
      
    }, [progress, hidden]);

    const mouseLeaveLine = useCallback(() => {
      if (mouseOver) {
        setMouseOver(false);
      };
      if (process.browser) {
        const moustOverEl: any = document.querySelector('.global-player--time--moveOver--textcontain');
        const cursorEl: any = document.querySelector('.global-player--time--moveOver--followingTile');
        const timelineEl: any = document.querySelector('.global-player--time--line--background');
        const cursorContainEl: any = document.querySelector('.global-player--time--moveOver--followingTile--contain');
        const styleHolder: any = document.querySelector('.style-holder')


        moustOverEl.style.display = 'none';
        cursorEl.style.display = 'none';

        timelineEl.style.height = '100%';
        timelineEl.style.transform = 'translateY(0)';
        cursorContainEl.style.height = timelineEl.style.height;
        styleHolder.style.transform = 'scale(1)';
        }
        
    }, [progress]);


    const mouseEnterLine = useCallback((e) => {
      if (!mouseOver) {
        setMouseOver(true);
    }}, [progress, mouseOver])



    const goToTime = () => {
        
        const noSound: any = isObjectEmpty(sound);

        if ((!noSound || uploadingSound.uploadSound) && process.browser) {


        const progress: any = document.querySelector('.global-player--time--line--progressline');
        const dot: any = document.querySelector('.global-player--time--line--dot');
        const styleHolder: any = document.querySelector('.style-holder');
        const wholeLine: any = document.querySelector('.global-player--time--line');

        progress.style.transition = 'all 0s';
        dot.style.transition = 'all 0s';
        
        const newPercent: any = (newTimeMoused/ref.current.duration)


        let progTransform = progress.style.transform;
        

        progress.style.width = newPercent*100+'%';
        dot.style.transform = progTransform + 'translateX('+wholeLine.offsetWidth*newPercent+'px)' + styleHolder.style.transform;

        ref.current.pause();
        ref.current.currentTime = newTimeMoused;

        dispatch(seekSound(newTimeMoused, (wholeLine.offsetWidth - 60)));

        if (!globalSoundPlaying.playing) dispatch(playGlobalSound());
        


        setTimeout(() => {
          ref.current.play()
        }, 200);
      } else {
        setGlobalMsg('Try playing the sound first.', 'error');
      }
        
    }


    const updateTimeInterval = () => {
      if (process.browser) {
        const wholeLine: any = document.querySelector('.global-player--time--line');
        wholeLine && dispatch(updateTime(wholeLine.offsetWidth));     
      }
       
    };

    const updateTimeIntervalSmall = () => {
      dispatch({type: 'UPDATE_TIME_SMALL_PROGRESS'});      
    };
  
    const loopSound = () => {
      dispatch(playGlobalSound());

        setTimeout(() => {
          ref.current.play();
        }, 200);
    }

    const endListen = () => {
      clearInterval(timeInterval);
      dispatch(endGlobalSound());
      if (!singleSound) {
        nextSound();
      } else {
        loopSound();
      }
      
  }
  
    const loadListen = useCallback((e) => {
      dispatch(resetProgress(ref.current.duration));
    }, [sound, ref]);
    
    const playListen = useCallback(() => {
      setRunningInterval(true);
      
    }, [sound, ref]);

    const pauseListen = useCallback(() => {
      setRunningInterval(false);
    }, [sound, ref]);
  
    const valuetext = (e: any) => {
      return formatDuration(e);
  };
  
  useEffect(() => {
    if (progress.resetSingle) {
      setRunningInterval(false);
    }
  }, [progress.resetSingle]);
  
    const goToTimeSmall = (e: any, newVal: any) => {
      e.preventDefault();
      const noSound = isObjectEmpty(sound);

      if (!noSound || uploadingSound.uploadSound) {
        ref.current.currentTime = newVal;
        dispatch({type: 'SEEK_SOUND_SMALL', newTime: newVal});
        
        if (!globalSoundPlaying.playing) dispatch(playGlobalSound());

        setTimeout(() => {
          ref.current.play();
        }, 200);

      } else {
        setGlobalMsg('Try playing the sound first.', 'error');
      }
    }
    
    const onDragStart = (e: any) => {
      if (globalSoundPlaying.playing) {
        dispatch(pauseGlobalSound());
        ref.current.pause();
      }
    }
  
    const clickDot = (e: any) => {
      e.stopPropagation();

    }

  useEffect(() => {
      if ((progress.curTime < progress.duration+2) || !progress.duration) {
        if (progress.reset) {
          ref.current.pause()
          ref.current.currentTime = 0;

          if (!globalSoundPlaying.playing && globalSoundPlaying.location) {
            dispatch(playGlobalSound());
          }

          setTimeout(() => {
            ref.current.play()
          }, 200);
        } 
        else if (gpuTier && !gpuTier.isMobile && process.browser) {
            const progressBar: any = document.querySelector('.global-player--time--line--progressline');
            const dot: any = document.querySelector('.global-player--time--line--dot');
    
            if (!runningInterval) {
              dot.style.transition = 'all 0.1s';
              progressBar.style.transition = 'all 0.1s';
                setTimeout(() => {
                  progressBar.style.transition = 'all .91s';
                  dot.style.transition = 'all .91s';
                }, 200);
            }
      
            let dotPx = progress.percentInPx - 18;

            
            progressBar.style.width = progress.percentInPx+'px';
            dot.style.transform = 'translateY(0px) translateX('+dotPx+'px)';
          } 
      } else {
        if (runningInterval) {
          setRunningInterval(false)
          dispatch(resetGlobalSound())
        }
          
        }
        
      }, [progress]);

      useEffect(() => {
        if (!globalSoundPlaying.playing) {
          if (runningInterval) setRunningInterval(false)
        } else {
          if (!runningInterval) setRunningInterval(true);
        }
      }, [globalSoundPlaying.playing]);


      useEffect(() => {
        if (!runningInterval) {
          clearInterval(timeInterval)
          clearInterval(timeInterval)
          if (ref && ref.current) {
            ref.current.pause();
          }
          

        } else if (runningInterval && globalSoundPlaying.playing && ref.current && !small && !small2 && process.browser) {
          const progressBar: any = document.querySelector('.global-player--time--line--progressline');
          const dot: any = document.querySelector('.global-player--time--line--dot');
          timeInterval = setInterval(updateTimeInterval, 100);
          ref.current.play();
          dot.style.transition = 'all 0.1s';
          progressBar.style.transition = 'all 0.1s';


          setTimeout(() => {
            progressBar.style.transition = 'all .91s';
            dot.style.transition = 'all .91s';
          }, 500);

        } else if (runningInterval && !globalSoundPlaying.playing && !small && !small2 && process.browser) {
          const progressBar: any = document.querySelector('.global-player--time--line--progressline');
          const dot: any = document.querySelector('.global-player--time--line--dot');

          timeInterval = setInterval(updateTimeInterval, 100);
          
          dot.style.transition = 'all 0.1s';
          progressBar.style.transition = 'all 0.1s';

          setTimeout(() => {
            progressBar.style.transition = 'all .91s';
            dot.style.transition = 'all .91s'
          }, 500);
          
        } else if (runningInterval && globalSoundPlaying.playing && ref.current && (small || small2) && process.browser) {
          ref.current.play();
          timeInterval = setInterval(updateTimeIntervalSmall, 100);
          
          

        } else if (runningInterval && !globalSoundPlaying.playing && !small && process.browser) {
          
          timeInterval = setInterval(updateTimeIntervalSmall, 100);
        }

        if (progress.resetSingle) {
          clearInterval(timeInterval);
          dispatch({type: "UNDO_RESET_SINGLE"})
        }

        return () => {
          clearInterval(timeInterval);
        }
      }, [runningInterval, progress.resetSingle]);


      useEffect(() => {
        if (globalSoundPlaying.ended) {
          dispatch(resetProgress(ref.current.duration));
          dispatch({type: 'unend-global'})
          ref.current.currentTime = 0
        }
      }, [globalSoundPlaying.ended])

      useEffect(() => {
        
        if (runningInterval && !globalSoundPlaying) {
          setRunningInterval(false);
        } else if (runningInterval && globalSoundPlaying) {
          
          setRunningInterval(false);
          setTimeout(() => {
            setRunningInterval(true)
          }, 250);
          
        } else if (!runningInterval && globalSoundPlaying.playing){
          setRunningInterval(true);
          
        }
        return () => {
          
          clearInterval(timeInterval)
        }
      }, [sound, ref]);
      
      const {nextSound} = useChangeSound();

      

      useEffect(() => {
        return () => {
          clearInterval(timeInterval);
        }
      }, []);


      useEffect(() => {
      if (ref && ref.current) {
        ref.current.volume = globalSoundPlaying.volume;  
      }
      
    }, [globalSoundPlaying.volume])

      
      

      const PrettoSlider = styled(Slider)({
        root: {
          color: "rgba(108, 121, 124, 0.24)",
          height: 8,
        },
        thumb: {
          height: 20,
          width: 20,
          backgroundColor: "#53C9CC",
          marginTop: -4,
          marginLeft: -12,
          "&:focus, &:hover, &$active": {
            boxShadow: "inherit",
            transform: "scale(1.15)",
            fontSize: "10px"
          },
        },
        active: {
          color: "#262c2d",
          backgroundColor: "#9ac1d0",
          zIndex: 9,
          
        },
        valueLabel: {
          left: "-25%",
          bottom: "29rem",
          fontSize: ".8rem",
          color: !singleSound ? "#262c2d" : "#1b1f1f",
          borderRadius: "0",
          height: "39rem",
          width: "39rem",
          padding: 0
        },
        track: {
          height: 14,
          borderRadius: "10px",
        },
        rail: {
          height: 14,
          borderRadius: "10px",
          backgroundColor: "rgba(108, 121, 124, 0.24)",
        },
        mark: {
          color: "#CE665C",
          backgroundColor: "#4324",
        },
      });
    
    let soundPath: any;
  
    if (sound.path) {
      soundPath = sound.path.replace(/\#/g, "%23");
      soundPath = soundPath.replace(/\@/g, "%40");
      
    }

    return (<Fragment>

          <Media queries={{
              small: "(max-width: 1099px)",
              big: "(min-width: 1100px)"
            }}>
            


            {matches => (
              <Fragment>

              {matches.small && gpuTier && !gpuTier.isMobile ? (
                <Fragment>
                {!fx && <span className="global-player--time--progress small-progress-time">{progress.duration ? formatDuration(progress.curTime) : '00.00'}</span>}
                <div onMouseDown={onDragStart} className="small-progressbar">
                  <PrettoSlider
                    valueLabelFormat={valuetext}
                    onChangeCommitted={goToTimeSmall}
                    defaultValue={progress.curTime}
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    max={progress.duration}
                    step={.25}
                    aria-labelledby="aria-label-over"
                  />
                  
                </div>

                <div className="hide-class">
                  <span className="style-holder"></span>

                  <div className="global-player--time--line--dot"></div>

                  <div className="global-player--time--line--progressline"></div>
                </div>
                  

                {!fx && <span className="global-player--time--progress small-progress-time rightside-progress">{progress.duration ? formatDuration(progress.duration) : '00.00'}</span>}
                </Fragment>
              )

              : matches.small && gpuTier && gpuTier.isMobile ? (
                <Fragment>
                {!fx && <span className={`global-player--time--progress small-progress-time ${singleSound ? 'global-progress-singlesound' : ''}`}>{progress.duration ? formatDuration(progress.curTime) : '00.00'}</span>}
                <div onTouchStart={onDragStart} className="small-progressbar">
                  <PrettoSlider
                    
                    valueLabelFormat={valuetext}
                    onChangeCommitted={goToTimeSmall}
                    // onChange={onDragStart}
                    defaultValue={progress.curTime}
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    max={progress.duration}
                    step={.25}
                    aria-labelledby="aria-label-over"
                  />
                </div>
                {!fx && <span className={`global-player--time--progress small-progress-time rightside-progress ${singleSound ? 'global-progress-singlesound' : ''}`}>{progress.duration ? formatDuration(progress.duration) : '00.00'}</span>}
                </Fragment>
              )
                
              : matches.big && gpuTier && !gpuTier.isMobile ? (
                <div className={`global-player--time ${shrunkClass}`}>
                
                {!fx && <span className="global-player--time--progress">{progress.duration ? formatDuration(progress.curTime) : '00.00'}</span>}
                
                <div 
                  onMouseUpCapture={goToTime} 
                  onMouseOutCapture={mouseLeaveLine} 
                  onMouseMoveCapture={mouseOverLine} 
                  onMouseOverCapture={mouseEnterLine} 
                  onTouchEnd={mouseLeaveLine}
                  className="global-player--time--line" 
                >


                  <div className="global-player--time--line--background">
                      
                  </div>

                  {ReactDOM.createPortal(
                    <Fragment>
                      <div className={`global-player--time--moveOver--followingTile--contain ${singleSound ? 'singlesound-sound-mouseover--tile' : ''}`}>
                          <span className="global-player--time--moveOver--followingTile"></span>
                      </div>
                      <div className={`global-player--time--moveOver--textcontain ${singleSound ? 'singlesound-sound-mouseover--textcontain' : fx ? 'fx-mouseover-textcontain' : ''}`}>
                        <span className="global-player--time--moveOver--text"></span>
                      </div>
                      
                    </Fragment>, document.getElementById('tile-hook') as HTMLElement
                  )}




                  <span className="style-holder"></span>

                  <div onClick={clickDot} ref={nodeRef} className="global-player--time--line--dot"></div>

                  <div className="global-player--time--line--progressline"></div>
                  
                </div>

                {!fx && <span className="global-player--time--progress">{progress.duration ? formatDuration(progress.duration) : '00.00'}</span>}

                
                
            </div>
            
              ) : matches.big && gpuTier && gpuTier.isMobile ? (
                <Fragment>
                <div className={`global-player--time ${shrunkClass}`}>
                {!fx && <span className="global-player--time--progress small-progress-time">{progress.duration ? formatDuration(progress.curTime) : '00.00'}</span>}
                <div onMouseDown={onDragStart} className="small-progressbar big-mobile-progressbar">
                  <PrettoSlider
                    valueLabelFormat={valuetext}
                    onChangeCommitted={goToTimeSmall}
                    // onChange={onDragStart}
                    defaultValue={progress.curTime}
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    max={progress.duration}
                    step={.25}
                    aria-labelledby="aria-label-over"
                  />
                  
                </div>
                {!fx && <span className="global-player--time--progress small-progress-time rightside-progress">{progress.duration ? formatDuration(progress.duration) : '00.00'}</span>}
                </div>
                </Fragment>
              ) 
              : null} 
              </Fragment>
            )}
            
            </Media>

            

            {!fx && sound && sound.path && (
                    <audio 
                        ref={ref}
                        autoPlay={false}
                        onPlay={playListen}
                        onPause={pauseListen}
                        onLoadedMetadata={loadListen}
                        src={`https://soundshare-bucket.s3.us-east-2.amazonaws.com/${soundPath}`}
                        onEnded={endListen}
                        
                    />)}
            
            {fx && (
            <audio
              ref={ref}
              src={uploadingSound.uploadSound}
              onPlay={playListen}
              onPause={pauseListen}
              onLoadedMetadata={loadListen}
              onEnded={endListen}
            />)}

          
        </Fragment>
        
        )
}

export default React.memo(ProgressBar)
