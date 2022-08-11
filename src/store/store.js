import Vue from "vue";
import Vuex from "vuex";

import * as register from "@/store/modules/register";
import * as global from "@/store/modules/global";


Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        register,
        global
   },
});
