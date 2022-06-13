import axios from 'axios'

type PromiseStatus = 'pending' | 'error' | 'success'

export interface WrappedPromise<T> {
    read: () => T,
}

const wrapPromise = <T>(promise?: Promise<T>): { read: () => T } => {
    let status: PromiseStatus = 'pending'
    let result: T
    console.log(123)

    const suspender = axios('http://localhost:3035/users').then(
        res => {
            status = 'success'
            result = res.data
        },
        err => {
            status = 'error'
            result = err
        })

    return {
        read(): T {
            console.log('WHY TWICE??')

            if(status === 'pending') throw suspender
            else if(status === 'error') throw result

            return result
        },
    }
}

export default wrapPromise