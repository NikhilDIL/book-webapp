const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );

  app.use(
    '/books',
    createProxyMiddleware({
      target: 'https://www.googleapis.com',
      changeOrigin: true,
    })
  );
};