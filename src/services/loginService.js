import { apiService } from "./apiService"

export default {
    httpLogin(userPayload){
        return apiService.post('v3/login', userPayload)
    },
}