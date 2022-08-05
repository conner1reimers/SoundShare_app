import React from 'react'
import game from "../../../public/game-background.svg";
import music from "../../../public/loop-background.svg";
import Image from 'next/image';
import { useSelector } from 'react-redux';



const SoundImg: React.FC = () => {
  const img = useSelector((state: any) => state.singleSound.sound.img_path);
  const category = useSelector((state: any) => state.singleSound.sound.category);

  console.log(img)

  const myLoader = ({ src, width, quality }) => {
    return `https://soundshare-bucket.s3.us-east-2.amazonaws.com/${img}`;
  }
  
  return (
    <div className="singlesound-img">
    <div className="singlesound-img-container">
    {img ? (
      <Image
          height={450}
          width={450}
          objectFit="fill"
          className="singlesoundimg"
          src={`https://soundshare-bucket.s3.us-east-2.amazonaws.com/${img}`}
            loader={myLoader}
            unoptimized={true}
          alt=""
        />) : (
        <Image
          height={450}
          width={450}
          objectFit="fill"
          className="singlesoundimg"
          src={category === "fx" ? game : music }
          alt=""
        />)}
      </div>
    </div>
  )
}

export default SoundImg