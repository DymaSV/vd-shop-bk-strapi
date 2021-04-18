'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
// const { sanitizeEntity } = require('strapi-utils');
const _ = require('lodash');
const lang_env = ['fr', 'en'];

module.exports = {
    async find(ctx) {
        let lang = ctx.params.lang;
        if(!lang_env.includes(lang)){
            lang = 'en'
        }
        const knex = strapi.connections.default;
        // const result1 = await knex('categories')
        // .select('Name')
        // console.log(result1)

        const result = await knex('categories')
            .select(knex.raw('??->? as name', ['Name', lang]), knex.raw('??->? as information', ['Information', lang]))
        console.log(result)
        return (_.groupBy(result, 'Name'));
    },
};

