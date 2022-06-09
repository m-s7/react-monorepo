import { remove, findLastIndex } from 'lodash'
import { Subject, Subscription } from 'rxjs'

export interface EventBusMessage { [x: string]: unknown }
export interface EventBusListener {
    channel: string,
    subscription: Subscription,
    limit?: number,
}

const listeners: EventBusListener[] = []
const channels = new Map<string, Subject<EventBusMessage>>()

const register = (channel: string): boolean => {
    if(channels.has(channel)) return false

    channels.set(channel, new Subject<EventBusMessage>())

    return true
}

const unregister = (channel: string): boolean => {
    const removedListeners = remove(listeners, listener => listener.channel === channel)
    removedListeners.forEach(listener => {
        listener.subscription.unsubscribe()
    })

    return channels.delete(channel)
}

const subscribe = (channel: string, callback: (value: unknown) => void, limit?: number): void => {
    const subject = channels.get(channel)
    if(subject) {
        const subscription = subject.subscribe(callback)
        listeners.push({ channel, subscription, limit })
    }
}

const subscribeOnce = (channel: string, callback: (value: unknown) => void): void => {
    subscribe(channel, callback, 1)
}

const subscribeTimes = (channel: string, callback: (value: unknown) => void, limit: number): void => {
    subscribe(channel, callback, limit)
}

const unsubscribe = (channel: string): void => {
    const lastIndex = findLastIndex(listeners, listener => listener.channel === channel)
    if(lastIndex > -1) {
        listeners[lastIndex].subscription.unsubscribe()
        listeners.splice(lastIndex, 1)
    }
}

const dispatch = (channel: string, message: EventBusMessage) => {
    listeners
        .filter(listener => listener.limit !== undefined)
        .forEach(listener => {
            if(listener.limit !== undefined) {
                if(listener.limit > 0)
                    listener.limit--
                else {
                    listener.limit = undefined
                    listener.subscription.unsubscribe()
                }
            }
        })

    channels.get(channel)?.next(message)
}

const EventBus = {
    listeners,
    register,
    unregister,
    subscribe,
    subscribeOnce,
    subscribeTimes,
    unsubscribe,
    dispatch,
}

export default EventBus
