import { Fragment } from 'react';
import Homepage from '../../components/Homepage/Homepage';
import Bottompage from '../../components/shared/Bottompage';
import { wrapper } from '../../store/wrapper';
import { END } from '@redux-saga/core';
import { fetchRecentSoundsServer } from '../../store/actions/recentSounds';

export default function Home(props) {
  return (
    <Fragment>
      <Homepage {...props}/>
      <Bottompage/>
    </Fragment>
  )
}


export const getServerSideProps = wrapper.getServerSideProps((store) =>
  async ({  req, res }) => {
    // regular stuff
    store.dispatch(fetchRecentSoundsServer());
    // end the saga
    store.dispatch(END);
    await store.sagaTask.toPromise();

    
  }
);


