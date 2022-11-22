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
    'Core': '../core/src',
    'Core/*': '../core/src/*',
    'Map': '../map/src',
    'Map/*': '../map/src/*',
})
