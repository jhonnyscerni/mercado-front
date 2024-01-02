const PROXY_CONFIG = [
    {
      context:['/api'],
      target:'http://localhost:3000/',
      pathRewrite:{'^/api':''}
    }
  ];
  
  module.exports = PROXY_CONFIG;