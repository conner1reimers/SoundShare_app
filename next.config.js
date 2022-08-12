const withPurgeCss = require("next-purgecss");
const withPlugins = require('next-compose-plugins')

module.exports = withPurgeCss({ 
  reactStrictMode: true,
  images: {
    domains: ['soundshare-bucket.s3.us-east-2.amazonaws.com', 'licensebuttons.net']
  },
  swcMinify: true, 
  

  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
      {
        source: '/privacypolicy',
        destination: '/cookiepolicy',
        permanent: true,
      },
    ]
  },
  
  

  webpack: (config, { isServer }) => {

    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.tls = false;
      config.resolve.alias['pg-native'] = false;
    }

    return config;

  },

  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }

  


});
