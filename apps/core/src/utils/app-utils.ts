import { Role } from '@/constants/role'
import { Auth } from '@/business/auth/auth'

export const isDev = (): boolean => (process.env.NODE_ENV !== 'production')
export const isProd = (): boolean => (process.env.NODE_ENV === 'production')

export const hasRole = (role: string, authContext?: Auth): boolean => authContext?.hasRole(role) || true
export const hasRoles = (roles: Role[], authContext?: Auth): boolean => {
    if(authContext)
        for(const role of roles)
            if(!authContext.hasRole(Role[role].toLowerCase()))
                return false

    return true
}