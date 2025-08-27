const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NEXT_PUBLIC_ENABLE_PWA !== 'true', // keep PWA off unless you opt in
  register: process.env.NEXT_PUBLIC_ENABLE_PWA === 'true',
  scope: '/',
  maximumFileSizeToCacheInBytes: 10_000_000, // 10MB
  sourcemap: false,
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7001',
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