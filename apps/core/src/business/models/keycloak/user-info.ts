export interface UserInfo {
    email: string,
    email_verified: boolean,
    name: string,
    given_name: string,
    family_name: string,
    preferred_username: string,
    sub: string,
}

export interface UserInfoStatus extends UserInfo { status: number }
