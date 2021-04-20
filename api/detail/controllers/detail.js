'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const _ = require('lodash');
const env = require('dotenv').config({ path: require('find-config')('.env') });
const extension = require('../../utilities/extension.js');

module.exports = {
    async find(ctx) {
        let lang = extension.getLanguage(ctx);
        
        const knex = strapi.connections.default;
        const result = knex('details')
            .select(
                knex.raw('??->? as text', ['Text', lang]),
                knex.raw('??->? as title', ['Title', lang])
            )
        if (isActive !== null) {
            result.andWhere('IsActive', isActive)
        }
        return await result;
    },
};

