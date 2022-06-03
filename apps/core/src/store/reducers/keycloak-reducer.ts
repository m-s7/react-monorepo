import { get } from '@/business/api-service'
import { UserInfo, UserInfoStatus } from '@/business/models/keycloak/user-info'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getUserInfoThunk = createAsyncThunk(
    'keycloak/get/userinfo',
    async (baseUrl: string): Promise<UserInfoStatus> => {
        const { status, data } = await get<UserInfo>(`${baseUrl}/userinfo`).unwrap()

        return { ...data, status }
    },
)