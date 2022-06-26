import ApiService, { AxiosResponse } from '@ms7/restful-redux'
import { getBaseUrl } from 'Core/utils/router-utils'
import { User, UserBody } from 'Core/business/types/user'
import { Obj } from '@ms7/common'

export const getUsers = async (): Promise<User[]> => Obj.pickOne(await ApiService.get<User[]>(getBaseUrl('users')).unwrap(), 'data')
export const getUser = async (id: number): Promise<User> => Obj.pickOne(await ApiService.get<User>(`${getBaseUrl('users')}/${id}`).unwrap(), 'data')
export const postUser = async (body: UserBody): Promise<User> => Obj.pickOne(await ApiService.post<User, typeof body>(getBaseUrl('users'), body).unwrap(), 'data')
export const putUser = async (id: number, body: UserBody): Promise<User> => Obj.pickOne(await ApiService.put<User, typeof body>(`${getBaseUrl('users')}/${id}`, body).unwrap(), 'data')
export const patchUser = async (id: number, body: Partial<UserBody>): Promise<User> => Obj.pickOne(await ApiService.patch<User, typeof body>(`${getBaseUrl('users')}/${id}`, body).unwrap(), 'data')
export const removeUser = async (id: number): Promise<AxiosResponse> => await ApiService.remove(`${getBaseUrl('users')}/${id}`).unwrap()
