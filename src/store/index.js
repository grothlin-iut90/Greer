import Vue from 'vue'
import Vuex from 'vuex'

// Import ShopService and BankService
import ShopService from '../services/shop.service'
import BankService from '../services/bankaccount.service'

Vue.use(Vuex)

export default new Vuex.Store({
  // state = centralized data
  state: () => ({
    viruses: [],
    shopUser: null,
    accountAmount: 0,
    accountTransactions: [],
  }),

  // mutations = synchronous functions to update the state
  mutations: {
    updateViruses(state, viruses) {
      state.viruses = viruses
    },
    updateShopUser(state, user) {
      state.shopUser = user
    },
    updateAccountAmount(state, amount) {
      state.accountAmount = amount
    },
    updateAccountTransactions(state, transactions) {
      state.accountTransactions = transactions
    }
  },

  // actions = asynchronous functions to commit mutations
  actions: {
    async shopLogin({ commit }, data) {
      console.log('Login in progress');
      let response = await ShopService.shopLogin(data)
      if (response.error === 0) {
        commit('updateShopUser', response.data)
      } else {
        console.log(response.data)
      }
    },

    async getAllViruses({ commit }) {
      console.log('Fetching viruses');
      let response = await ShopService.getAllViruses()
      console.log("index6_getallviruses: ", response);
      if (response.error === 0) {
        commit('updateViruses', response.data)
      } else {
        console.log(response.data)
      }
    },

    async getAccountAmount({ commit }, number) {
      console.log('Fetching account amount');
      let response = await BankService.getAccountAmount(number)
      if (response.error === 0) {
        commit('updateAccountAmount', response.data)
      } else {
        console.log(response.data)
      }
    },

    async getTransactionsForAccount({ commit }, number) {
      let response = await BankService.getTransactionsForAccount(number)
      if (response.error === 0) {
        commit('updateAccountTransactions', response.data)
      } else {
        console.log(response.message)
      }
    }
  }
})
