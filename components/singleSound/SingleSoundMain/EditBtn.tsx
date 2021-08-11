import Image from 'next/image'
import React from 'react'

interface Props {
  img: any
}

const EditBtn: React.FC<Props> = ({img}) => {
  return ( 
  <div className="sound-list-item--circle singlesound-edit-btns">
        <button
          type="button"
          className={`btn nohover heart-absolute`}
        >
          <Image src={img} alt=""/>
        </button>
  </div>)
}

export default EditBtn
