import { PersonState } from 'Dummy/store/reducers/person-reducer'
import { CounterState } from 'Dummy/store/reducers/counter-reducer'
import { WebsocketState } from 'Dummy/store/reducers/websocket-reducer'

export default interface AppState { dummyPerson: PersonState, dummyCounter: CounterState, dummyWebsocket: WebsocketState }
