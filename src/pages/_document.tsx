import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@mui/styles'
import createEmotionServer from '@emotion/server/create-instance'
import { createEmotionCache } from '@_MUITheme'

export default class MyDocument extends Document {
   render() {
      return (
         <Html lang='en'>
            <Head>
               <meta charSet='utf-8' />
               <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
               <meta httpEquiv='X-UA-Compatible' content='IE=edge' />

               <meta name='description' content='J.A.R.V.I.S.' />
               <meta name='keywords' content='Keywords' />
               <meta name='mobile-web-app-capable' content='yes' />
               <meta name='apple-mobile-web-app-title' content='FutBob' />
               <meta name='apple-mobile-web-app-capable' content='yes' />
               <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
               <meta name='application-name' content='FutBob' />
               <meta name='msapplication-tooltip' content='FutBob' />
               <meta name='msapplication-starturl' content='/' />
               <meta name='msapplication-tap-highlight' content='no' />
               {/* Icons */}
               <link rel='apple-touch-icon' type='image/png' sizes='192x192' href='/icons/icon-192x192.png' />
               <link rel='icon' type='image/png' sizes='256x256' href='/icons/icon-256x256.png' />
               <link rel='icon' type='image/png' sizes='384x384' href='/icons/icon-384x384.png' />
               <link rel='icon' type='image/png' sizes='512x512' href='/icons/icon-512x512.png' />
               <link rel='mask-icon' href='/icons/safari-pinned.svg' color='#5bbad5' />
               {/* Favicon */}
               <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
               <link rel='icon' href='/favicon.ico' type='image/x-icon' />
               {/* Manifest */}
               <link rel='manifest' href='/manifest.json' />
               {/* Other */}
               <meta name='apple-mobile-web-app-title' content='FutBob' />
               <meta name='application-name' content='FutBob' />
               <meta name='msapplication-TileColor' content='#00aba9' />
               <meta name='theme-color' content='#222' />
               {/* Fonts */}
               {/* <link href='https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;700&display=swap' rel='stylesheet' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' /> */}
               <link rel='preconnect' href='https://fonts.gstatic.com' />
               <link href='https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600&display=swap' rel='stylesheet' />
               <style global jsx>
                  {`
               #__next {
                  overflow-x: hidden;
               }
               
               /* Change Autocomplete styles in Chrome*/
               input:-webkit-autofill,
               input:-webkit-autofill:hover,
               input:-webkit-autofill:focus,
               textarea:-webkit-autofill,
               textarea:-webkit-autofill:hover,
               textarea:-webkit-autofill:focus,
               select:-webkit-autofill,
               select:-webkit-autofill:hover,
               select:-webkit-autofill:focus {
                  -webkit-box-shadow: 0 0 0px 1000px rgba(0,0,0,.01) inset;
                  transition: background-color 5000s ease-in-out 0s;
                  -webkit-text-fill-color: white !important;
                  mix-blend-mode: exclusion;
               }

               #nprogress .bar {
                  background: #00695c !important;
                  background-color: #00695c !important;
               }

               #nprogress .spinner {
                  display: none;
               }

               ::-webkit-scrollbar {
                  width: 4px;
                  height: 4px;
               }

               ::-webkit-scrollbar-track {
                  background-color: transparent;
                  -webkit-border-radius: 10px;
                  border-radius: 10px;
               }

               ::-webkit-scrollbar-thumb {
                  -webkit-border-radius: 10px;
                  border-radius: 10px;
                  background: rgba(158, 158, 158, 0.5);
               }

               ::-webkit-calendar-picker-indicator {
                  filter: invert(50%);
               }
               @media all and (display-mode: standalone) {
                  body::after {
                     position: fixed;
                     top: -80px;
                     left: 0;
                     width: 100vw;
                     height: 80px;
                     content: ' ';
                     backdrop-filter: blur(20px);
                     background-color: rgba(0, 0, 0, 0.3);
                  }
                  ::-webkit-scrollbar {
                     display: none;
                  }
                  ::-webkit-scrollbar-track {
                     display: none;
                  }
                  ::-webkit-scrollbar-thumb {
                     display: none;
                  }
               }

               @media all and (max-width: 450px) {
                  ::-webkit-scrollbar {
                     display: none;
                  }
                  ::-webkit-scrollbar-track {
                     display: none;
                  }
                  ::-webkit-scrollbar-thumb {
                     display: none;
                  }
               }
            `}
               </style>
            </Head>
            <body>
               <noscript>You need to enable JavaScript to run this app.</noscript>
               <Main />
               <NextScript />
            </body>
         </Html>
      )
   }
}

MyDocument.getInitialProps = async ctx => {

   const sheets = new ServerStyleSheets()
   const originalRenderPage = ctx.renderPage
   const cache = createEmotionCache()
   const { extractCriticalToChunks } = createEmotionServer(cache)

   ctx.renderPage = () =>
      originalRenderPage({
         enhanceApp: (App: any) => (props) => <App emotionCache={cache} {...props} />,
      })

   const initialProps = await Document.getInitialProps(ctx)
   // This is important. It prevents emotion to render invalid HTML.
   // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
   const emotionStyles = extractCriticalToChunks(initialProps.html)
   const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
         data-emotion={`${style.key} ${style.ids.join(' ')}`}
         key={style.key}
         // eslint-disable-next-line react/no-danger
         dangerouslySetInnerHTML={{ __html: style.css }}
      />
   ))

   return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags]
   }
}
