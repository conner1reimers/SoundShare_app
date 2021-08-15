import { Fragment } from 'react';
import Homepage from '../../components/Homepage/Homepage';
import Bottompage from '../../components/shared/Bottompage';
import { wrapper } from '../../store/wrapper';
import {fetchRecentSounds} from '../../store/actions/index';
import { END } from '@redux-saga/core';

export default function Home(props) {
  return (
    <Fragment>
      <Homepage {...props}/>
      <Bottompage/>
    </Fragment>
  )
}


// export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {

//     console.log("DAD")
//     store.dispatch(fetchRecentSounds())
//     store.dispatch(END);
//     await store.sagaTask.toPromise();

//     console.log("MOM")



//   // return {
//   //   props: {
//   //     dog: 'cat'
//   //   }
//   // }
// })


export const getServerSideProps = wrapper.getServerSideProps((store) =>
  async ({  req, res }) => {
    // regular stuff
    store.dispatch(fetchRecentSounds());
    // end the saga
    store.dispatch(END);
    await store.sagaTask.toPromise();

    
  }
);


// Home.getInitialProps = wrapper.getInitialPageProps(store => async ({pathname, req, res}) => {
//   // console.log('2. Page.getInitialProps uses the store to dispatch things');
//   await store.dispatch(fetchRecentSounds());
//   return{ props: {store: store.getState().recentSounds}}
// });


// export const getStaticProps = wrapper.getStaticProps((store) => async ({ req }) => {

//   console.log("DAD")
//   store.dispatch(fetchRecentSounds())
//   store.dispatch(END);
//   await store.sagaTask.toPromise();

//   console.log("MOM")



// // return {
// //   props: {
// //     dog: 'cat'
// //   }
// // }
// })

