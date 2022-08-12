import React, { Fragment } from 'react'
import { UserState } from "../../../store/reducers/user/user";
import { UiState } from "../../../store/reducers/ui/uiStateReducer";
import { useDispatch, useSelector } from 'react-redux';
import { useHttpClient } from '../../../util/hooks/http-hook';
import { motion } from 'framer-motion';

import MobileModal from '../../shared/Modals/MobileModal';
import EditBtn from './EditBtn';
import { useRouter } from 'next/router';

const optionsVariants = {
  initial: {
    y: "5%",
    x: "-20%",
    opacity: .8,
    scale: 0.4
  },
  out: {
    y: "-20%",
    x: "-20%",
    opacity: 0.8,
    scale: 0
  },
  in: {
    y: "60%",
    x: "20%",
    opacity: 1,
    scale: 1
  },
};

const optionsTransition = {
  type: "spring",
  mass: 1,
  damping: 80,
  stiffness: 500,
  velocity: 0.5,
};





const DropSinglesound = ({cancel, setEditMode, isMyPage }) => {
  const { sendRequest } = useHttpClient();
  const history = useRouter();
  const gpuTier = useSelector((state) => state.ui.gpuTier);
  const myPageOptionsOpen = useSelector((state) => state.ui.singlesoundOptionsOpen);
  const token = useSelector((state) => state.user.token);
  const soundId = useSelector((state) => state.singleSound.sound.id);
  const creatorId = useSelector((state) => state.singleSound.sound.creator_id);
  const path = useSelector((state) => state.singleSound.sound.path);
  const img_path = useSelector((state) => state.singleSound.sound.img_path);




  const dispatch = useDispatch();

  const editName = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.cancelBubble = true;
    cancel();
    setEditMode("name");
  };

  const editDescr = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.cancelBubble = true;
    cancel();
    setEditMode("desc");
  };

  const deleteSound = async (e) => {
    e.preventDefault();
    let result;

    if (isMyPage) {
      try {
        dispatch({ type: "MAIN_LOADER_START" });
        result = await sendRequest(
          `/sounds/delete/${soundId}/${creatorId}/`,
          "DELETE",
          JSON.stringify({
            path: path,
            imgpath: img_path
          }),
          {
            'Content-Type': 'application/json',  
            "Authorization": "Bearer "+token
          }
          
        );
       
        history.replace("/home");
        dispatch({ type: "MAIN_LOADER_FINISH" });

      } catch (err) {}
    }
  };

  const editPic = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.cancelBubble = true;
    cancel();
    setEditMode("image");
  };

  const editTags = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.cancelBubble = true;
    cancel();
    setEditMode("tags");
  };

  

  const DropdownItem = ({children, click, leftIcon}) => {
    const clickItem = (e) => {
      click(e);
    }
    return (
      <div onClick={clickItem} className="dropdown-top--item dropdown-singlesound--item">
            <a className="dropdown-top--item--link">
                <span className="dropdown-top--item--icon">
                  {leftIcon}
                </span>
              <span className="dropdown-top--item--text">{children}</span>
            </a>
      </div>
    )
  }


  return (
    <Fragment>
      {gpuTier && !gpuTier.isMobile ? (
            <Fragment>
              {myPageOptionsOpen && (
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={optionsVariants}
                  transition={optionsTransition}
                  className="delete-btn-singlesound--inner"
                >
                  <DropdownItem click={editName} leftIcon={<EditBtn img={'pencil'}/>}>
                    Edit name
                  </DropdownItem>
                  <DropdownItem click={editDescr} leftIcon={<EditBtn img={'description'}/>}>
                    Edit description
                  </DropdownItem>
                  <DropdownItem click={editPic} leftIcon={<EditBtn img={'frame'}/>}>
                    Change image
                  </DropdownItem>
                  {/* <DropdownItem click={editTags} leftIcon={<EditBtn img={tag}/>}>
                    Edit tags
                  </DropdownItem> */}
                
                  <DropdownItem click={deleteSound} leftIcon={<EditBtn img={'trash'}/>}>
                    Delete sound
                  </DropdownItem>
                  

                  
                </motion.div>)}
            </Fragment>
    
      ) : (
              <MobileModal open={myPageOptionsOpen} cancel={cancel}>
                <div className="singlesound-editbtns-mobile">
                  <DropdownItem click={editName} leftIcon={<EditBtn img={'pencil'}/>}>
                    Edit name
                  </DropdownItem>
                  <DropdownItem click={editDescr} leftIcon={<EditBtn img={'description'}/>}>
                    Edit description
                  </DropdownItem>
                  <DropdownItem click={editPic} leftIcon={<EditBtn img={'frame'}/>}>
                    Change image
                  </DropdownItem>
                  <DropdownItem click={editTags} leftIcon={<EditBtn img={'tag'}/>}>
                    Edit tags
                  </DropdownItem>
                
                  <DropdownItem click={deleteSound} leftIcon={<EditBtn img={'trash'}/>}>
                    Delete sound
                  </DropdownItem>
                </div>
              </MobileModal>
          
          )
      }
      
    </Fragment>
  )
}




export default React.memo(DropSinglesound);
