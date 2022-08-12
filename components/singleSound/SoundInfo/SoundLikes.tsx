import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';
import Heart from '../../animatedLoaders/Heart/Heart'


const SoundLikes = (props: any) => {
  const favsLength = useSelector((state: RootState) => state.singleSound.sound.favs.length);

  
  return (
  <>
    
      <div className="single-sound--likes">

        <div className={`outline-btn outline-btn--heart ${props.moveBtnDown ? 'move-down' : ''} ${(props.moveBtnDown && props.nameLong) ? 'move-down-more' : ''} ${(!props.moveBtnDown && props.nameLong) ? 'move-down-other' : ''}`}>
          
          <Heart/>

          <span onClick={props.seeLikes} className="like-txt-single likesingle"> 
            {favsLength} Likes
          </span>
          
        </div>

      </div>

  </>
  )
}

export default SoundLikes