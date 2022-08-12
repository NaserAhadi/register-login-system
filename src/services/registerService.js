import { apiService } from "./apiService"

export default {
    httpCheckRegistering(userPhoneNumberPayload){
        return apiService.post('v2/register/check/mobile', userPhoneNumberPayload)
    },
    httpVerifyOtp(otpPayload){
        return apiService.post('v2/mobile/verify',otpPayload)
    },
    httpRegisterInformation(registerInfotmation){
        return apiService.post('v2/register',registerInfotmation)
    },
}