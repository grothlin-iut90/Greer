<template>
  <div>
    <h1>Bank Account Amount</h1>

    <span>Identifiant du compte</span><input v-model="accountNumber" @input="validateAccountNumber">
    <button @click="getAccountAmount(accountNumber)" :disabled="!isAccountNumberValid">getAccountAmount</button>
    <button @click="getTransactionsForAccount(accountNumber)" :disabled="!isAccountNumberValid">getTransactionsForAccount</button>

    <p v-if="accountAmount">Montant du compte : {{ accountAmount }}</p>
    <p v-if="accountAmount === null">Aucun compte trouvé.</p>

    <ul v-if="accountTransactions.length > 0">
      <li v-for="transaction in accountTransactions" :key="transaction._id">
        {{ transaction.amount }} - {{ new Date(transaction.date.$date).toLocaleString() }}
      </li>
    </ul>
    <p v-else>Aucune transaction trouvée pour ce compte.</p>
    <button @click="resetAccountNumber">reset</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'BankAccountView',
  data: () => ({
    accountNumber: '',
    isAccountNumberValid: false,
  }),
  computed: {
    ...mapState(['accountAmount']),
    ...mapState(['accountTransactions']),
  },
  methods: {
    ...mapActions(['getAccountAmount']),
    ...mapActions(['getTransactionsForAccount']),
    validateAccountNumber() {
      const regex = /^[A-Za-z0-9]{22}-\d{7}$/;
      this.isAccountNumberValid = regex.test(this.accountNumber);
    },
    resetAccountNumber() {
      this.accountNumber = 0;
      this.validateAccountNumber()
    }
  }
}
</script>
