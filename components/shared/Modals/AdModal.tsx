import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';
import close from '../../../public/close.svg';
import { setModalOpen } from '../../../store/actions';
import Image from 'next/image';

const msgVariants = {
  initial: {
      x: '0%',
      y: '-10%',
      opacity: 0.3,
      scale: 1
  },
  out: {
      x: '-10%',
      y: '-10%',
      opacity: 0,
      scale: 0
  },
  in: {

      x: '0%',
      y: '0%',
      opacity: 1,
      scale: 1
  }
};
const msgTrans = {
  type: 'spring',
  mass: 1,
  damping: 21,
  stiffness: 120,
  velocity: 1
  
};

const AdModal: React.FC = () => {
  const isShowAd = useSelector((state: any) => state.ui.adShow);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isShowAd) {
      dispatch(setModalOpen());
    }
  }, [isShowAd])
  return (
    <Fragment>
      <Modal
        open={isShowAd}
        upload
        nohead
        ad
      >
     
        <div className="ad-modal">
          <div className="followers-modal--close">
                <div>
                    <Image className="xtraoptions-close" src={close} alt=""/>
                </div>
            </div>
          <div className="ad-modal--head">
            
            <h1 className="headings">Sound downloading... {`Here's`} an ad: Thanks for helping support the site!</h1>
          </div>
          <div className="ad-modal--ad-section">
            <div className="ad-section-1">
              <div className="ad-hm-slot">
                <div id="div-gpt-ad-skyscraper-1" className="ad-slot"/>
             </div>
            </div>
            <div className="ad-section-2">
              <div className="ad-hm-slot">
                  <div id="div-gpt-ad-MPU-1" className="ad-slot"/>
              </div>
            </div>
            <div className="ad-section-3">
              <div className="ad-hm-slot">
                  <div id="div-gpt-ad-MPU-2" className="ad-slot"/>
              </div>
            </div>
          </div>
        </div>
        
      </Modal>
      </Fragment>
    
  )
}

export default AdModal;
