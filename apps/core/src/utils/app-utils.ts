import { Role } from '@/constants/role'
import { AuthModel } from '@ms7/auth-providers'

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