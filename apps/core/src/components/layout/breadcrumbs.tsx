import React from 'react'
import useBreadcrumbs from '@/hooks/use-breadcrumbs'
import Link from '@/components/router/nav/link'

const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs()

    const isLast = (length: number, index: number): boolean => ((index + 1) >= length)
    const Breadcrumb = (index: number, path: string, name: string, isLast: boolean) => {
        const aria: React.AriaAttributes = { 'aria-current': 'page' }
        const classes = `breadcrumb-item ${isLast ? 'active' : ''}`
        const text = isLast ? name : <Link to={path}>{name}</Link>

        return (
            <li
                key={`breadcrumb-${index}`}
                {...aria}
                className={classes}>
                {text}
            </li>
        )
    }

    return (
        <div>
            <nav aria-label={'breadcrumb'}>
                <ol className={'breadcrumb align-items-center'}>
                    {breadcrumbs?.map(({ breadcrumb, match  }, index) => (
                        Breadcrumb(index, (match.pathname || ''), (typeof breadcrumb === 'string' ? breadcrumb : match.pathname), isLast(breadcrumbs.length, index))
                    ))}
                </ol>
            </nav>
        </div>
    )
}

export default Breadcrumbs