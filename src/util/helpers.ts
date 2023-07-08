import { KEY } from "@/util/constants"
import { AxiosError } from "axios"

const saveToken = (token: string) => {
    sessionStorage.setItem(KEY.ACCESS_TOKEN, token)
}

const handleError = (err: AxiosError) => {
    
}

export const helpers = {
    saveToken
}