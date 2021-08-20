import { useRouter } from 'next/router'
import React, {Fragment, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { isUserPageLoading } from "../../store/selectors";
// import Media from "react-media";
import LoadingAnimation from '../../components/animatedLoaders/LoadingAnimation/LoadingAnimation';
import UserBig from '../../components/userComponents/UserPageVersions/UserBig';
import UserSmall from '../../components/userComponents/UserPageVersions/UserSmall';
import { END } from 'redux-saga';
import { wrapper } from '../../store/wrapper';
import { fetchUser } from '../../store/actions';
import db from '../../server/util/queries';
import { fetchUserServer } from '../../store/actions/user';
import { Media, MediaContextProvider } from "../../util/media"


export default function User(props) {
 const isPageLoading = useSelector((state) => {
  return isUserPageLoading(state);
 });
 const dispatch = useDispatch();
 const userInfo = useSelector((state) => state.userPage);
 const router = useRouter();
 const {uid} = router.query;
 const mainLoader = useSelector((state) => state.ui.mainLoader)

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
    if(mainLoader) {
      dispatch({type: "MAIN_LOADER_FINISH"})
    }
    
  }, [uid, userInfo, dispatch])

 

  return (
    <Fragment>

        <Fragment>
          <LoadingAnimation loading={isPageLoading} />

          <MediaContextProvider>
              <Media between={["xs", "sm"]}>
                <UserSmall/>
              </Media>
              <Media greaterThanOrEqual="lg">
                <UserBig/>
              </Media>
          </MediaContextProvider>
          
        </Fragment>

        </Fragment>
  )
}

export async function getStaticPaths() {
  // const userList = await sendRequest(`${process.env.NEXT_PUBLIC_REACT_APP_MY_ENV}/users/getids`);

  const getUsers = "SELECT id FROM users";  

  let foundUsers;
  let response;

  try {
    foundUsers = await db.query(getUsers);
  } catch (err) {
    const error = HttpError(err, 500, res);
    return next(error);
  }
  
  const pathList = foundUsers.rows.map(el => {
    return {
      params: {uid: el.id}
    }
  })

  return {
    paths: pathList,
    fallback: 'blocking'
  }
}

export const getStaticProps = wrapper.getStaticProps((store) =>
  async ({  req, res, ...ctx }) => {

    // regular stuff
    store.dispatch(fetchUserServer(ctx.params.uid));
    // end the saga
    store.dispatch(END);
    await store.sagaTask.toPromise();

    return {
      props: {so: "hi"},
      revalidate: 1
    }
  }
);
