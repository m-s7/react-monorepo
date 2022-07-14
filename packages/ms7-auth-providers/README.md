# Auth Providers

Auth providers wrapper for React.

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
<AuthProvider<T>
    provider={provider}
    providerProps{providerProps}>
    <div>CHILDREN GOES HERE</div>
</AuthProvider>
```

### Example

#### Keycloak provider

```tsx
import { AuthProvider, KeycloakAuthProvider, KeycloakAuthProviderProps } from '@ms7/auth-providers'

const FatalError = (error: { error: Error }) => (<div>{props.error.message}</div>);
const Loader = () => (<i class="loader" />);

<AuthProvider<KeycloakAuthProviderProps>
    provider={KeycloakAuthProvider}
    providerProps={{
        config: { url: 'https://keycloak.local', realm: 'react-realm', clientId: 'react-client-id' },
        errorComponent: FatalError,
        suspenseComponent: Loader,
        onAuthenticatedHandler: (token: string, logoutMethod: () => void) => {
            //handle authentication
        },
    }}>
    <AppRouter />
</AuthProvider>
```

#### Access provider in child component

```tsx
import { AuthProviderContext } from '@ms7/auth-providers'

const Child = () => {
    const authContext = useContext(AuthProviderContext)
    
    return (
        <div>{authContext?.getUserInfo().username}</div>
    )
}
```