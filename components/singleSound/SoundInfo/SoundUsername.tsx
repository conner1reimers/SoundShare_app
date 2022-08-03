import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';
import { useChangePage } from '../../../util/hooks/changePage';
import Heart from '../../animatedLoaders/Heart/Heart';

const SoundUsername = (props: any) => {
  const { goToUserPage } = useChangePage();
  const username = useSelector((state: RootState) => state.singleSound.sound.username);
  const creator_id = useSelector((state: RootState) => state.singleSound.sound.creator_id);

  return (
    <>
      <span>Uploaded by:</span>

      <span
        onClick={(e) => goToUserPage(e, creator_id)}
        className="single-sound--info--username-contain--name"
      >
        {username}
      
      </span>

      {props.smaller && (
        <>
        
          <div className="singlesound-likes-smaller-contain">
            <div className="singlesound-likes-smaller">
              <Heart/>
            
            </div>
          </div>
        </>
      )}
  </>
  )
}

export default SoundUsername