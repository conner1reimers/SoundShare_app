import { motion } from 'framer-motion';
import React from 'react'
import { useHttpClient } from '../../util/hooks/http-hook';
import pencil from "/public/pencil.svg";
import description from "/public/description.svg";
import { useDispatch } from 'react-redux';
import Image from 'next/image';

const optionsVariants = {
    initial: {
      y: "-5%",
      x: "20%",
      opacity: .8,
    },
    out: {
      y: "-200%",
      x: "20%",
      opacity: 0.8,
    },
    in: {
      y: "0",
      x: "0vw",
      opacity: 1,
    },
  };
  
  const optionsTransition = {
    type: "spring",
    mass: 1.5,
    damping: 25,
    stiffness: 250,
    velocity: 0.1,
  };
interface DropItemProps {
  children: any,
  leftIcon: any,
  second?: any,
  click: any
}

interface Props {
  goToDesc: any,
  small: any,
  setEdit: any
}
const DropSinglesound: React.FC<Props> = ({goToDesc, small, setEdit}) => {
    const {isLoading, sendRequest} = useHttpClient();
    const dispatch = useDispatch();

  
    const editDescr = () => {
      if (small) {
        goToDesc();
      }
      setEdit("desc");
      dispatch({ type: "CLOSE_USERPAGE_EDIT" });

      };

    const editSocial = () => {
      setEdit("social");
      dispatch({ type: "CLOSE_USERPAGE_EDIT" });
    };
  

    const DropdownItem: React.FC<DropItemProps> = ({children, leftIcon, second, click}) => {
  
      const clickItem = (e: any) => {
        click(e);
      }
      
      return (
        <div onClick={clickItem} className={`dropdown-top--item dropdown-singlesound--item ${second ? 'no-border' : ''}`}>
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
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={optionsVariants}
        transition={optionsTransition}
        className="delete-btn-singlesound--inner"
      >
      
        <DropdownItem click={editSocial} leftIcon={<EditBtn img={pencil}/>}>
            Edit/add social media buttons
        </DropdownItem> 
        <DropdownItem second click={editDescr} leftIcon={<EditBtn img={description}/>}>
          Edit description
        </DropdownItem>
        
        
  
        
      </motion.div>
    )
}

interface EditProps {
  img: any
}

const EditBtn: React.FC<EditProps> = ({img}) => {
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

export default DropSinglesound;
