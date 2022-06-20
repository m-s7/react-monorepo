import { Subject } from 'rxjs'

interface Message {
    isLoading: boolean,
}

export const rtkSubject = new Subject<Message>()