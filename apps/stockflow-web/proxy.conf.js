module.exports = {
  "/api/v1/copilot": {
    target: "http://127.0.0.1:8300",
    secure: false,
    changeOrigin: true,
    logLevel: "debug"
  },
  "/api": {
    target: "http://127.0.0.1:8080",
    secure: false,
    changeOrigin: true,
    logLevel: "debug"
  },
  "/gemini-api": {
    target: "https://generativelanguage.googleapis.com",
    secure: true,
    changeOrigin: true,
    pathRewrite: {
      "^/gemini-api": ""
    },
    onProxyReq: function(proxyReq, req, res) {
      console.log('Proxying to Gemini API: ' + req.url);
      console.log('Headers: ', proxyReq.getHeaders());
      // Strip Origin and Referer headers to bypass API key restrictions
      proxyReq.removeHeader('Origin');
      proxyReq.removeHeader('Referer');
    },
    logLevel: "debug"
  }
};
