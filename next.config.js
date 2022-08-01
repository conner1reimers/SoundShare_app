const withPurgeCss = require("next-purgecss");
const withPlugins = require('next-compose-plugins')

// const nextEnv = require('next-env');
// const dotenvLoad = require('dotenv-load');

// dotenvLoad();
 
// const withNextEnv = nextEnv();

// const plugins = [[withPurgeCss()]]

module.exports = withPurgeCss({ 
  webpack5: true,
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
  },
  env: {
    NEXT_PUBLIC_REACT_APP_MY_ENV: 'http://localhost:3000/api',
    NEXT_PUBLIC_REACT_APP_MASTER_EMAIL: 'connerreimers@gmail.com',
    NEXT_PUBLIC_REACT_APP_MASTER_PASS: '\\$2b\$12\$ZrFH7Eipn/7IRyLJySv9feIWSsm8oBvRJl.a7iBGDtSMC3L1N6oCW',
    NEXT_IMAGE_ALLOWED_DOMAINS:"cdn.sanity.io",
    NEXT_PUBLIC_GOOGLE_ANALYTICS:'UA-159042384-1',
    NEXT_PUBLIC_ENV_EMAIL:"soundsharehelp1@gmail.com",
    NEXT_PUBLIC_ENV_PASSWORD:"Chipkettle13",
    NEXT_PUBLIC_ENV_SESHSECRET:"9e5d630e-ac38-4cda-ab7f-bc5604d69475",
    NEXT_PUBLIC_ENV_AWSACCESS:"AKIAIRFKYHJG6FD2RSQQ",
    NEXT_PUBLIC_ENV_AWSSECRET:"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",
    NEXT_PUBLIC_ENV_PGHOST:"database-1.cy9yp9l7shrh.us-east-2.rds.amazonaws.com",
    NEXT_PUBLIC_ENV_PGPASS:"49DXqhkjeMBuGvnb",
    NEXT_PUBLIC_ENV_PGPORT:5432,
    NEXT_PUBLIC_ENV_MASTER_EMAIL:'connerreimers@gmail.com',
    NEXT_PUBLIC_ENV_MASTER_PASS:'$2b$12$ZrFH7Eipn/7IRyLJySv9feIWSsm8oBvRJl.a7iBGDtSMC3L1N6oCW',
    NEXT_PUBLIC_ENV_MASTER_ID:48,
    NEXT_PUBLIC_JWTSECRET:"01515290-140e-48f0-ad0d-f43b273f0d3d"
  }


});


// module.exports = ;