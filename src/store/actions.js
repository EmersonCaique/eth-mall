import json from "../abis/Mall";
import {
    async
} from "q";

export default {
    async RefreshUser(context) {
        let accounts = await web3.eth.getAccounts();
        context.commit('setUser', accounts[0])
    },

    async RefreshBalance(context, ) {
        let accounts = await web3.eth.getAccounts();
        let balance = web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), 'ether');
        context.commit('setBalance', balance)
    },

    async RefreshContract(context) {
        const networkId = await window.web3.eth.net.getId()
        if (json.networks[networkId]) {
            const address = json.networks[networkId].address
            const contract = new web3.eth.Contract(json.abi, address)

            context.commit('setContract', contract)

        } else {
            window.alert('Contract not deployed to detected newtwork')
        }
    },

    async LoadProducts(context, vm) {
        let contract = await vm.$store.getters.contract;
        let productsCount = await contract.methods.getNumberOfProducts().call()
        for (let index = 0; index < productsCount; index++) {
            console.log(await contract.methods.products(index).call())
        }
    }
};