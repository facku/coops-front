import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import {user} from './user.module'
import {cooperativas} from './cooperativas.module'


Vue.use(Vuex)
const vuexPersist = new VuexPersist({
    key:'CooperativasChubut',
    storage:localStorage
})

export const store = new Vuex.Store({
    modules:{
        user,
        cooperativas
    },
    plugins:[vuexPersist.plugin]
})
