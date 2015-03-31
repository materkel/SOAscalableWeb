'use strict';

var validator = require('is-my-json-valid');

var itemModel = module.exports = validator({
  required: true,
  type: 'object',
  properties: {
    name: {
      required: true,
      type: 'string'
    },
    location: {
      required: true,
      type: 'number'
    },
    id: {
      required: true,
      type: 'number'
    }
  }
});
