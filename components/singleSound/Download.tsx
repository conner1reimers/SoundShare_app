import React, { Fragment, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useDownloadFile from '../../util/functions/useDownloadFile';
import { useGlobalMsg } from '../../util/hooks/useGlobalMsg';
import { UiState } from "../../store/reducers/ui/uiStateReducer";
import DownloadButton from '../common_reusable/DownloadButton';
import { SoundState } from '../../store/reducers/sounds/soundPageReducer';


interface Root {
  ui: UiState,
  singleSound: SoundState
}


const Download: React.FC = () => {
    let ref = useRef();
    const dispatch = useDispatch();
    const downloadList = useSelector((state: Root) => state.ui.downloads);
    const sid = useSelector((state: Root) => state.singleSound.sound.id);
    const path = useSelector((state: Root) => state.singleSound.sound.path);
    const name = useSelector((state: Root) => state.singleSound.sound.name);

    
    const setGlobalMsg = useGlobalMsg();
    const downloadFile = useDownloadFile();

    const downloadFiles = useCallback((e) => {
        e.stopPropagation();

        dispatch({type: "MAIN_LOADER_START"});

        
        if (downloadList.indexOf(sid) === -1) {
            downloadFile(e, {
                id: sid,
                path: path,
                name: name,
            });
            dispatch({type: 'ADD_DOWNLOAD', payload: {id: sid}});
        } else {
            setGlobalMsg('You just downloaded this sound', 'error');
            
          }
        
          setTimeout(() => {
            dispatch({type: "MAIN_LOADER_FINISH"});
          }, 1000);

    }, [sid, path, name, downloadList, dispatch, downloadFile, setGlobalMsg]);

    return (
        <Fragment>
            <div onClick={downloadFiles} className={`sound-list-item--circle circle-btn-single-sound circle-btn-single-sound--download singlesound-btn`}>
                <span>Download</span>
                <DownloadButton
                    singlepage
                />
            </div>
        </Fragment>
    )
}

export default Download
