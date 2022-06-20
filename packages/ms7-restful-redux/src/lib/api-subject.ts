import { Subject } from 'rxjs'

interface Message {
    isLoading: boolean,
}

export const apiSubject = new Subject<Message>()