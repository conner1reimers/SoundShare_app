import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { playGlobalSound, setGlobalMsg } from '../../../../../store/actions';


const AudioElement: React.FC = () => {
  const [soundSource, setSoundSource] = useState<any>(null);
  const uploadState = useSelector((state: any) => state.upload)
  const globalSound = useSelector((state: any) => state.globalSound)
  const reduxDispatch = useDispatch();
  const aRef = useRef<any>();

  const playListen = () => {
    if (!globalSound.playing) reduxDispatch(playGlobalSound());
  }

  const pauseListen = () => {
    
  }

  const loadListen = () => {
    if (globalSound.playing && aRef) {
      aRef.current.play();
    }
  }


  const useGlobalMsg = setGlobalMsg();

  useEffect(() => {
    if (uploadState.uploadSound && !uploadState.fxBuff && !uploadState.hasFx) {
      setSoundSource(uploadState.uploadSound)
    } else if (uploadState.fxBuff && uploadState.hasFx) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setSoundSource(fileReader.result);
      };
      
      fileReader.readAsDataURL(uploadState.fxBuff);
    }}, [uploadState.uploadSound, uploadState.fxBuff]);

  
  useEffect(() => {
    if (!globalSound.playing && aRef.current) {
      aRef.current.pause();
    } else if (globalSound.playing && aRef.current) {
      aRef.current.play();
    }
  }, [globalSound.playing]);



  return soundSource && (
    <audio
      ref={aRef}
      src={soundSource}
      onPlay={playListen}
      onPause={pauseListen}
      onLoad={loadListen}
      autoPlay={false}/>
  )
}


export default AudioElement
