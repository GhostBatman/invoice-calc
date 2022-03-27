<template>
    <div class="columns is-variable">
        <div class="column is-7">
            <input
                class="input "
                type="text"
                placeholder="Product name"
                v-model="invoice.name"
            >
        </div>
        <div class="column is-2">
            <input
                class="input "
                type="text"
                placeholder="Price"
                v-model.number="invoice.price"
            >
        </div>
        <div class="column is-2">
            <input
                class="input "
                type="text"
                v-model.number="invoice.quantity"
                placeholder="Quantity"
                maxlength="2"
            >
        </div>
        <div class="column is-1">
            <button
                class="button is-primary"
                @click="create"
            >Add
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator'
import { mapActions } from 'vuex'
import { IInvoice } from '@/Interfaces'

class Invoice implements IInvoice {
    name = ''
    price = 0
    quantity = 0
}

@Component({
  methods: {
    ...mapActions({
      CREATE_INVOICE: 'createInvoice'
    })
  }
})
export default class CreateForm extends Vue {
    protected CREATE_INVOICE!: CallableFunction
    protected invoice = new Invoice()

    @Emit('created')
    async create (): Promise<void> {
      await this.CREATE_INVOICE(this.invoice)
      this.invoice = new Invoice()
    }
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
