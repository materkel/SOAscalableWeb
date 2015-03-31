'use strict'
// tem-tracking Service Config
module.exports = {
  environment: process.env.NODE_ENV || 'production',
  hostname: process.env.hostname,
  port: 3002,
  // config for external services
  services: {
    auth: {
      hostname: 'localhost',
      port: 3000,
      path: '/user'
    }
  }
};
