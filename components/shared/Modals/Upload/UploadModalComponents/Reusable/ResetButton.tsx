import React from 'react'
import back from '../../../../../../public/back-arrow.svg';
import Image from 'next/image';
import MouseOverLabel from '../../../../MouseOverLabel';

interface Props {
  click: any,
    
}

const ResetButton: React.FC<Props> = ({click}) => {
  return (
    <div className="uploadmodal-big--change-sound">
      <MouseOverLabel
        label='Change sound?'
        circle
        labelClass="circle-btn-mouseover--label"
        classname="circle-btn-mouseover goback-mouseover"
      >
        <button onClick={click} className="btn nohover uploadmodal-big--btn">
          <Image src={back} alt=""/>
        </button>
        </MouseOverLabel>
    </div>
  )
}

export default ResetButton
