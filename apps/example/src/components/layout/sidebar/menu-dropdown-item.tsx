import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Icon } from '@ms7/bui'
import { RouterLink } from '@ms7/bui'
import { getActiveMenuNode, getFlatMenu } from '@/utils/menu-utils'
import { useLocation } from 'react-router-dom'
import { MenuConfig } from '@ms7/common'
import { Role } from '@ms7/auth-providers'

interface MenuDropdownItemProps extends React.HTMLAttributes<HTMLElement> {
    id: string,
    text: string,
    icon?: IconProp,
    roles?: Role[],
    menuChildren?: MenuConfig[],
    firstLevel?: boolean,
}

const MenuDropdownItem = (props: MenuDropdownItemProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const location = useLocation()
    const { id, text, icon, menuChildren = [], firstLevel = false, children } = props
    const [isExpanded, setIsExpanded] = useState<boolean>()
    const [isChevronExpanded, setIsChevronExpanded] = useState<boolean>()

    useLayoutEffect(() => {
        const el = ref.current
        
        el?.addEventListener('show.bs.collapse', handleShow)
        el?.addEventListener('hide.bs.collapse', handleHide)
        
        return () => {
            el?.removeEventListener('show.bs.collapse', handleShow)
            el?.removeEventListener('hide.bs.collapse', handleHide)
        }
    }, [])

    useLayoutEffect(() => {
        const activePath = getActiveMenuNode(getFlatMenu(menuChildren), location)
        const isExpanded = (activePath !== undefined)

        setIsExpanded(isExpanded)
        setIsChevronExpanded(isExpanded)
    }, [location.pathname])

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
            <RouterLink to={'#'}>
                <button
                    className={'align-items-center rounded collapsed nav-link text-white'}
                    data-bs-toggle='collapse'
                    data-bs-target={`#${id}-collapse`}
                    aria-expanded={'true'}>
                    {icon &&
                        <Icon
                            variant={icon}
                            size={'sm'}
                            className={'me-2'} />
                    }
                    {text}
                    <Icon
                        variant={isChevronExpanded ? 'chevron-down' : 'chevron-left'}
                        size={'sm'}
                        className={'ms-2'} />
                </button>
            </RouterLink>
            <div
                ref={ref}
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