const moduleMessages = {
    namespaced: true,
    state: () => ({
        messages: {
            //id : Array<Object>
        }
    }),
    getters: {
        getMessagesById: (state) => (id) => {
            return state.messages[id];
        }
    },
    mutations: {
        setMessages(state, payload){
            if(state.messages[payload.id] == undefined)state.messages[payload.id] = [payload.messages]
            else state.messages[payload.id].push(payload.messages)
        }
    },
    actions: {},
}
export default moduleMessages