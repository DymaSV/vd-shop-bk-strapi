'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils');

module.exports = {
    // async find(ctx) {
    //     console.log(strapi.models.category)

    //     const entity = await strapi.services.category.find();
    //     // return sanitizeEntity(entity, { model: strapi.models.category });
    //     return await strapi
    //         .query('category')
    //         .model.query(qb => {
    //             qb.where('id', 1);
    //         })
    //         .fetch();
    // },
};
