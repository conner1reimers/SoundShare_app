import React, { useState } from 'react'
import Modal from '../Modal'
import UploadModalBig from './UploadModalBig';

interface Props {
  open: any
}

const UploadModal: React.FC<Props> = ({open}) => {
    const [backdropVisibility, setBackdropVisibility] = useState(true);
    
    return (
              <Modal 
                      open={open} 
                      upload
                      backdropHeadClass="uploadmoadal-head-big"
                      backdropVisibility={backdropVisibility}
                      nohead
              >
                <UploadModalBig 
                  setBackdropVisibility={setBackdropVisibility}
                />
              </Modal>
    )
}

export default React.memo(UploadModal)
