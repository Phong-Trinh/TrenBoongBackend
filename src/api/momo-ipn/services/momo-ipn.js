'use strict';

/**
 * momo-ipn service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::momo-ipn.momo-ipn');
