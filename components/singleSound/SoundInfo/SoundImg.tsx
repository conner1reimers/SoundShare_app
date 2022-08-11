import React, { useRef } from 'react'
import game from "../../../public/game-background.svg";
import music from "../../../public/loop-background.svg";
import Image from 'next/image';
import { useSelector } from 'react-redux';



const SoundImg: React.FC = () => {
  const img = useSelector((state: any) => state.singleSound.sound.img_path);
  const category = useSelector((state: any) => state.singleSound.sound.category);


  const myLoader = ({ src, width, quality }) => {
    return `https://soundshare-bucket.s3.us-east-2.amazonaws.com/${img}`;
  }

  const imgRef = useRef(null);


  return (
    <div ref={imgRef} className="singlesound-img">
      
        <div className="singlesound-img-container">
          {img ? (
          <Image
                lazyBoundary='650px'
                lazyRoot={imgRef}
                layout="fill"
                objectFit="cover"
                className="singlesoundimg"
                src={`https://soundshare-bucket.s3.us-east-2.amazonaws.com/${img}`}
                  loader={myLoader}
                  unoptimized={true}
                alt=""
              />) : (
            <Image
                lazyBoundary='650px'
                layout="fill"
                lazyRoot={imgRef}
                objectFit="cover"
                className="singlesoundimg"
                src={category === "fx" ? game : music }
                alt=""
              />)}
      </div>
    </div>
  )
}

export default SoundImg