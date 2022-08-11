import Vue from "vue";
import Vuex from "vuex";

import * as register from "@/store/modules/register";

Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        register
   },
});
