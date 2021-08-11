import React from 'react'
import MobileModal from '../shared/Modals/MobileModal'

interface Props {
    cancel: any,
    open: any,
    desc: any

}

const DescriptionModal: React.FC<Props> = ({cancel, open, desc}) => {



    return (
        <MobileModal desc cancel={cancel} open={open}>
            <div className="single-desc-modal">
                <div className="single-desc-modal--inner">
                    <p>{desc}</p>
                </div>
                
            </div>
        </MobileModal>
    )
}

export default DescriptionModal
