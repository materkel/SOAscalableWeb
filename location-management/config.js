'use strict'
// Location-Management Service Config
module.exports = {
  environment: process.env.NODE_ENV || 'production',
  hostname: process.env.hostname,
  port: 3001,
  // config external services
  services: {
    auth: {
      hostname: 'localhost',
      port: 3000,
      path: '/user'
    }
  }
};
