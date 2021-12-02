var HttpsProxyAgent = require("https-proxy-agent");
var proxyConfig = [
  {
    context: "/api/*",
    target: "https://webapi.portside.sbs/api",
    secure: false,
    changeOrigin: true,
    logLevel: "debug"
  },
  {
  context: '/.well-known',
  target: 'https://identity.portside.sbs/.well-known',
  secure: false,
  changeOrigin: true,
  logLevel: 'debug'
  }
];


function setupForCorporateProxy(proxyConfig) {
  var proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
  if (proxyServer) {
    var agent = new HttpsProxyAgent(proxyServer);
    console.log("Using corporate proxy server: " + proxyServer);
    proxyConfig.forEach(function (entry) {
      entry.agent = agent;
    });
  }
  return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);
