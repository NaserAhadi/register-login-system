import { apiService } from "./apiService"

export default {
    httpCheckRegistering(userPhoneNumberPayload){
        return apiService.post('register/check/mobile', userPhoneNumberPayload)
    },
    httpVerifyOtp(otpPayload){
        return apiService.post('/mobile/verify',otpPayload)
    },
}