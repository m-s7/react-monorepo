import store from '@/store/store'
import { UserInfoStatus } from '@/business/models/keycloak/user-info'
import { getUserInfoThunk } from '@/store/reducers/keycloak-reducer'

export const getUserInfo = (baseUrl: string): Promise<UserInfoStatus> => store.dispatch(getUserInfoThunk(baseUrl)).unwrap()
