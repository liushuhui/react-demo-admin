const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      //  /api  前缀的请求，就会触发概代理
      target: "http://localhost:3000", //  请求转发给谁
      changeOrigin: true, //  控制服务器收到的请求头中Host的值 默认值 false
      pathRewrite: {
        "^/api": "", //  重写请求前缀
      },
    })
  );
};
