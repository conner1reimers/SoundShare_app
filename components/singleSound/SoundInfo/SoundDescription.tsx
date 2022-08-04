import { useRouter } from 'next/router';
import React, { Children, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import BPMComponent from '../BPMComponent';
import Download from '../Download';
import Licesnse from '../Licesnse';
import ReportSound from '../SingleSoundMain/ReportSound';
import SingleSoundRepostButton from '../SingleSoundMain/SingleSoundRepostButton';
import SoundTags from '../SingleSoundMain/SoundTags';
import SoundLikes from './SoundLikes';

type Props = {
  seeReposts: any,
  openDescription: any,
  smaller: boolean,
  seeLikes: any,
}

const SoundDescription: React.FC<Props> = ({ seeReposts, openDescription, smaller, seeLikes }) => {
  const router = useRouter();
  
  const sid = useSelector((state: any) => state.singleSound.sound.id);
  const userId = useSelector((state: any) => state.user.id);
  const name = useSelector((state: any) => state.singleSound.sound.name);
  const category = useSelector((state: any) => state.singleSound.sound.category);
  const tags = useSelector((state: any) => state.singleSound.sound.tags);
  const downloads = useSelector((state: any) => state.singleSound.sound.downloads);
  const description = useSelector((state: any) => state.singleSound.sound.description);
  const bpm = useSelector((state: any) => state.singleSound.sound.bpm);
  const favs = useSelector((state: any) => state.singleSound.sound.favs);
  const reposts = useSelector((state: any) => state.singleSound.sound.reposts.length);
  const reportSound = () => setReportComment(true);
  const closeReportSound = () => setReportComment(false);
  const [reportComment, setReportComment] = useState(false);


  const descRef: any = useRef();

  const [moveBtnDown, setMoveBtnDown] = useState(false);
  const [smallDesc, setSmallDesc] = useState(false);
  const [faved, setFaved] = useState(false);


  const gotoCategory = () => {
    if (category === 'loops') {
      router.push('/browseloops');
    } else if (category === 'fx') {
      router.push('/browsefx');
    } else if (category === 'vocal') {
      router.push('/browsevocal');
    }
  }

  useEffect(() => {
    if (descRef.current) {
      if (descRef.current.offsetHeight > 159) {
        setMoveBtnDown(true);
      } else if (descRef.current.offsetHeight < 61) {
        setSmallDesc(true);
      }
    }
  }, [description]);
  
  useEffect(() => {
          
    if (userId) {
      if (favs.indexOf(userId.toString()) !== -1) {
        if (!faved) {
          setFaved(true);
        }
      }
    }
  }, [userId, faved, sid, favs]);

  let nameLong = false;
  let soundName;
  let last;

  if (name.length > 25) {
    nameLong = true;
    soundName = name.substring(0, 25); //cuts to 25
    last = soundName.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
    soundName = soundName.substring(0, last); //cuts from last space (to avoid cutting the middle of a word)
    soundName = soundName + `...`; //adds (...) at the end to show that it's cut
  } else {
    soundName = name;
  }
  

  return (
    <div className={`single-sound--info--desc ${smallDesc ? 'single-sound--info--desc--small-desc' : ''} ${(moveBtnDown && nameLong) ? 'single-sound--info--desc-longname-desc' : ''}`}>

     {description ? (
        <div className='single-desc-container'>
          
          {soundName.length > 24 && (<span className="single-sound-longname">{soundName}</span>)}
          
          <p className="single-description" ref={descRef} onClick={openDescription}>{description}</p>
          
         {moveBtnDown && (
           <div className="seemore-desc-btn-singlesound">
             <div className="outline-btn">
               <button onClick={openDescription} className="btn nohover">SEE MORE</button>
             </div>
           </div>
          )}
          
        </div>
        
     ) : (
       <div className='single-desc-container'>
         {soundName.length > 24 && (
           <span>{soundName}</span>
         )}
         <p>
           The user did not give a description for this
           sound.
         </p>
       </div>
      )}
      
     {(tags && tags.length > 0) ? (
       <div className="sound-tags">
         <span className="tagword">Tags: </span>
         {tags.map((el, i) => (
           <SoundTags category={category} key={el} tag={el} notLast={tags[i + 1]} />
         ))}
       </div>
     ) : (
       <div></div>
      )}
      
      <div className="singlesound-action-container">
        <SingleSoundRepostButton />
        <Download/>
        {(!smaller) ? <SoundLikes setFaved={setFaved} seeLikes={seeLikes} faved={faved} nameLong={nameLong} moveBtnDown={moveBtnDown} /> : null}
        
      </div>
      
     <div className="counter-singlesound">
       <span>{downloads} Downloads</span>
       <span onClick={seeReposts} className="repost-singlesound-count">{reposts} Reposts</span>
       {smaller && (
         <span onClick={seeLikes} className="like-txt-single likesingle"> {favs.length} Likes</span>
       )}
       {category !== 'fx' && (
         <BPMComponent category={category} bpm={bpm}/>
       )}
       {!smaller && (
         <span onClick={gotoCategory} className="repost-singlesound-count">Category: {category}</span>
       )}
     </div>
     
     {smaller && (
       <div className="counter-singlesound singlesound-small-category">
         <span onClick={gotoCategory} className="repost-singlesound-count">Category: {category}</span>
       </div>
      )}
    
      <Licesnse reportSound={reportSound} />
      {reportComment && <ReportSound id={sid} close={closeReportSound}/>}
     
   </div>
  )
}

export default SoundDescription