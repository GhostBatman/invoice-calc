<template>
    <div id="app">
        <div class="container">
            <h1>Vue invoice calc</h1>
            <create-form @created="onInvoiceCreated" />
            <invoices-table :invoices="INVOICES" @items-deleted="onItemsDeleted"/>
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CreateForm from '@/components/CreateForm.vue'
import { mapActions, mapGetters } from 'vuex'
import { IInvoice } from '@/Interfaces'
import InvoicesTable from '@/components/InvoicesTable.vue'

@Component({
  components: { InvoicesTable, CreateForm },
  computed: {
    ...mapGetters({
      INVOICES: 'invoices'
    })
  },
  methods: {
    ...mapActions({
      UPDATE_DATA: 'updateData'
    })
  }
})
export default class App extends Vue {
    protected INVOICES!: Array<IInvoice>
    protected UPDATE_DATA!: CallableFunction

    mounted (): void {
      this.UPDATE_DATA()
    }

    onInvoiceCreated (): void {
      this.UPDATE_DATA()
    }

    onItemsDeleted (): void {
      this.UPDATE_DATA()
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
