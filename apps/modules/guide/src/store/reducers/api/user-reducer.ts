export {}
// import { createAsyncThunk } from '@reduxjs/toolkit'
// import conf from 'Index/configs/module'
// import { User, UserBody } from 'Index/models/user/User'
// import { AxiosResponse } from 'axios'

// interface UserParams<B> = { readonly id: number, readonly body: B }

// export const getUsersThunk = createAsyncThunk<User[]>(
//     'guide/users',
//     async () => {
//         const { data } = await get<User[]>(`${getBaseUrlForModule(getConfig())}/users`).unwrap()
//
//         return data
//     },
// )
//
// export const getUserThunk = createAsyncThunk<User, number>(
//     'guide/users/one',
//     async id => {
//         const { data } = await get<User>(`${getBaseUrlForModule(getConfig())}/${id}`).unwrap()
//
//         return data
//     },
// )
//
// export const postUserThunk = createAsyncThunk<User, UserBody>(
//     'guide/users/postThunk',
//     async body => {
//         const { data } = await post<User, UserBody>(`${getBaseUrlForModule(getConfig())}/users`, body).unwrap()
//
//         return data
//     },
// )
//
// export const putUserThunk = createAsyncThunk<User, UserParams<UserBody>>(
//     'guide/users/put',
//     async params => {
//         const { id, body } = params
//         const { data } = await put<User, UserBody>(`${getBaseUrlForModule(getConfig())}/users/${id}`, body).unwrap()
//
//         return data
//     },
// )
//
// export const patchUserThunk = createAsyncThunk<User, UserParams<UserBody>>(
//     'guide/users/patch',
//     async params => {
//         const { id, body } = params
//         const { data } = await patch<User, UserBody>(`${getBaseUrlForModule(getConfig())}/users/${id}`, body).unwrap()
//
//         return data
//     },
// )
//
// export const removeUserThunk = createAsyncThunk<AxiosResponse, number>(
//     'guide/users/delete',
//     async id => await remove(`${getBaseUrlForModule(getConfig())}/users/${id}`).unwrap(),
// )
