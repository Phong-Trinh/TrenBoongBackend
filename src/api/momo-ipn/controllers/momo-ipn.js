'use strict';

/**
 * momo-ipn controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::momo-ipn.momo-ipn',
({ strapi }) => ({
  async create(ctx) {
    // some logic here
    console.log(ctx.request.body);
    ctx.request.body = {data: ctx.request.body};
    const response = await super.create(ctx);
    // some more logic

    return response;
  }
}));
