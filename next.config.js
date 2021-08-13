const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
 
dotenvLoad();
 
const withNextEnv = nextEnv();

module.exports = withNextEnv({
  reactStrictMode: true,
  images: {
    domains: ['soundshare-bucket.s3.us-east-2.amazonaws.com', 'licensebuttons.net']
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
});
