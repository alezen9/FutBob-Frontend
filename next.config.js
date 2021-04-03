const withPWA = require('next-pwa')

const getApiUrl = (config = '') => {
  console.log(`${config} config env: `, process.env.ENV)
  console.log(`Listening on port ${process.env.PORT || 3000}`)
  switch (process.env.ENV || 'test') {
    case 'test':
      return 'https://futbob.xyz/'
      // return 'http://localhost:7000'
    case 'production':
      return 'https://futbob.xyz/'
    default:
      return 'http://localhost:7000'
  }
}

module.exports = withPWA({
  future: {
    webpack5: true
  },
  serverRuntimeConfig: {
    API_URL: getApiUrl('server')
  },
  publicRuntimeConfig: {
    API_URL: getApiUrl('public'),
    NODE_ENV: process.env.NODE_ENV,
    ENV: process.env.ENV
  },
  devIndicators: {
    autoPrerender: false
  },
  pwa: {
    disable: process.env.ENV !== 'production',
    register: process.env.ENV !== 'production',
    dest: 'public',
    maximumFileSizeToCacheInBytes: 10000000, // 10MB
    sourcemap: process.env.ENV === 'test'
  }
})
