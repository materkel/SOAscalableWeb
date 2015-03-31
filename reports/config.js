'use strict'
/**
 * Reports Service Config
 */
module.exports = {
  environment: process.env.NODE_ENV || 'production',
  hostname: process.env.hostname,
  port: 3003,
  // config for external services
  services: {
    auth: {
      hostname: 'localhost',
      port: 3000,
      path: '/user'
    },
    locations: {
      hostname: 'localhost',
      port: 3001,
      path: '/locations'
    },
    items: {
      hostname: 'localhost',
      port: 3002,
      path: '/items'
    }
  }
};
