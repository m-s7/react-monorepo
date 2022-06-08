import { Role } from '@ms7/auth-providers'
import { AuthModel } from '@ms7/auth-providers'
import { getConfigRouter } from '@/configs/app'
import { getAppsRouterEntrypointConfigs } from '@/utils/apps-utils'
import { RouterEntrypoint } from '@ms7/router'

export const isDev = (): boolean => (process.env.NODE_ENV !== 'production')
export const isProd = (): boolean => (process.env.NODE_ENV === 'production')

export const hasRole = (role: string, authContext?: AuthModel): boolean => authContext?.hasRole(role) || true
export const hasRoles = (roles: Role[], authContext?: AuthModel): boolean => {
    if(authContext)
        for(const role of roles)
            if(!authContext.hasRole(Role[role].toLowerCase()))
                return false

    return true
}

// export const getAppRouters = (): RouterConfig[] => [getConfigRouter(), ...getAppsRoutersConfigs()]
export const getAppRouters = (): RouterEntrypoint[] => [{ router: getConfigRouter() }, ...getAppsRouterEntrypointConfigs()]
