import React from 'react'

type Props = {}

const UploadSubmit = (props: any) => {
  return (
    <div 
        className={`uploadmodal-big--fx ${props.isMobile ? 'upload-submit-container-mobile' : ''}`}
      >
      
      <div className="uploadmodal-big--fx--container">
          <button onClick={props.goToFx} className="btn nohover uploadmodal-big--btn uploadmodal-big--btn-fx">Want some effects?</button>
          <button type="button" onClick={props.submitSound} className="btn nohover uploadmodal-big--btn">Submit</button>
      </div>
      

    </div>
  )
}

export default UploadSubmit;