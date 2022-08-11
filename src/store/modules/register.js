import registerService from '@/services/registerService.js'
import Vue from 'vue'

export const namespaced = true;

export const state = {
    userPhoneNumber: ''
}

export const mutations = {
    SET_USER_PHONE_NUMBER(state, userPhoneNumber){
        Vue.set(state, 'userPhoneNumber', userPhoneNumber)
    }
}


export const actions = {
    async checkUserRegistering(vuexContext, userPhoneNumberPayload){
        await registerService.httpCheckRegistering(userPhoneNumberPayload)
        vuexContext.commit('SET_USER_PHONE_NUMBER',userPhoneNumberPayload.mobile)
    }
}
