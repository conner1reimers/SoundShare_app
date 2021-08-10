import Image from "next/image";
import React, { useCallback } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import useDownloadFile from '../../util/functions/useDownloadFile';
import { useGlobalMsg } from "../../util/hooks/useGlobalMsg";
import download from "../../util/img/item-download.svg";
import MouseOverLabel from "../../util/MouseOverLabel";


interface DownloadBtnProps {
    soundId?: number
    path?: string
    name?: string
    singlepage?: boolean
    setCount?: React.Dispatch<React.SetStateAction<number>> | null
}

const DownloadButton: React.FC<DownloadBtnProps> = ({soundId, path, name, setCount, singlepage}) => {
  const dispatch = useDispatch();
  const downloadList = useSelector((state: RootState) => state.ui.downloads);
  const downloadFile = useDownloadFile()

  const setGlobalMsg = useGlobalMsg();

  const downloadSound = useCallback(
    (e) => {
      e.stopPropagation();
     
      
      if (!singlepage) {
        dispatch({type: "MAIN_LOADER_START"});

        if (downloadList) {

          if (downloadList.indexOf(soundId) === -1) {
            downloadFile(e, {
                  id: soundId,
                  path: path,
                  name: name,
            });
            dispatch({type: 'ADD_DOWNLOAD', payload: {id: soundId}});
            if (setCount) setCount((prevState) => prevState + 1);
            
          } else {
            setGlobalMsg('You just downloaded this sound', 'error');
            
          }
          
        } 

        setTimeout(() => {
          dispatch({type: "MAIN_LOADER_FINISH"});
        }, 1000);
        
      }

      

    },
    [soundId, path, name, singlepage, downloadList, dispatch]
  );

  return (
    <MouseOverLabel
      singlesound={singlepage}
      circle
      label="Download sound"
      labelClass="circle-btn-mouseover--label"
      classname="circle-btn-mouseover download-mouseover"
    >
      <button onClick={downloadSound} type="button" className="btn nohover">
        <Image className="download-btn" src={download} alt="" />
      </button>
    </MouseOverLabel>
  );
};

export default React.memo(DownloadButton);
