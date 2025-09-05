// Optional: Proxy for development so frontend requests to /api go to backend
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use('/api', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));
};
