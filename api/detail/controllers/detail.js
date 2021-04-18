'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const _ = require('lodash');
const env = require('dotenv').config({ path: require('find-config')('.env') });

module.exports = {
    async find(ctx) {
        let lang = ctx.params.lang;
        if (!env.parsed["LANG"].includes(lang)) {
            lang = 'en'
        }
        const knex = strapi.connections.default;
        const result = await knex('details')
            .select(
                knex.raw('??->? as text', ['Text', lang]),
                knex.raw('??->? as title', ['Title', lang])
            )
        console.log(result)
        return result;
    },
};

