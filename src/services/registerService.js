import { apiService } from "./apiService"

export default {
    httpCheckRegistering(userPhoneNumber){
        return apiService.post('register/check/mobile', userPhoneNumber)
    },
    httpVerify(){
        return apiService.post('/mobile/verify')
    },
}