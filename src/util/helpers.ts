import { KEY } from "@/util/constants"
import { AxiosError } from "axios"

const saveToken = (token: string) => {
    sessionStorage.setItem(KEY.ACCESS_TOKEN, token)
}

const handleError = (err: AxiosError) => {
    
}

const clearToken = () => {
    sessionStorage.removeItem(KEY.ACCESS_TOKEN);
  };
  
  const getToken = (): string => {
    const token = sessionStorage
      .getItem(KEY.ACCESS_TOKEN)
      ?.replace(/(['"])/g, "") as string;
    return token;
  };

export const helpers = {
    saveToken,
    clearToken,
    getToken
}