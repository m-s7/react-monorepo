import personReducer from 'Dummy/store/reducers/person-reducer'
import counterReducer from 'Dummy/store/reducers/counter-reducer'
import websocketReducer from 'Dummy/store/reducers/websocket-reducer'

const reducers = {
    dummyPerson: personReducer,
    dummyCounter: counterReducer,
    dummyWebsocket: websocketReducer,
}

export default reducers