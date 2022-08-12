import Vue from "vue";
import Vuex from "vuex";

import * as global from "@/store/modules/global";


Vue.use(Vuex);


export default new Vuex.Store({
    modules: {
        global
   },
});
