import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import useBreadcrumbs from '@/hooks/use-breadcrumbs'
import { Link } from '@ms7/ui'

const BreadcrumbItem = (index: number, path: string, name: string, isActive: boolean) => (
    <Breadcrumb.Item
        as="div"
        key={`breadcrumb-${index}`}
        active={isActive}>
        <Link
            className={isActive ? 'breadcrumb-item active' : ''}
            to={isActive ? '#' : path}
            disabled={isActive}>
            {name}
        </Link>
    </Breadcrumb.Item>
)

const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs()

    return (
        <div>
            <Breadcrumb>
                {breadcrumbs?.map(({ breadcrumb, match }, index) => (
                    BreadcrumbItem(index, (match.pathname || ''), (typeof breadcrumb === 'string' ? breadcrumb : match.pathname), ((index + 1) >= breadcrumbs.length))
                ))}
            </Breadcrumb>
        </div>
    )
}

export default Breadcrumbs
