import { useRouter } from 'next/router'
import React, { useState, useEffect,  } from 'react';
import Media from 'react-media';
import { useSelector, useDispatch } from 'react-redux';
import LoadingAnimation from '../../components/animatedLoaders/LoadingAnimation/LoadingAnimation';
import FollowerModal from '../../components/shared/Modals/FollowerModal';
import CommentSection from '../../components/singleSound/Comments/CommentSection';
import DescriptionModal from '../../components/singleSound/DescriptionModal';
import EditImage from '../../components/singleSound/EditComponents/ChangeImage';
import EditDesc from '../../components/singleSound/EditComponents/EditDesc';
import EditSoundName from '../../components/singleSound/EditComponents/EditSoundName';
import LikeSoundList from '../../components/singleSound/SingleSoundMain/LikeSoundList';
import { resetGlobalSound} from '../../store/actions';
import { setGlobalSound } from '../../store/actions/globalSound';
import db from '../../server/util/queries';
import SoundImg from '../../components/singleSound/SoundInfo/SoundImg';
import SoundName from '../../components/singleSound/SoundInfo/SoundName';
import SoundUsername from '../../components/singleSound/SoundInfo/SoundUsername';
import SoundPlayer from '../../components/singleSound/SingleSoundMain/SoundPlayer';
import { END } from 'redux-saga';
import { wrapper } from '../../store/wrapper';
import { singlesoundLoading } from '../../store/selectors';
import SoundDescription from '../../components/singleSound/SoundInfo/SoundDescription';
import SingleSoundInfo from '../../components/singleSound/SoundInfo';


export default function Sounds() {
  const router = useRouter();
  let soundId = router.query;

  const [descOpen, setDescOpen] = useState(false);
  const [likeModalOpen, setLikeModalOpen] = useState<any>(false);
  
  const dispatch = useDispatch();
  const mainLoader = useSelector((state: any) => state.ui.mainLoader);
  const soundInfo = useSelector((state: any) => state.singleSound.sound);

  const isLoading = useSelector((state:any) => singlesoundLoading(state));

  const seeLikes = () => setLikeModalOpen('likes');
  const openDescription = () => setDescOpen(true);
  const closeLikesModal = () => setLikeModalOpen(false);
  const closeDescription = () => setDescOpen(false);

  

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch({type: "MAIN_LOADER_FINISH"});
    dispatch({type: "UNDO_RESET_SINGLE"})

    return () => {
      dispatch(resetGlobalSound());
      dispatch({ type: "RESET_SINGLE_SOUND" });
    };
    
  }, [dispatch]);


  let name;
  let last;
  let nameLong = false;

  if (soundInfo && soundInfo) {
    if (soundInfo.name.length > 25) {
      nameLong = true;
      name = soundInfo.name.substring(0, 25); //cuts to 25
      last = name.lastIndexOf(" "); //gets last space (to avoid cutting the middle of a word)
      name = name.substring(0, last); //cuts from last space (to avoid cutting the middle of a word)
      name = name + `...`; //adds (...) at the end to show that it's cut
    } else {
      name = soundInfo.name;
    }
  }


  useEffect(() => {
    let try1: any = document.querySelector('.singlesound-img-container');
    if (try1) {
      let el: any = try1.children[0];
      el.style.overflow = "visible";
      let newImg = el.querySelector('img');
      if (newImg) {
        newImg.style.boxShadow = 'none';
      }
    }
  }, [soundInfo]);



  useEffect(() => {
    if (soundInfo && (soundId.sid != soundInfo.id)) 
      dispatch({ type: "FETCH_SINGLE_SOUND", sid: soundId.sid });
    if(mainLoader) 
      dispatch({type: "MAIN_LOADER_FINISH"})
  }, [soundId, soundInfo, dispatch, mainLoader])

  

  return (
    <>

        <Media
          queries={{
            smaller: "(max-width: 500px)",
            small: "(max-width: 1099px)",
            big: "(min-width: 1100px)"
          }}
        >
          {(matches) => (
            <>
              
              <div className="single-sound">
                  <SingleSoundInfo setLikeModalOpen={setLikeModalOpen} smaller={matches.smaller}  seeLikes={seeLikes} openDescription={openDescription} />
                  <SoundPlayer matches={matches} soundInfo={soundInfo}/>
                  <CommentSection />
              </div>
              
            </>
          )}
        </Media>
      

        <>

          <FollowerModal likeList closeModal={closeLikesModal} header={likeModalOpen} open={likeModalOpen}>
              <LikeSoundList closeModal={closeLikesModal} option={likeModalOpen} favs2={soundInfo.favs} reposts={soundInfo.reposts}/>
          </FollowerModal>

          <DescriptionModal 
            desc={soundInfo.description} 
            cancel={closeDescription} 
            open={descOpen} 
          />

          

        </>)
      

      

    </>
  );
}

export async function getStaticPaths() {
  const getSoundsQueryTxt = "SELECT id FROM sounds";  

    let foundSounds;
    let soundList;
  
    try {
      foundSounds = await db.query(getSoundsQueryTxt);
  
      soundList = {
        sounds: foundSounds.rows
      };
    } catch (err) { }
  
  const pathList = soundList.sounds.map(el => {
    return {
      params: {sid: el.id}
    }
  })

  return {
    paths: pathList,
    fallback: 'blocking'
  }
}

export const getStaticProps = wrapper.getStaticProps((store: any) =>
  async (test: any) => {
    // regular stuff
    store.dispatch({ type: "FETCH_SINGLE_SOUND_SERVER", sid: test.params.sid });
    // end the saga
    store.dispatch(END);
    await store.sagaTask.toPromise();

    return {
      props: {so: "hi"},
      revalidate: 1
    }
  }
);

