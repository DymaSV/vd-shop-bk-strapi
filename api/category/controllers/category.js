'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require('strapi-utils');
const env = require('dotenv').config({ path: require('find-config')('.env') });
const languages = env.parsed["LANGUAGES"]
const defaultLanguage = env.parsed["DEFAULT_LANGUAGE"]
module.exports = {

    //Get all categories, not based on language
    //"path": "/categories"
    async findAll(ctx) {
        let entities = await strapi.query('category').find();
        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.category }));
    },

    //Get all categories, based on language
    //"path": "/:lang/categories"
    async find(ctx) {
        let lang = ctx.params.lang;
        if (!languages.includes(lang)) {
            lang = defaultLanguage
        }
        const knex = strapi.connections.default;
        const result = await knex('categories')
            .select(
                "id",
                "IdCategory",
                "IdParentCategory",
                knex.raw('??->? as name', ['Name', lang]),
                knex.raw('??->? as information', ['Information', lang])
            )
        return result;
    },

    //Get main categories, based on language. Categories wich don't have IdParentCategory.
    //"path": "/:lang/categories/getMainCategories"
    async getMainCategories(ctx) {
        let lang = ctx.params.lang;
        if (!languages.includes(lang)) {
            lang = defaultLanguage
        }
        const knex = strapi.connections.default;
        const entities = await knex('categories')
            .select(
                "id",
                "IdCategory",
                "IdParentCategory",
                knex.raw('??->? as name', ['Name', lang]),
                knex.raw('??->? as information', ['Information', lang])
            ).where(function () {
                this.where('IdParentCategory', null).orWhere('IdParentCategory', "")
            })
        return entities;
    },

    //Get categories, based on language and IdParentCategory. Nested categories wich have IdParentCategory.
    //"path": "/:lang/categories/getNestedCategories/:parentId"
    async getNestedCategories(ctx) {
        let lang = ctx.params.lang;
        let parentId = ctx.params.parentId;
        if (!languages.includes(lang)) {
            lang = defaultLanguage
        }
        const knex = strapi.connections.default;
        const entities = await knex('categories')
            .select(
                "id",
                "IdCategory",
                "IdParentCategory",
                knex.raw('??->? as name', ['Name', lang]),
                knex.raw('??->? as information', ['Information', lang])
            ).where('IdParentCategory', parentId)
        return entities;
    },
};

