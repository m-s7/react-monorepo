export const getConfigFiles = (): __WebpackModuleApi.RequireContext =>
    require.context(
        '/src/apps',
        true,
        /\/[\w-]+\/app\.ts$/,
    )

export const requireApp = (path: string) => require(`../apps/${path}`)
