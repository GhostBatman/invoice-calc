<template>
    <div class="content">
        <div class="columns is-variable is-2">
            <div class="column is-12">
                <table class="table is-bordered is-fullwidth">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="invoice in invoices"
                            :key="invoice.id"
                        >
                            <td>
                                <input
                                    type="checkbox"
                                    @input="onCheckboxInput($event.target.checked, invoice.id)"
                                >
                            </td>
                            <td>{{ invoice.name }}</td>
                            <td>{{ invoice.quantity }}</td>
                            <td>{{ invoice.price }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="columns is-variable is-2">
            <div class="column is-1">
                <button
                    class="button is-danger"
                    @click="deleteItems"
                >Delete
                </button>
            </div>
            <div class="column is-9">
                <div class="has-text-right">Total: {{ total }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { mapActions } from 'vuex'
import { IInvoice } from '@/Interfaces'

@Component({
  methods: {
    ...mapActions({
      DELETE_ITEMS: 'deleteItems'
    })
  }
})

export default class InvoicesTable extends Vue {
    protected DELETE_ITEMS!: CallableFunction
    selectedInvoices: Array<number> = []

    @Prop({ type: Array, required: true }) readonly invoices!: Array<IInvoice>;

    onCheckboxInput (isChecked: boolean, id: number): void {
      const index = this.selectedInvoices.findIndex(item => item === id)

      if (isChecked && index === -1) {
        this.selectedInvoices = [...this.selectedInvoices, id]
      }
      if (!isChecked && index !== -1) {
        this.selectedInvoices.splice(index, 1)
      }
    }

    @Emit('items-deleted')
    async deleteItems (): Promise<void> {
      if (this.selectedInvoices.length) {
        await this.DELETE_ITEMS(this.selectedInvoices)
      }
    }

    get total (): number {
      return this.invoices.reduce((acc: number, invoice: IInvoice) => {
        return acc + (invoice.quantity * invoice.price)
      }, 0)
    }
}
</script>

<style scoped>

</style>
