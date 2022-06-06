declare global {
    interface Window {
        env: any,
    }
}

type EnvType = {
    REACT_APP_LOG_LEVEL: string,

    REACT_APP_KEYCLOAK_URL: string,
    REACT_APP_KEYCLOAK_REALM: string,
    REACT_APP_KEYCLOAK_CLIENTID: string,

    REACT_APP_MAP: string,
    REACT_APP_MAP_API_URL: string,
    REACT_APP_MAP_WEBSOCKET_URL: string,

    REACT_APP_DUMMY: string,
    REACT_APP_DUMMY_API_URL: string,
    REACT_APP_DUMMY_WEBSOCKET_URL: string,
}
const env: EnvType = { ...process.env, ...window.env }

export default env