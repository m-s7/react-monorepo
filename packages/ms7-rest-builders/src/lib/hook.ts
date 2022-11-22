import { useState, useEffect } from 'react'
import { apiSubject } from './api-subject'

export const useApiIsLoading = () => {
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const subscription = apiSubject.subscribe({
            next: message => { setIsLoading(message.isLoading) },
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    return isLoading
}