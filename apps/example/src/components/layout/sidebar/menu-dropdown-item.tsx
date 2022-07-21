import React, { useLayoutEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { getActiveMenuNode, getFlatMenu } from '@/utils/menu-utils'
import { useLocation } from 'react-router-dom'
import { MenuConfig } from '@ms7/common'
import { Role } from '@ms7/auth-providers'
import { Collapse } from 'react-bootstrap'
import { Link } from '@ms7/ui'

interface MenuDropdownItemProps extends React.HTMLAttributes<HTMLElement> {
    id: string,
    text: string,
    icon?: IconProp,
    roles?: Role[],
    menuChildren?: MenuConfig[],
    firstLevel?: boolean,
}

const MenuDropdownItem = (props: MenuDropdownItemProps) => {
    const location = useLocation()
    const { id, text, icon, menuChildren = [], firstLevel = false, children } = props

    const [isOpen, setIsOpen] = useState(false)
    const [isInitiallyOpen, setIsInitiallyOpen] = useState(false)

    const isPathInMenuTree = useMemo(() => (getActiveMenuNode(getFlatMenu(menuChildren), location) !== undefined), [location.pathname])

    useLayoutEffect(() => {
        setIsInitiallyOpen(isPathInMenuTree)
    }, [])

    useLayoutEffect(() => {
        setIsOpen(isPathInMenuTree)
    }, [location.pathname])

    return (
        <>
            <Link
                to="#"
                onClick={() => {
                    setIsOpen(!isOpen)
                }}
                className="align-items-center rounded nav-link text-white"
                aria-controls={`${id}-collapse`}
                aria-expanded={isOpen}>
                {icon &&
                    <FontAwesomeIcon
                        icon={icon}
                        size="sm"
                        className="me-2" />
                }
                {text}
                <FontAwesomeIcon
                    icon={isOpen ? 'chevron-down' : 'chevron-left'}
                    size="sm"
                    className="ms-2" />
            </Link>
            <Collapse in={isOpen}>
                <div
                    className={`${isInitiallyOpen ? 'transition-none' : ''}`}
                    id={`${id}-collapse`}>
                    <ul className="list-unstyled fw-normal pb-1 ms-3">
                        {children}
                    </ul>
                    {firstLevel && <hr />}
                </div>
            </Collapse>
        </>
    )
}

export default MenuDropdownItem