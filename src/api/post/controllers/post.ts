/**
 * post controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::post.post', ({ strapi }) => ({
  async exampleAction(ctx) {
    try {
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  },
  async find(ctx) {
    // some custom logic here
    ctx.query = { ...ctx.query, }
    // Calling the default core action
    const { data, meta } = await super.find(ctx);
    const attrs = data.map(v => {
      return {
        id: v.id,
        ...v.attributes
      }
    })
    return { data: attrs, meta };
  },
  async findOne(ctx) {
    ctx.query = { ...ctx.query, }
    // Calling the default core action
    const { data } = await super.findOne(ctx);

    return { id: data.id, ...data.attributes };
  }
}));
