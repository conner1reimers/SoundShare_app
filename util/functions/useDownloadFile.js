import { useDispatch, useSelector } from "react-redux";

const useDownloadFile = () => {
  let soundPath;
  const dispatch = useDispatch();
  const isShowAd = useSelector(state => state.ui.adShow);





  const downloadFile = (event, sound) => {
    event.preventDefault();
    event.stopPropagation();
    var req = new XMLHttpRequest();

    event.cancelBubble = true;

    if (sound.path) {
      soundPath = sound.path.replace(/\#/g, "%23");
      soundPath = soundPath.replace(/\@/g, "%40");
    }

    // dispatch({type: "SHOW_AD"});
    
    req.open(
      "GET",
      `/sounds/download/${sound.id}/${soundPath}`,
      true
    );
    req.responseType = "blob";
  
    req.onload = () => {
      let blob = req.response;
     
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      
      link.download = sound.name + ".wav";
      link.click();
    };
    req.send();
  
  }

  

  return downloadFile;
};

export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
}

export default useDownloadFile;
