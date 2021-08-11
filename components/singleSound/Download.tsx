import React, { Fragment, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useDownloadFile from '../../util/functions/useDownloadFile';
import { useGlobalMsg } from '../../util/hooks/useGlobalMsg';
import { UiState } from "../../store/reducers/uiStateReducer";
import DownloadButton from '../common_reusable/DownloadButton';


interface Root {
  ui: UiState
}

interface Props {
    soundInfo: any,
    moveDown?: boolean,
    further?: boolean,
}


const Download: React.FC<Props> = ({soundInfo, moveDown, further}) => {
    let ref = useRef();
    const dispatch = useDispatch();
    const downloadList = useSelector((state: Root) => state.ui.downloads);
    const setGlobalMsg = useGlobalMsg();
    const downloadFile = useDownloadFile();

    const downloadFiles = useCallback((e) => {
        e.stopPropagation();

        dispatch({type: "MAIN_LOADER_START"});

        
        if (downloadList.indexOf(soundInfo.sound.id) === -1) {
            downloadFile(e, {
                id: soundInfo.sound.id,
                path: soundInfo.sound.path,
                name: soundInfo.sound.name,
            });
            dispatch({type: 'ADD_DOWNLOAD', payload: {id: soundInfo.sound.id}});
        } else {
            setGlobalMsg('You just downloaded this sound', 'error');
            
          }
        
          setTimeout(() => {
            dispatch({type: "MAIN_LOADER_FINISH"});
          }, 1000);

    }, [soundInfo, downloadList]);

    return (
        <Fragment>
            <div onClick={downloadFiles} className={`sound-list-item--circle circle-btn-single-sound circle-btn-single-sound--download singlesound-btn ${moveDown ? 'move-down' : ''} ${further ? 'move-down-more' : ''}`}>
                <span>Download</span>
                <DownloadButton
                    singlepage
                />
            </div>
        </Fragment>
    )
}

export default Download
