export default {
    setUser(state, payload) {
        state.user = payload
    },

    setBalance(state, payload) {
        state.balance = payload
    },
    setContract(state, payload) {
        state.contract = payload
    },
    addProduct(state, payload) {
        state.products = [...state.products, payload]
    }
}