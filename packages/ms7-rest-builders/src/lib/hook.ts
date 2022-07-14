import { useState, useEffect } from 'react'
import { apiSubject } from './api-subject'
import { Subscription } from 'rxjs'

export const useApiIsLoading = () => {
    const [isLoading, setIsLoading] = useState(false)

    let subscription: Subscription
    useEffect(() => {
        subscription = apiSubject.subscribe({
            next: message => { setIsLoading(message.isLoading) },
        })
    }, [])

    useEffect(() => () => { subscription.unsubscribe() }, [])

    return isLoading
}