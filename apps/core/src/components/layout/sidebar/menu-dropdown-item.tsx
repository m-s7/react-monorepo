import React, { useEffect, useLayoutEffect, useState } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Icon } from '@ms7/bui'
import Link from '@/components/router/nav/link'
import { getActiveMenuNode, getFlatMenu } from '@/utils/menu-utils'
import { useLocation } from 'react-router-dom'
import { MenuConfig } from '@ms7/common'
import { Role } from '@ms7/auth-providers'

interface MenuDropdownItemProps extends React.HTMLAttributes<HTMLElement> {
    id: string,
    text: string,
    icon: IconProp,
    roles?: Role[],
    menuChildren?: MenuConfig[],
    firstLevel?: boolean,
}

const MenuDropdownItem = (props: MenuDropdownItemProps) => {
    const location = useLocation()
    const { id, text, icon, menuChildren = [], firstLevel = false, children } = props
    const [isExpanded, setIsExpanded] = useState<boolean>()
    const [isChevronExpanded, setIsChevronExpanded] = useState<boolean>()

    let ref: HTMLDivElement | null

    useLayoutEffect(() => {
        ref?.addEventListener('show.bs.collapse', handleShow)
        ref?.addEventListener('hide.bs.collapse', handleHide)
    }, [])

    useLayoutEffect(() => {
        const activePath = getActiveMenuNode(getFlatMenu(menuChildren), location)
        const isExpanded = (activePath !== undefined)

        setIsExpanded(isExpanded)
        setIsChevronExpanded(isExpanded)
    }, [location.pathname])

    useEffect(() => () => {
        ref?.removeEventListener('show.bs.collapse', handleShow)
        ref?.removeEventListener('hide.bs.collapse', handleHide)
    }, [])

    const handleShow = (e: Event) => {
        setIsChevronExpanded(true)
        e.stopPropagation()
    }

    const handleHide = (e: Event) => {
        setIsChevronExpanded(false)
        e.stopPropagation()
    }

    return (
        <React.Fragment>
            <Link to={'#'}>
                <button
                    className={'align-items-center rounded collapsed nav-link text-white'}
                    data-bs-toggle='collapse'
                    data-bs-target={`#${id}-collapse`}
                    aria-expanded={'true'}>
                    <Icon
                        variant={icon}
                        size={'sm'}
                        className={'me-2'} />
                    {text}
                    <Icon
                        variant={isChevronExpanded ? 'chevron-down' : 'chevron-left'}
                        size={'sm'}
                        className={'ms-2'} />
                </button>
            </Link>
            <div
                ref={elem => ref = elem}
                className={`collapse ${isExpanded ? 'show' : ''}`}
                id={`${id}-collapse`}>
                <ul className="list-unstyled fw-normal pb-1 ms-3">
                    {children}
                </ul>
                {firstLevel && <hr />}
            </div>
        </React.Fragment>
    )
}

export default React.memo(MenuDropdownItem)