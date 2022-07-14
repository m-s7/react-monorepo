import { SerializedError } from '@reduxjs/toolkit'
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/index.js'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions.js'

type Builder<T extends string> = EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>, T, 'api'>

// interface User { id: number, name: string, age: number,}

// getAll: buildGetAllEndpoint<User, 'Users'>('Users', 'users', build),
export const buildGetAllEndpoint = <R, T extends string>(tag: T, url: string, builder: Builder<T>) =>
    builder.query<R, void>({
        query: () => ({ url }),
        transformResponse: (response: R) => response,
        // providesTags: [tag],
    })

// getById: buildGetByIdEndpoint<User, 'Users'>('Users', 'users', build),
export const buildGetByIdEndpoint = <R, T extends string>(tag: T, url: string, builder: Builder<T>) =>
    builder.query<R, number>({
        query: id => ({ url: `${url}/${id}` }),
        transformResponse: (response: R) => response,
        // providesTags: (result, error, id) => [{ type: tag, id }],
    })

// post: buildPostEndpoint<User, Optional<User, 'id'>, 'Users'>('Users', 'users', build),
export const buildPostEndpoint = <R, B, T extends string>(tag: T, url: string, builder: Builder<T>) =>
    builder.mutation<R, B>({
        query: ({ ...data }) => ({
            url,
            method: 'POST',
            body: data,
        }),
        transformResponse: (response: R) => response,
        // invalidatesTags: [tag],
    })

// put: buildPutEndpoint<User, 'Users'>('Users', 'users', build),
export const buildPutEndpoint = <R extends { id: number }, T extends string>(tag: T, url: string, builder: Builder<T>) =>
    builder.mutation<R, R>({
        query: ({ id, ...data }) => ({
            url: `${url}/${id}`,
            method: 'PUT',
            body: data,
        }),
        transformResponse: (response: R) => response,
        // invalidatesTags: [tag],
    })

// patch: buildPatchEndpoint<User, Optional<User, 'age' | 'name'>, 'Users'>('Users', 'users', build),
export const buildPatchEndpoint = <R extends { id: number }, B extends { id: number }, T extends string>(tag: T, url: string, builder: Builder<T>) =>
    builder.mutation<R, B>({
        query: ({ id, ...data }) => ({
            url: `${url}/${id}`,
            method: 'PATCH',
            body: data,
        }),
        transformResponse: (response: R) => response,
        // invalidatesTags: [tag],
    })

// delete: buildDeleteEndpoint<'Users'>('Users', 'users', build),
export const buildDeleteEndpoint = <T extends string>(tag: T, url: string, builder: Builder<T>) =>
    builder.mutation<void, number>({
        query: id => ({
            url: `${url}/${id}`,
            method: 'DELETE',
        }),
        // invalidatesTags: [tag],
    })

export const providesList = <R extends { id: number }[], T extends string>(resultsWithIds: R | undefined, tagType: T) => {
    if(resultsWithIds)
        return [
            { type: tagType, id: 'LIST' },
            ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
        ]

    return [{ type: tagType, id: 'LIST' }]
}

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