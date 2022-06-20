declare global {
    interface Window {
        env: any,
    }
}

type EnvType = {
    REACT_APP_NAME: string,
    REACT_APP_HOMEPAGE_NAME: string,
    REACT_APP_LOG_LEVEL: string,

    REACT_APP_MAP: string,
    REACT_APP_MAP_API_URL: string,
    REACT_APP_MAP_WEBSOCKET_URL: string,
}
const env: EnvType = { ...process.env, ...window.env }

export default env