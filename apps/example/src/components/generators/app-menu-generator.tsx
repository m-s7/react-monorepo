import { MenuConfig } from '@ms7/common'
import React from 'react'
import MenuItem from '@/components/layout/sidebar/menu-item'
import MenuDropdownItem from '@/components/layout/sidebar/menu-dropdown-item'
import { uniqueId } from 'lodash'
import { Location } from 'react-router-dom'

const AppMenuGenerator = (menu: MenuConfig[], location: Location) => menu.map(({ path, name, icon, roles, children }, index) => {
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
                {AppMenuGenerator(children, location)}
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