import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UiState } from '../../../store/reducers/ui/uiStateReducer';
import { UserpageState } from '../../../store/reducers/user/userPageInfo';
import MouseOverLabel from "../../../util/MouseOverLabel";
import more from "/public/more2.svg";
import { AnimatePresence } from "framer-motion";
import Image from 'next/image';
import DropSinglesound from '../../common_reusable/DropdownOptions';
import MobileModal from '../../shared/Modals/MobileModal';



interface Root {
    ui: UiState,
    userPage: UserpageState
}
  
interface Props {
  isMyPage?: boolean,
  setEdit?: any,
  small?: any,
  goToDesc?: any,

}



const EditUserOptions: React.FC<Props> = ({ isMyPage, setEdit, small, goToDesc, }) => {
  
  const open = useSelector((state: Root) => state.userPage.editOpen);
  const dispatch = useDispatch();
  const gpuTier = useSelector((state: Root) => state.ui.gpuTier);

  const openMySoundOptions = () => {
    if (isMyPage) {
      dispatch({ type: "OPEN_CLOSE_USERPAGE_EDIT" });
    }
  };



  return (
    
    <Fragment>
      {isMyPage && (
        <Fragment>
        <div className="edit-userpage-mypage">
          <div className="delete-btn-singlesound--btn-activator invisible-btn-div">
            <MouseOverLabel
              seemore
              classname="circle-btn-mouseover singlesound-options-mouseover"
              labelClass="singlesound-options-mouseover--label"
              label="See options"
            >
              <button
                onClick={openMySoundOptions}
                className="btn nohover invisible-btn"
              >
                <Image src={more} alt="" />
              </button>
            </MouseOverLabel>
          </div>

          {gpuTier && open && (
            <Fragment>

            
              {!gpuTier.isMobile ? (
                <AnimatePresence exitBeforeEnter>
                  {open && (
                    <DropSinglesound goToDesc={goToDesc} small={small} setEdit={setEdit}/>
                  )}
                </AnimatePresence>
              ) : (
                <Fragment>
                  <MobileModal userpage open cancel={openMySoundOptions}>
                    <div className="singlesound-editbtns-mobile user-edit-mobile">
                      <DropSinglesound goToDesc={goToDesc} small={small} setEdit={setEdit}/>
                    </div>
                  </MobileModal>
                  
                </Fragment>
              )}
            </Fragment>
          )}



        </div>
        {open && <div onClick={openMySoundOptions} className="close-filters"></div>}
        </Fragment>
      )}
    </Fragment>
  );
};

export default EditUserOptions
