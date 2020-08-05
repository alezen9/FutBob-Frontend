const withPWA = require('next-pwa')

const getApiUrl = (config = '') => {
  console.log(`${config} config env: `, process.env.ENV)
  console.log(`Listening on port ${process.env.PORT || 3000}`)
  switch (process.env.ENV || 'test') {
    case 'test':
      return 'http://localhost:7000'
    case 'production':
      return 'http://localhost:7000'
    default:
      return 'http://localhost:7000'
  }
}

module.exports = withPWA({
  serverRuntimeConfig: {
    API_URL: getApiUrl('server')
  },
  publicRuntimeConfig: {
    API_URL: getApiUrl('public')
  },
  devIndicators: {
    autoPrerender: false
  },
  pwa: {
    disable: process.NODE_ENV !== 'production',
    register: process.NODE_ENV === 'production',
    dest: 'public',
    maximumFileSizeToCacheInBytes: 3000000, // 3MB
    sourcemap: false
  }
})
