import { MenuConfig } from '@ms7/common'
import React from 'react'
import MenuItem from '@/layouts/components/sidebar/menu-item'
import MenuDropdownItem from '@/layouts/components/sidebar/menu-dropdown-item'
import { uniqueId } from 'lodash'
import { Location } from 'react-router-dom'
import { AuthModel } from '@ms7/auth'

const AppMenuGenerator = (menu: MenuConfig[], location: Location, auth?: AuthModel) => menu.map(({ path, name, icon, roles, children }, index) => {
    if(auth && roles)
        for(const role of roles)
            if(!auth.hasRole(role.toString())) return null


    if(children)
        return (
            <MenuDropdownItem
                key={`menu-dropdown-${index}`}
                id={`menu-dropdown-${uniqueId()}`}
                text={name}
                icon={icon}
                roles={roles}
                menuChildren={children}
                firstLevel={(path === '#')}>
                {AppMenuGenerator(children, location, auth)}
            </MenuDropdownItem>
        )

    return (
        <MenuItem
            key={`menu-item-${index}`}
            icon={icon}
            path={path}
            roles={roles}
            active={location.pathname === path}>
            {name}
        </MenuItem>
    )
})

export default AppMenuGenerator