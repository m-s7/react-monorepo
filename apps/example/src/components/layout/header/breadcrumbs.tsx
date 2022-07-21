import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import useBreadcrumbs from '@/hooks/use-breadcrumbs'

const BreadcrumbItem = (index: number, path: string, name: string, isActive: boolean) => (
    <Breadcrumb.Item
        href={isActive ? '#' : path}
        key={`breadcrumb-${index}`}
        active={isActive}>
        {name}
    </Breadcrumb.Item>
)

const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs()

    return (
        <div>
            <Breadcrumb className="text-success">
                {breadcrumbs?.map(({ breadcrumb, match }, index) => (
                    BreadcrumbItem(index, (match.pathname || ''), (typeof breadcrumb === 'string' ? breadcrumb : match.pathname), ((index + 1) >= breadcrumbs.length))
                ))}
            </Breadcrumb>
        </div>
    )
}

export default Breadcrumbs
