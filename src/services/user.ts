
import { GetUserListResponse, LoginArgument, LoginResponse, UserRequestQuery } from "@/models/user"
import { apis } from "@/util/api"
import { httpClient } from "@/util/http-client"

const login = async (args: LoginArgument) => {
    const response = await httpClient.post({url: apis.user.login, data: args})
    return response.data as LoginResponse
}

const getUserList = async(params: UserRequestQuery) => {
    const response = await httpClient.get({url: apis.user.getUserList, params})
    return response.data as GetUserListResponse
}

export const userServices = {
    login,
    getUserList
}