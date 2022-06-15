import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/index.js'

export const getNormalizedError = (error: FetchBaseQueryError | SerializedError | undefined): Error | undefined => {
    if(!error) return

    let message
    if('message' in error)  message = error.message
    else if('status' in error) {
        if(typeof error.status === 'number') message = error.status.toString()
        else if(error.status === 'FETCH_ERROR' || error.status === 'PARSING_ERROR' || error.status === 'CUSTOM_ERROR') message = error.error
    }

    return new Error(message)
}