# Restful Redux

React router utils, helpers and types.

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

If you need more build options use [turbo](https://turborepo.org/docs/core-concepts/filtering) cli command.

## Usage

```tsx
<AuthProvider<T>
    provider={provider}
    providerProps{providerProps}>
    <div>CHILDREN GOES HERE</div>
</AuthProvider>
```

###Example

```tsx
import { AuthProvider, KeycloakAuthProvider, KeycloakAuthProviderProps } from '@ms7/auth-providers'

const CriticalError = (error: { error: Error }) => (<div>{props.error.message}</div>);
const Loader = () => (<i class="loader" />);

<AuthProvider<KeycloakAuthProviderProps>
    provider={KeycloakAuthProvider}
    providerProps={{
        config: { url: 'https://keycloak.local', realm: 'react-realm', clientId: 'react-client-id' },
        errorComponent: CriticalError,
        suspenseComponent: Loader,
        onAuthenticatedHandler: (token: string, logoutMethod: () => void) => {
            //handle authentication
        },
    }}>
    <AppRouter />
</AuthProvider>
```

## Scripts

To run test suite:
```bash
yarn test
```

To build apps and packages:
```bash
yarn build
```

If you need more build options use [turbo](https://turborepo.org/docs/core-concepts/filtering) cli command.
