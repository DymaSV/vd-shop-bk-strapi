'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const env = require('dotenv').config({ path: require('find-config')('.env') });
const languages = env.parsed["LANGUAGES"];
const defaultLanguage = env.parsed["DEFAULT_LANGUAGE"];
const isActive = getActiveStatus();

function getActiveStatus() {
    let isActive = env.parsed["IS_ACTIVE"];
    if (isActive === 'true') {
        return true;
    }
    if (isActive === 'false') {
        return false;
    }
    return null;
}

function getLanguage(ctx) {
    if (!languages.includes(ctx.params.lang)) {
        return defaultLanguage
    }
    return ctx.params.lang;
}

module.exports = {

    //Get all categories, not based on language
    //"path": "/categories"
    async findAll(ctx) {
        const knex = strapi.connections.default;
        const result = knex('categories')
            .select(
                "id",
                "IdCategory as idCategory",
                "IdParentCategory as idParentCategory",
                'Name as name',
                'Information as information'
            )
        if (isActive !== null) {
            result.where('IsActive', isActive)
        }
        return await result;
    },

    //Get all categories, based on language
    //"path": "/:lang/categories"
    async find(ctx) {
        let lang = getLanguage(ctx);
        
        const knex = strapi.connections.default;
        const result = knex('categories')
            .select(
                "id",
                "IdCategory as idCategory",
                "IdParentCategory as idParentCategory",
                knex.raw('??->? as name', ['Name', lang]),
                knex.raw('??->? as information', ['Information', lang])
            )
        if (isActive !== null) {
            result.where('IsActive', isActive)
        }
        return await result;
    },

    //Get main categories, based on language. Categories wich don't have IdParentCategory.
    //"path": "/:lang/categories/getMainCategories"
    async getMainCategories(ctx) {
        let lang = getLanguage(ctx);
        
        const knex = strapi.connections.default;
        let result = knex('categories')
            .select(
                "id",
                "IdCategory as idCategory",
                "IdParentCategory as idParentCategory",
                knex.raw('??->? as name', ['Name', lang]),
                knex.raw('??->? as information', ['Information', lang])
            ).where(function () {
                this.where('IdParentCategory', null).orWhere('IdParentCategory', "")
            })
        if (isActive !== null) {
            result.andWhere('IsActive', isActive)
        }
        return await result;
    },

    //Get categories, based on language and IdParentCategory. Nested categories wich have IdParentCategory.
    //"path": "/:lang/categories/getNestedCategories/:parentId"
    async getNestedCategories(ctx) {
        let parentId = ctx.params.parentId;
        let lang = getLanguage(ctx);

        const knex = strapi.connections.default;
        const result = knex('categories')
            .select(
                "id",
                "IdCategory as idCategory",
                "IdParentCategory as idParentCategory",
                knex.raw('??->? as name', ['Name', lang]),
                knex.raw('??->? as information', ['Information', lang])
            ).where('IdParentCategory', parentId)
        if (isActive !== null) {
            result.andWhere('IsActive', isActive)
        }
        return await result;
    },
};

