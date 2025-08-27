// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NEXT_PUBLIC_ENABLE_PWA !== 'true', // keep PWA off unless you opt in
  register: process.env.NEXT_PUBLIC_ENABLE_PWA === 'true',
  scope: '/',
  maximumFileSizeToCacheInBytes: 10_000_000, // 10MB
  sourcemap: false,
})

const RESET_COLOR = '\x1b[0m'
const GREEN_TEXT = '\x1b[32m'

const getApiUrl = (config = '') => {
  console.log(`${GREEN_TEXT}[CXB] ${config} config env: ${process.env.ENV}${RESET_COLOR}`)
  console.log(`${GREEN_TEXT}[CXB] Listening on port ${process.env.PORT || 3000}${RESET_COLOR}`)
  switch (process.env.ENV || 'test') {
    case 'test':
    case 'production':
    default:
      return 'http://localhost:7001'
  }
}

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // good on Node 18/20

  // Prefer env vars over runtimeConfig (which is deprecated)
  env: {
    NEXT_PUBLIC_API_URL: getApiUrl('public'),
    ENV: process.env.ENV,
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/login',
        permanent: false,
      },
    ]
  },
}

module.exports = withPWA(nextConfig)