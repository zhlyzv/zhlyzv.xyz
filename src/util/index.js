const slug = require('slug');

slug.defaults.mode = 'rfc3986';

/**
 * buildSlug - Pass string(s) as argument(s) and get a slug
 *
 * @example
 * buildSlug('/blog', 'vietnam', 'saigon') // returns '/blog/vietnam/saigon'
 * @param {(String|String[])} params
 * @returns {String} Returns a slug formed from the arguments
 */
const buildSlug = (...params) =>
    params.reduce((acc, cur) => `${acc}/${slug(cur)}`, '/').replace(/\/+/g, '/');

module.exports = {
    buildSlug,
};
