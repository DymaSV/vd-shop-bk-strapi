
const env = require('dotenv').config({ path: require('find-config')('.env') });
const languages = env.parsed["LANGUAGES"];
const defaultLanguage = env.parsed["DEFAULT_LANGUAGE"];



module.exports = {
    getActiveStatus: () => {
        let isActive = env.parsed["IS_ACTIVE"];
        if (isActive === 'true') {
            return true;
        }
        if (isActive === 'false') {
            return false;
        }
        return null;
    },
    getLanguage: (ctx) => {
        if (!languages.includes(ctx.params.lang)) {
            return defaultLanguage
        }
        return ctx.params.lang;
    }
}