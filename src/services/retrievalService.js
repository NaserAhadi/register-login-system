import { apiService } from "./apiService"

export default {
    httpSendRetrievalInfo(retrievalInfo){
        return apiService.post('v2/mobile/send', retrievalInfo)
    },
    httpVerifyChangingPassword(retrievalInfo){
        return apiService.post('v2/change/password',retrievalInfo)
    }
}