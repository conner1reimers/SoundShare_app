import React from 'react'
import game from "../../../public/game-background.svg";
import music from "../../../public/loop-background.svg";
import Image from 'next/image';

interface Props {
  img: any,
  category: string
}

const SoundImg = (props: Props) => {
  const myLoader = ({ src, width, quality }) => {
    return `https://soundshare-bucket.s3.us-east-2.amazonaws.com/${props.img}`;
  }
  
  return (
    <div className="singlesound-img">
    <div className="singlesound-img-container">
    {props.img ? (
      <Image
          height={450}
          width={450}
          objectFit="fill"
          className="singlesoundimg"
          src={`https://soundshare-bucket.s3.us-east-2.amazonaws.com/${props.img}`}
          loader={myLoader}
          alt=""
        />) : (
        <Image
          height={450}
          width={450}
          objectFit="fill"
          className="singlesoundimg"
          src={props.category === "fx" ? game : music }
          alt=""
        />)}
      </div>
    </div>
  )
}

export default SoundImg