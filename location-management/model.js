'use strict';

var validator = require('is-my-json-valid');

var locationModel = module.exports = validator({
  required: true,
  type: 'object',
  properties: {
    name: {
      required: true,
      type: 'string'
    },
    address: {
      required: true,
      type: 'string'
    },
    id: {
      required: true,
      type: 'number'
    }
  }
});
