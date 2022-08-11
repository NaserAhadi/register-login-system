import Vue from 'vue'

export const namespaced = true;

export const state = {
    snackbarConfig: {}
}

export const mutations = {
    SET_SNACKBAR_CONFIG(state, snackbarConfig){
        Vue.set(state, 'snackbarConfig', snackbarConfig)
    }
}


export const actions = {
    triggerSnackbar(vuexContext, snackbarConfig){
        vuexContext.commit('SET_SNACKBAR_CONFIG', snackbarConfig)
    }
}
