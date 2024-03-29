/* eslint-disable @typescript-eslint/no-explicit-any */
// noinspection JSUnusedGlobalSymbols

declare global {
    interface Window {
        env: any,
    }
}

type EnvType = {
    REACT_APP_NAME: string,
    REACT_APP_HOMEPAGE_NAME: string,
    REACT_APP_LOG_LEVEL: string,

    REACT_APP_KEYCLOAK_URL: string,
    REACT_APP_KEYCLOAK_REALM: string,
    REACT_APP_KEYCLOAK_CLIENTID: string,

    REACT_APP_FIREBASE_API_KEY: string,
    REACT_APP_FIREBASE_AUTH_DOMAIN: string,
    REACT_APP_FIREBASE_PROJECT_ID: string,
    REACT_APP_FIREBASE_STORAGE_BUCKET: string,
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID: string,
    REACT_APP_FIREBASE_APP_ID: string,

    REACT_APP_CORE: string,
    REACT_APP_CORE_API_URL: string,
    REACT_APP_CORE_WEBSOCKET_URL: string,

    REACT_APP_MAP: string,
    REACT_APP_MAP_API_URL: string,
    REACT_APP_MAP_WEBSOCKET_URL: string,
}
export const env: EnvType = { ...process.env, ...window.env }
