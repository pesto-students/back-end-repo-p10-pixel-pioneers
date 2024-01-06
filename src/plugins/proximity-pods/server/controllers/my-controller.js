'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('proximity-pods')
      .service('myService')
      .getWelcomeMessage();
  },
});
