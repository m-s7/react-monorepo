const { createWebpackAliases } = require('../../../../packages/static/webpack/apps/webpack-apps.helpers')

/**
 * Export Webpack Aliases
 *
 * Important: make sure to update `tsconfig.json` file also
 * to match the `paths` used here for aliases in project.
 */
module.exports = createWebpackAliases({
    '@': 'src/',
    '@/*': 'src/*',
    'Dummy': '../modules/dummy/src',
    'Dummy/*': '../modules/dummy/src/*',
    'Map': '../modules/map/src',
    'Map/*': '../modules/map/src/*',
})
