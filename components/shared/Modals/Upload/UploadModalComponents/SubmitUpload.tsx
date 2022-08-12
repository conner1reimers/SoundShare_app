import React from 'react'
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';

interface Props {
  submitSound: any,
  goToFx: any
}

const SubmitUpload: React.FC<Props> = ({submitSound, goToFx}) => {
    const gpuTier = useSelector((state: any) => state.ui.gpuTier);

    return ReactDOM.createPortal(
                        
        <div 
          className={`uploadmodal-big--fx ${gpuTier.isMobile ? 'upload-submit-container-mobile' : ''}`}
        >
        
        <div className="uploadmodal-big--fx--container">
            <button onClick={goToFx} className="btn nohover uploadmodal-big--btn uploadmodal-big--btn-fx">Want some effects?</button>
            <button type="button" onClick={submitSound} className="btn nohover uploadmodal-big--btn">Submit</button>
        </div>
        

      </div>, document.getElementById('upload-submit-hook') as HTMLElement)
      
}

export default SubmitUpload
