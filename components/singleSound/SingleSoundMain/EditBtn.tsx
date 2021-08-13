import Image from 'next/image'
import React, { useEffect } from 'react'
import trash from "../../../public/delete.svg";
import description from "../../../public/description.svg";
import frame from "../../../public/frame.svg";
import pencil from "../../../public/pencil.svg";
import tag from "../../../public/tag.svg";

interface Props {
  img: any
}

const EditBtn: React.FC<Props> = ({ img }) => {
  

  let finalImg: any;

  switch (img) {
    case 'trash':
      finalImg = trash;
      break;
    case 'description':
      finalImg = description;
      break;
    case 'frame':
      finalImg = frame;
      break;
    case 'pencil':
      finalImg = pencil;
      break;
    case 'tag':
      finalImg = tag;
      break;
    default:
      finalImg = pencil;
  }

  useEffect(() => {
    let try1: any = document.getElementsByClassName('singlesound-edit-btns');


    if (try1) {
      for (let i = 0; i < try1.length; i++) {
        let el1: any = try1[i].children[0]
        el1.style.overflow = 'visible';

        let el: any = try1[i].children[0].children[0]
        el.style.overflow = "visible";
        el.style.width = '30px';
        el.style.height = '30px';
        
        let newImg: any = el.children[1];

        newImg.style.width = '30px';
        newImg.style.height = '30px';
      };
    }
    // if (try1) {



    //   // if (newImg2) {
    //   //   newImg2.style.width = '30px';
    //   //   newImg2.style.height = '30px';
    //   // }

    //   // if (newImg) {
    //   //   newImg.style.boxShadow = 'none';
    //   //   console.log(newImg)
    //   // }
    // }

  }, [img]);

  return ( 
  <div className="sound-list-item--circle singlesound-edit-btns">
        <button
          type="button"
          className={`btn nohover heart-absolute`}
        >
        <Image src={finalImg} alt="" height={20} width={20}/>
        </button>
  </div>)
}

export default EditBtn
