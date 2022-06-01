import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Role } from '@/constants/role'

export interface MenuConfig {
    readonly path: string,
    readonly name: string,
    readonly icon: IconProp,
    readonly roles?: Role[],
    readonly children?: MenuConfig[],
}