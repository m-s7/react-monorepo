const { createWebpackAliases } = require('./webpack.helpers')

/**
 * Export Webpack Aliases
 *
 * Important: make sure to update `tsconfig.json` file also
 * to match the `paths` used here for aliases in project.
 */
module.exports = createWebpackAliases({
    '@': 'src/',
    '@/*': 'src/*',
    'Dummy': 'src/apps/dummy',
    'Dummy/*': 'src/apps/dummy',
    'Map': 'src/apps/map',
    'Map/*': 'src/apps/map',
})
