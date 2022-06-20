# Breadcrumbs

A hook for generating breadcrumbs for react router.

## Installation

Use the package manager [yarn](https://classic.yarnpkg.com/en/docs/install#debian-stable) to install codebase.

```bash
yarn install
```

## Scripts

To run test suite:
```bash
yarn test
```

To build:
```bash
yarn build
```

To run linter:
```bash
yarn lint
```

To remove apps and packages temp directories:
```bash
yarn clean
```

If you need more options use [turbo](https://turborepo.org/docs/core-concepts/filtering) cli command.

## Usage

```tsx
useRouterBreadcrumbs(routes, options)
```

###Example

```tsx
import useRouterBreadcrumbs from '@ms7/breadcrumbs'

const Header = () => {
    const BreadcrumbComponent = (<span>Breadcrumb</span>)
    const routes = [
        { path: '/', props: { some: 'component', props: '!' }, breadcrumb: 'Home' },
        { path: '/user', props: { user: 'prop' }, breadcrumb: BreadcrumbComponent },
    ]
    const options = { disableDefaults: true, overrideDefaultHome: 'Index' }
    
    const breadcrumbs = useRouterBreadcrumbs(routes, options)

    // do something with breadcrumbs
    
    return (<></>)
}
```

##Options

An options object can be passed as the 2nd argument to the hook.

```tsx
useRouterBreadcrumbs(routes, options)
```

| Option                | Type      | Description                                                  |
|-----------------------|-----------|--------------------------------------------------------------|
| `disableDefaults`     | `Boolean` | Disables all default generated breadcrumbs.                  |
| `overrideDefaultHome` | `String`  | Overrides default home page text.                            |
| `stringReturn`        | `Boolean` | Returns breadcrumb as a string if breadcrumb type is string. |
