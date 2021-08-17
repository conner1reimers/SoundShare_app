import { useRouter } from 'next/router'
import React, {Fragment, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { isUserPageLoading } from "../../store/selectors";
import Media from "react-media";
import LoadingAnimation from '../../components/animatedLoaders/LoadingAnimation/LoadingAnimation';
import UserBig from '../../components/userComponents/UserPageVersions/UserBig';
import UserSmall from '../../components/userComponents/UserPageVersions/UserSmall';
import { END } from 'redux-saga';
import { wrapper } from '../../store/wrapper';
import { fetchUser } from '../../store/actions';



export default function User(props) {
 const isPageLoading = useSelector((state) => {
  return isUserPageLoading(state);
 });
 const dispatch = useDispatch();
 const userInfo = useSelector((state) => state.userPage);
 const router = useRouter();
 const {uid} = router.query;

  useEffect(() => {
    dispatch({type: "MAIN_LOADER_FINISH"})
    return () => {
      if (userInfo.loaded) {
        dispatch({ type: "RESET_USER" });
      }
    };
  }, [userInfo.loaded, dispatch]);

  useEffect(() => {
    if (userInfo && (uid != userInfo.user.id)) {
      dispatch(fetchUser(uid));
    }
    
  }, [uid, userInfo, dispatch])

 

  return (
    <Fragment>

        <Fragment>
          <LoadingAnimation loading={isPageLoading} />

        <Media queries={{
              small: "(max-width: 1099px)",
              big: "(min-width: 1100px)",
             
            }}>

            {(matches) => (
              <Fragment>
                {matches.big ? (
                  <UserBig/> )
                  : (
                  <UserSmall/>)}
                  
                

                
                </Fragment>)}
          </Media>
        </Fragment>

        </Fragment>
  )
}

// const sendRequest = async (url, method = 'GET', body = null, headers = {}) => {
//   try {       
//     const response = await fetch(url, {
//         method,
//         body,
//         headers,
//         credentials: 'same-origin'

//     }, );
//     const responseData = await response.json();
   
//     if (!response.ok) {
//         throw new Error(responseData.message);
//     }
//     return responseData;
// }
//     // CATCH
//     catch (err) {
//       throw err;
//   }
// }

// export async function getStaticPaths() {
//   const userList = await sendRequest(`${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/users/getids`);
  
//   const pathList = userList.map(el => {
//     return {
//       params: {uid: el.id}
//     }
//   })

//   console.log(`pathlist: ${pathList}`)

//   return {
//     paths: pathList,
//     fallback: false
//   }
// }

// export const getStaticProps = wrapper.getStaticProps((store) =>
//   async ({  req, res, ...ctx }) => {

//     // regular stuff
//     store.dispatch(fetchUser(ctx.params.uid));
//     // end the saga
//     store.dispatch(END);
//     await store.sagaTask.toPromise();

//     return {
//       props: {so: "hi"},
//       revalidate: 1
//     }
//   }
// );


// export async function getStaticProps(context){
//     const soundId = context.params.sid;
//     // regular stuff

//     // store.dispatch(fetchRecentSounds());
//     // end the saga

//     // store.dispatch(END);
//     // await store.sagaTask.toPromise();
    

//     const fetchSoundInfo = async () => {
//       if (soundId) {
//         let response;
  
//         // try {
//         //   response = await sendRequest(
//         //     `${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/sounds/${soundId}`
//         //   );



//         //   // setSoundInfo({
//         //   //   sound: response.sound,
//         //   //   comments: response.comments,
//         //   //   offset: response.comments.length,
//         //   //   refreshFinished: response.comments.length !== 20
//         //   // });
  
//         //   // if (!gpuTier.isMobile) {
//         //   //   dispatch(setGlobalSound(response.sound));
//         //   // } 
          
//         //   // if (userId) {
//         //   //   if (response.sound.favs.indexOf(userId.toString()) !== -1) {
//         //   //     setFaved(true);
//         //   //   }
//         //   // }
//         //   return {
//         //     sound: response.sound,
//         //     comments: response.comments,
//         //     offset: response.comments.length,
//         //     refreshFinished: response.comments.length !== 20
//         //   }
//         // } catch (err) {}
//       }
//     };


//     let response = await fetchSoundInfo();
//     console.log(`responz - response}`)
//     return {props: {response: ''}};


    
// };
