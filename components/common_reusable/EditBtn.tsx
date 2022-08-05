import Image from 'next/image'
import React from 'react'
import MouseOverLabel from '../../util/MouseOverLabel'

interface Props {
  click?: any,
  label: any,
  img: any
}
const EditBtn: React.FC<Props> = ({click, label, img}) => {
    
    return ( 
    <div className="sound-list-item--circle singlesound-edit-btns">
  
        <MouseOverLabel
          singlesound
          label={label}
          labelClass="circle-btn-mouseover--label"
          classname="circle-btn-mouseover circle-btn-mouseover--selector"
        >
          <button
            onClick={click}
            type="button"
            className={`btn nohover heart-absolute`}
          >
            <Image height={23} width={23} src={img} alt=""/>
          </button>
  
        </MouseOverLabel>
    </div>)
  }

export default EditBtn
