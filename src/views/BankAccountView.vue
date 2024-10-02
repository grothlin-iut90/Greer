<template>
  <div>
    <h1>Bank Account Amount</h1>

    <span>Identifiant du compte</span><input v-model="accountNumber">
    <button @click="getAccountAmount(accountNumber)">Vérifier</button>
    <button @click="getTransactionsForAccount(accountNumber)">Voir Transactions</button>

    <p v-if="accountAmount">Montant du compte : {{ accountAmount }}</p>
    <p v-if="accountAmount === null">Aucun compte trouvé.</p>

    <ul v-if="accountTransactions.length > 0">
      <li v-for="transaction in accountTransactions" :key="transaction._id">
        {{ transaction.amount }} - {{ new Date(transaction.date.$date).toLocaleString() }}
      </li>
    </ul>
    <p v-else>Aucune transaction trouvée pour ce compte.</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'BankAccountView',
  data: () => ({
    accountNumber: '',
  }),
  computed: {
    ...mapState(['accountAmount']),
    ...mapState(['accountTransactions']),
  },
  methods: {
    ...mapActions(['getAccountAmount']),
    ...mapActions(['getTransactionsForAccount'])
  }
}
</script>
