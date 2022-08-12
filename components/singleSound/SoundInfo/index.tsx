import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import loadable from '@loadable/component'

const SoundImg = loadable(() => import('./SoundImg'));
const SoundName = loadable(() => import('./SoundName'));
const SoundUsername = loadable(() => import('./SoundUsername'));
const SoundDescription = loadable(() => import('./SoundDescription'));
const EditDesc = loadable(() => import('../EditComponents/EditDesc'));
const EditImage = loadable(() => import('../EditComponents/ChangeImage'));
const EditSoundName = loadable(() => import('../EditComponents/EditSoundName'));



type Props = {
  smaller: boolean,
  seeLikes: any,
  openDescription: any,
  setLikeModalOpen: any
}

const SingleSoundInfo = (props: Props) => {
  const [editMode, setEditMode] = useState<any>(null);
  const [faved, setFaved] = useState<boolean>(false);
  const [isMyPage, setIsMyPage] = useState(false);

  const userId = useSelector((state: any) => state.user.id);
  const isMaster = useSelector((state: any) => state.user.master);
  const favs = useSelector((state: any) => state.singleSound.sound.favs);
  const name = useSelector((state: any) => state.singleSound.sound.name);
  const creator_id = useSelector((state: any) => state.singleSound.sound.creator_id);

  

  const seeReposts = () => props.setLikeModalOpen('reposts');

  useEffect(() => {
    if (creator_id == userId) {
      if (!isMyPage) setIsMyPage(true);
    } else if (isMaster) {
      if (!isMyPage) setIsMyPage(true);
    }

    document.title = `${name} - Soundshare`
  }, [creator_id, name, userId, isMyPage, isMaster]);


  useEffect(() => {
    if (userId) {
      if (favs.indexOf(userId.toString()) !== -1) {
        if (!faved) {
          setFaved(true);
        }
      }
    }
  }, [userId, faved, favs]);

  return (
    <div className="single-sound--info">
                    
      <SoundImg/>
      
      <EditImage open={editMode === "image"} setEditMode={setEditMode}/>

      <SoundName setEditMode={setEditMode} editMode={editMode} isMyPage={isMyPage}/>

      <EditSoundName open={editMode === "name"} setEditMode={setEditMode}/>

      <div className="single-sound--info--username-contain">
        {editMode !== "name" && <SoundUsername  setFaved={setFaved} faved={faved} smaller={props.smaller}/>}
      </div>

      {editMode !== "desc" &&  <SoundDescription seeLikes={props.seeLikes} openDescription={props.openDescription} smaller={props.smaller} seeReposts={seeReposts}/>}

      <EditDesc setEditMode={setEditMode} open={editMode === "desc"}/>
      
    
    </div>
  )
}

export default SingleSoundInfo;