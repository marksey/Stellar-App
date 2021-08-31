//This is a manual proxy setup instead of using 
//a one size fits all for every link in the React app
//If you want that instead, just add
//"proxy": "http://localhost:3001" to package.json file in client folder

const createProxyMiddleware  = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/server',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  );
};

