import { KEY } from "@/util/constants"

const saveToken = (token: string) => {
    sessionStorage.setItem(KEY.ACCESS_TOKEN, token)
}

export const helpers = {
    saveToken
}