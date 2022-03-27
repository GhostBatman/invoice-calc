import Vue from 'vue'
import Vuex from 'vuex'
import API from '../api/api'
import { IInvoice } from '@/Interfaces'

Vue.use(Vuex)
interface IStore {
  invoices: Array<IInvoice>
}
export default new Vuex.Store({
  state: (): IStore => {
    return {
      invoices: []
    }
  },
  getters: {
    invoices (state):Array<IInvoice> {
      return state.invoices
    }
  },
  mutations: {
    setInvoices (state, payload: Array<IInvoice>) {
      state.invoices = payload
    }
  },
  actions: {
    async createInvoice (context, invoice: IInvoice): Promise<void> {
      const indexedDb = new API('test')
      await indexedDb.createObjectStore('invoices')
      await indexedDb.putValue('invoices', invoice)
    },
    async updateData ({ commit }): Promise<void> {
      const indexedDb = new API('test')
      await indexedDb.createObjectStore('invoices')
      const result = await indexedDb.getAllValue('invoices')
      commit('setInvoices', result)
    },
    async deleteItems (context, items: Array<number>): Promise<void> {
      const indexedDb = new API('test')
      await indexedDb.createObjectStore('invoices')

      const promises = items.map(async id => {
        return await indexedDb.deleteValue('invoices', id)
      })

      await Promise.all(promises)
    }
  },
  modules: {}
})
