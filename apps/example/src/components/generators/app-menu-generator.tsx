import { MenuConfig } from '@ms7/common'
import React from 'react'
import MenuItem from '@/components/layout/sidebar/menu-item'
import MenuDropdownItem from '@/components/layout/sidebar/menu-dropdown-item'
import { uniqueId } from 'lodash'
import { Location } from 'react-router-dom'
import { Translation } from 'react-i18next'

const AppMenuGenerator = (menu: MenuConfig[], location: Location) => menu.map(({ path, name, icon, roles, children }, index) => {
    if(children) {
        return (
            <Translation key={`menu-dropdown-translation-${index}`}>
                {
                    t => (
                        <MenuDropdownItem
                            key={`menu-dropdown-${index}`}
                            id={`menu-dropdown-${uniqueId()}`}
                            text={t(name)}
                            icon={icon}
                            roles={roles}
                            menuChildren={children}
                            firstLevel={(path === '#')}>
                            {AppMenuGenerator(children, location)}
                        </MenuDropdownItem>)
                }
            </Translation>
        )
    }
    else if(!path.includes(':')) {
        return (
            <Translation key={`menu-dropdown-translation-${index}`}>
                {
                    t => (
                        <MenuItem
                            key={`menu-item-${index}`}
                            icon={icon}
                            path={path}
                            roles={roles}
                            active={location.pathname === path}>
                            {t(name)}
                        </MenuItem>)
                }
            </Translation>
        )
    }
})

export default AppMenuGenerator