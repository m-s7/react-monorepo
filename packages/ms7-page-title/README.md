# Page Title

A hook used for generating page title for react router.

## Installation

Use the package manager [yarn](https://classic.yarnpkg.com/en/docs/install#debian-stable) to install.

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
usePageTitle(routes, options)
```

### Example

```tsx
import useRouterPageTitle, { PageTitleRoute } from '@ms7/page-title'

const Header = () => {
    const PageTitleComponent = (<span>Page Title</span>)
    const routes = [
        { path: '/', props: { some: 'component', props: '!' }, title: 'Home' },
        { path: '/user', props: { user: 'prop' }, title: PageTitleComponent },
    ]
    const options = { stringReturn: true }
    
    const pageTitle = useRouterPageTitle(routes, options)

    // do something with page title
    
    return (<></>)
}
```

## Options

An options object can be passed as the 2nd argument to the hook.

```tsx
usePageTitle(routes, options)
```

| Option                | Type      | Description                                             |
|-----------------------|-----------|---------------------------------------------------------|
| `stringReturn`        | `Boolean` | Returns page title as a string if title type is string. |
