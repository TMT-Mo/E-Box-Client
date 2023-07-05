
import { LoginArgument, LoginResponse } from "@/models/user"
import { apis } from "@/util/api"
import { httpClient } from "@/util/http-client"

const login = async (args: LoginArgument) => {
    const response = await httpClient.post({url: apis.user.login, data: args})
    console.log(response.headers["set-cookie"])
    return response.data as LoginResponse
}

export const userServices = {
    login
}