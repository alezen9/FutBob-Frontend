import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'

export default class MyDocument extends Document {
  render () {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />

          <meta name='description' content='Backoffice di Condexo S.R.L.' />
          <meta name='keywords' content='Keywords' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-title' content='CX Backoffice' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
          <meta name='application-name' content='CX Backoffice' />
          <meta name='msapplication-tooltip' content='Condexo Backoffice' />
          <meta name='msapplication-starturl' content='/' />
          <meta name='msapplication-tap-highlight' content='no' />

          <link rel='manifest' href='/manifest.json' />

          <link rel='apple-touch-icon' href='/images/apple/dark/apple-touch-icon-iphone-60x60.png' />
          <link rel='apple-touch-icon' sizes='60x60' href='/images/apple/dark/apple-touch-icon-ipad-76x76.png' />
          <link rel='apple-touch-icon' sizes='114x114' href='/images/apple/dark/apple-touch-icon-iphone-retina-120x120.png' />
          <link rel='apple-touch-icon' sizes='144x144' href='/images/apple/dark/apple-touch-icon-ipad-retina-152x152.png' />

          <link rel='icon' type='image/png' sizes='192x192' href='/android-icon-192x192.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='96x96' href='/favicon-96x96.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />

          <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
          <link rel='icon' href='/favicon.ico' type='image/x-icon' />
          <meta name='theme-color' content='#ff375f' />

          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          />
          <style global jsx>
            {`
            @font-face {
              font-family: Poppins;
              src: url('/fonts/Poppins/Poppins-Regular.ttf') format('truetype');
            }
            
            @font-face {
              font-family: Poppins;
              src: url('/fonts/Poppins/Poppins-Bold.ttf') format('truetype');
              font-weight: bold;
            }
            
            @font-face {
              font-family: Poppins;
              src: url('/fonts/Poppins/Poppins-Italic.ttf') format('truetype');
              font-style: italic;
            }
            
            @font-face {
              font-family: Poppins;
              src: url('/fonts/Poppins/Poppins-BoldItalic.ttf') format('truetype');
              font-style: italic;
              font-weight: bold;
            }

            ::-webkit-scrollbar {
              /* width: 4px; */
              width: 0;
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
            @media all and (display-mode: standalone) {
              body::after {
                position: fixed;
                top: -80px;
                left: 0;
                width: 100vw;
                height: 80px;
                content: " ";
                backdrop-filter: blur(20px);
                background-color: rgba(0,0,0,.3);
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
            }`}
          </style>
        </Head>
        <body>
          <noscript>
            You need to enable JavaScript to run this app.
          </noscript>
          <Main />
          <NextScript />
          {/* <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyAKgYkl0eoObprgXkXU_Xd6ZqYJMvPaNZ8&libraries=places' /> */}
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
  }
}
