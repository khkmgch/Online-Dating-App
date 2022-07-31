const moduleUsers = {
    namespaced: true,
    state: () => ({
        users: {}
    }),
    getters: {
        getUserById: (state) => (id) => {
          return state.users[id]
        }
    },
    mutations: {
        setUsers(state, payload){
          state.users[payload.login.uuid] = payload
        }
    },
    actions: {
        fetchUsers({ commit }, payload){
            commit('setUsers', payload)
        }
    },
}
export default moduleUsers