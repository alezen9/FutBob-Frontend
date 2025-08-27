// next.config.js
const RESET_COLOR = '\x1b[0m';
const GREEN_TEXT = '\x1b[32m';

const enablePWA = process.env.NEXT_PUBLIC_ENABLE_PWA === 'true';

const getApiUrl = (config = '') => {
  console.log(`${GREEN_TEXT}[CXB] ${config} config env: ${process.env.ENV}${RESET_COLOR}`);
  console.log(`${GREEN_TEXT}[CXB] Listening on port ${process.env.PORT || 3000}${RESET_COLOR}`);
  switch (process.env.ENV || 'test') {
    case 'test':
    case 'production':
    default:
      return 'http://localhost:7001';
  }
};

// Initialize next-pwa with its own options:
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: !enablePWA,
  register: enablePWA,
  scope: '/',
  maximumFileSizeToCacheInBytes: 10_000_000,
  sourcemap: false,
  // dynamicStartUrlRedirect: '/auth/login' // <- remove (not a supported option)
});

const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: getApiUrl('public'),
    ENV: process.env.ENV,
  },
};

module.exports = enablePWA ? withPWA(nextConfig) : nextConfig;