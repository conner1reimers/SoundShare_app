import React, { Fragment, useState } from 'react'
import ReactDOM from 'react-dom';
import Backdrop from '../../Backdrop';


interface Props {
    cancel: any,
    userpage?: any,
    desc?: any,
    open?: any,
    children: any
  
  }
  

const MobileModal: React.FC<Props> = ({cancel, userpage, desc, open, children}) => {

    
    return open && (
        <Fragment>
            
            {ReactDOM.createPortal(
                <div className="mobile-modal-container">

                    <Backdrop onClick={cancel}/>
                    <div className={`mobile-modal-box ${userpage ? 'mobile-modal-box-userpage' : ''} ${desc ? 'mobile-modal-box-desc' : ''}`}>
                        {children}
                    </div>
                    
                </div>, document.getElementById('mobile-smallmodal-hook') as HTMLElement
            )}
            
        </Fragment>
            
    )
}

export default MobileModal
