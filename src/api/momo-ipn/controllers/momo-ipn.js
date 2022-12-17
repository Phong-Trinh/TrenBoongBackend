'use strict';

/**
 * momo-ipn controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::momo-ipn.momo-ipn',
({ strapi }) => ({
  async create(ctx) {
    ctx.request.body = {data: ctx.request.body};
    const response = await super.create(ctx);
    return response;
  }
}));
