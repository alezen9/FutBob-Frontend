if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let c=Promise.resolve();return s[e]||(c=new Promise(async c=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=c}else importScripts(e),c()})),c.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},c=(c,s)=>{Promise.all(c.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(c)};self.define=(c,a,i)=>{s[c]||(s[c]=Promise.resolve().then(()=>{let s={};const n={uri:location.origin+c.slice(1)};return Promise.all(a.map(c=>{switch(c){case"exports":return s;case"module":return n;default:return e(c)}})).then(e=>{const c=i(...e);return s.default||(s.default=c),s})}))}}define("./sw.js",["./workbox-c2b5e142"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/W1oB-lwNLN2rDyWZv3HW5/_buildManifest.js",revision:"5829264df2f430dbff816d498c5ceddd"},{url:"/_next/static/W1oB-lwNLN2rDyWZv3HW5/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/_next/static/chunks/05d954cf.8d41d1e4546913478aa2.js",revision:"121516231c31eaba36119cd08f812c82"},{url:"/_next/static/chunks/27.e9598b0af5287c77bce8.js",revision:"a20eba217fafdf5f4734c019614d514b"},{url:"/_next/static/chunks/29107295.bf006cc94633d21eb3ce.js",revision:"993a553d70b0019acf04f1f3cb43aec3"},{url:"/_next/static/chunks/510b2beb4ce8c7699e8589b2bf0c8947186f345d.7b24adf49d7caa0ab747.js",revision:"a9da503d962396433f92c66ce6948785"},{url:"/_next/static/chunks/58c0ab64e51c57e33869f2d169ce7d91afd8d8dc.d7f6751e234ed353db75.js",revision:"072af95d9cc6c550a985c9a7d6f747c1"},{url:"/_next/static/chunks/61462487ed39836935975f7beb54299441f40e1d.754bbb5e7e762105e09d.js",revision:"d4c94238ca7d0a316976dc315bf27729"},{url:"/_next/static/chunks/75fc9c18.7b3c2b8dadda788e96be.js",revision:"2631c100392d6757ab4b60b72a5099fd"},{url:"/_next/static/chunks/7dd738f83399afffb05893c24ba34ce53bc0a70f.493a70517dc97a64070f.js",revision:"94e9bd0139995d94749c3e051a01df13"},{url:"/_next/static/chunks/a85576ca8f5b53394ad9eec67c7e83a1bbb5f7d2.0bb74f539323fd772cd8.js",revision:"8738b13deb6a2ef2ec5ac96c84a49e9c"},{url:"/_next/static/chunks/af13e98eae5ac9418b44da3112038e7b095a805b.58c31bdab1da8920a63b.js",revision:"d20ab3d9fcb77718862b24871d23fd38"},{url:"/_next/static/chunks/bf70d25de3d097be3d864636432245ee5c0f4232.4b3e7d1b460ffdfb2fba.js",revision:"76df9d9bcaf772a5a34bf414f32c9537"},{url:"/_next/static/chunks/c3761a72d8c0b6f518695aed21b7528c537f2fa3.0c877af26401d2085353.js",revision:"59aa4148ac055ceaac975035c4b7a185"},{url:"/_next/static/chunks/commons.ec8c934efa2c4867a654.js",revision:"b241e978ac1593d1a8ee5d130f9c9a71"},{url:"/_next/static/chunks/eee3ceadf85d598860b0e3c090fdf219157276ec.d1f03a920d14d48a8516.js",revision:"91b5fb8570748848468e7e5c786253a0"},{url:"/_next/static/chunks/framework.9c3a95562d3313e46372.js",revision:"55ebcf25d3ee46adeb366fcd30a715e2"},{url:"/_next/static/chunks/main-671ed02dfe4e42eee1ed.js",revision:"070ad2d821f474e337ea7265c3322d08"},{url:"/_next/static/chunks/pages/404-ed0fb0ec16e9b7e7aaf0.js",revision:"c4488ccb699eb38d117f2a74946f6157"},{url:"/_next/static/chunks/pages/_app-aabbd3a4b97d97d253bd.js",revision:"9c72edc0110afef1d1dfec19c6988db9"},{url:"/_next/static/chunks/pages/_error-24c80057024b2e48aa40.js",revision:"0a24ccbd91222cd354babb2ad1c924f7"},{url:"/_next/static/chunks/pages/index-82b3d569fe03e0abed18.js",revision:"fba6dcc406d5c7ac39b98d158fb57ea6"},{url:"/_next/static/chunks/pages/login-1c930fbb36be1f74d3e3.js",revision:"a65da65601e27aeb74ad6cb61baaefe1"},{url:"/_next/static/chunks/pages/matches-1e249dde5ecca65c45e3.js",revision:"18b7f05eccee3edc72550d3223f2b24b"},{url:"/_next/static/chunks/pages/players-0467d2d3f704be00d3ca.js",revision:"6cf4660a89ee381f9aa3911edf6450f2"},{url:"/_next/static/chunks/pages/players/%5Bid%5D-90b1e2d4625f4a824a95.js",revision:"8207e0aaa9b034140f7ef1445dbfcfe4"},{url:"/_next/static/chunks/pages/players/create-da8d8aac8b89336fdf9c.js",revision:"1a2e668adddefd29f009aad902b0ad0b"},{url:"/_next/static/chunks/pages/profile-b17d8c6cd6df14f20a9e.js",revision:"7434044d7e1854b85719644588234280"},{url:"/_next/static/chunks/polyfills-8bebc7aacc0076174a73.js",revision:"47efb5c5cc01d41ee831687292e8cd68"},{url:"/_next/static/chunks/webpack-3d50750314384a823c61.js",revision:"1d7e070054d13ec2fe579eaf7ca992fd"},{url:"/_next/static/css/13b3655f4f160b8812b7.css",revision:"77d25983aed4462b6687cc11ed7fc7b5"},{url:"/android-chrome-192x192.png",revision:"6d5849fc82dee3e27cf1b1873d59e634"},{url:"/android-chrome-512x512.png",revision:"170af7020af7971626089189bc4500b7"},{url:"/apple-touch-icon.png",revision:"bb216bd5453ebc0b62028f3d3601de56"},{url:"/assets/deadpool.png",revision:"8805ce0884e1855ea494a0b30c31ce9d"},{url:"/assets/grass.jpg",revision:"912b820652438768db79cf6b7fe3cdf6"},{url:"/assets/parquet.jpg",revision:"db03813ccb31c9c94d63bfc36af8af1a"},{url:"/browserconfig.xml",revision:"287419f7ecaf619dce044c60c9df248e"},{url:"/favicon-16x16.png",revision:"edfb6f2430e6ed00fd09cd4cc1d22468"},{url:"/favicon-32x32.png",revision:"e74d416a8e7c7c5a266e1f5bce0b1057"},{url:"/favicon.ico",revision:"b71519ede0ecfe25a13bdc4b87c73430"},{url:"/fonts/Poppins/Poppins-Black.ttf",revision:"42cf9f0820d16f3ac2c26a7710ce70f2"},{url:"/fonts/Poppins/Poppins-BlackItalic.ttf",revision:"16dc9819cb371f042475ae8b0c309cba"},{url:"/fonts/Poppins/Poppins-Bold.ttf",revision:"c23534acbeddbaadfd0ab2d2bbfdfc84"},{url:"/fonts/Poppins/Poppins-BoldItalic.ttf",revision:"5bda2710554b202e3e69cf2ec4e0e663"},{url:"/fonts/Poppins/Poppins-ExtraBold.ttf",revision:"6b78c7ec468eb0e13c6c5c4c39203986"},{url:"/fonts/Poppins/Poppins-ExtraBoldItalic.ttf",revision:"e59d32640b0023d4c484239b189e1f01"},{url:"/fonts/Poppins/Poppins-ExtraLight.ttf",revision:"8ea2657f263b6b2a404bfb57f4160013"},{url:"/fonts/Poppins/Poppins-ExtraLightItalic.ttf",revision:"f5080ea9cccdd72a62241b2410f1b773"},{url:"/fonts/Poppins/Poppins-Italic.ttf",revision:"89c81a3cbc00c32cbe1b28561029be0d"},{url:"/fonts/Poppins/Poppins-Light.ttf",revision:"2a47a29ceb33c966c8d79f8d5a5ea448"},{url:"/fonts/Poppins/Poppins-LightItalic.ttf",revision:"926a872e20b6555f4d2a395d6d1bc01e"},{url:"/fonts/Poppins/Poppins-Medium.ttf",revision:"ba95810b56f476990ca71d15139d5111"},{url:"/fonts/Poppins/Poppins-MediumItalic.ttf",revision:"9e911c68b683bfce45bb6effc5403b1d"},{url:"/fonts/Poppins/Poppins-Regular.ttf",revision:"41e8dead03fb979ecc23b8dfb0fef627"},{url:"/fonts/Poppins/Poppins-SemiBold.ttf",revision:"342ba3d8ac29ac8c38d7cef8efbf2dc9"},{url:"/fonts/Poppins/Poppins-SemiBoldItalic.ttf",revision:"0fc816cbaaddf3d5b8c6b00c4acddf58"},{url:"/fonts/Poppins/Poppins-Thin.ttf",revision:"c0fafa8397437c95848724aed686d63b"},{url:"/fonts/Poppins/Poppins-ThinItalic.ttf",revision:"272bb70478d0d2c7fc9b4d6c948b5f18"},{url:"/html_code.html",revision:"936b799f41a0f95ebb9a2ba34099a423"},{url:"/manifest.json",revision:"f86f768c9d1b007f5bddbeff2c68c20b"},{url:"/mstile-150x150.png",revision:"96293982fe70c883641bdf1eba22cbec"},{url:"/safari-pinned-tab.svg",revision:"4a29339db25bfebdb5534eee86fe15d0"},{url:"/site.webmanifest",revision:"1ebc2073b0fcb33732d7474366e18da0"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
