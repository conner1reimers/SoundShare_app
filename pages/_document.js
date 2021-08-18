import Document, { Html, Head, Main, NextScript } from 'next/document'
import Bottompage from '../components/shared/Bottompage'
import {mediaStyles} from '../util/media'
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link href="https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script data-ad-client="ca-pub-3538724927778129" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <style
            type="text/css"
            dangerouslySetInnerHTML={{ __html: mediaStyles }}
          />
        </Head>

        <body>
          
          <Main />
            
          
          <div id="burger-hook"></div>
          <div id="sound-hook"></div>
          <div id="global-msg-hook"></div>
          <div id="sidedrawer-hook"></div>
          <div id="modal-hook"></div>
          <div id="modal-hook-store"></div>
          <div id="backdrop-hook"></div>
          <div id="backdrop-hook2"></div>
          <div id="backdrop-hook3"></div>
          <div id="loading-hook"></div>
          <div id="fx-sidewindow-hook"></div>
          <div id="fx-bottom-hook"></div>
          <div id="mouseover-hook"></div>
          <div id="tile-hook"></div>
          <div id="upload-submit-hook"></div>
          <div id="mobile-smallmodal-hook"></div>
          <div id="fx-play-hook"></div>
          <div id="backdrop-main-hook"></div>
          <NextScript />

          
        </body>
      </Html>
    )
  }
}

export default MyDocument