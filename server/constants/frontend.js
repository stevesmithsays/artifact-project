const FRONTEND_DEV_URLS = ['http://localhost:3000'];

const FRONTEND_PROD_URLS = ['https://www.artifact.store'];

module.exports = process.env.NODE_ENV === 'production'? FRONTEND_PROD_URLS: FRONTEND_DEV_URLS;

//URLs above will later be used for creating a whitelist for CORS

//In testing, only the frontend dev urls matter, but when bundled for production, you need your production url for your actual domain and site that will be hosting the project
