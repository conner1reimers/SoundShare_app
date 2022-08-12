import "../styles/base.scss";
import Head from 'next/head'
import MainHead from "../components/global/MainHead";
import GlobalSound from '../components/shared/Modals/GlobalSound';
import React from 'react';
import {wrapper} from '../store/wrapper';




const MyApp = ({ Component, pageProps}) => {


    return (
        <> 
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,shrink-to-fit=no"/>
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Share and Download sounds, sound effects, loops, stock audio and more with other creators, all for free, check our terms of use for information about copyright. Download new sounds, loops, and effects for your music, movies, games and more. Add effects to any sound quick and easy through SoundShare!"
          />
        </Head>

          

            <div className="root-app-container">
              <MainHead/>
              <Component {...pageProps} />
              <GlobalSound/>
            </div>

         
        </>
    )
  
}


export default wrapper.withRedux(MyApp)
