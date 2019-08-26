export const user = {
    namespaced: true,
    state: { id:null, alias:null, token:null,  role:null },
    actions: {
        login( {dispatch, commit}, {id, alias, token, role} ){
            commit('loginSuccess',{id, alias, token, role})
        },
        logout({dispatch, commit}){
            commit('logout');
        }
    },
    mutations: {
        loginSuccess(state, data) {
            state.id    = data.id
            state.alias = data.alias
            state.token = data.token
            state.role  = data.role
        },
        logout(state) {
            state.id          = null
            state.alias       = null
            state.token       = null
            state.role     = null
        }
    }
}
