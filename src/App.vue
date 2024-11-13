<template>
  <div>
    <!-- Barre de navigation -->
    <NavBar :titles="menuItems" @menu-clicked="navigateTo"></NavBar>

    <!-- Utilisation du composant CheckedList -->
    <CheckedList
        :data="listData"
        :fields="['prenom', 'nom']"
        :itemCheck="true"
        :checked="checkedItems"
        :itemButton="{ show: true, text: 'Action' }"
        :listButton="{ show: true, text: 'Submit' }"
        @checked-changed="handleCheckedChange"
        @item-button-clicked="handleItemButtonClick"
        @list-button-clicked="handleListButtonClick"
    />

    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import CheckedList from "@/components/CheckedList.vue";

export default {
  name: 'App',
  components: {
    NavBar,
    CheckedList,
  },
  data() {
    return {
      menuItems: [
        { text: 'Viruses', color: '#3498db' },
        { text: 'Compte bancaire', color: '#2ecc71' },
        { text: 'Login', color: '#e74c3c' }
      ],
      // Exemple de données JSON à afficher dans CheckedList
      listData: [
        { nom: "dupond", prenom: "jean", age: 31 },
        { nom: "durand", prenom: "pierre", age: 35 }
      ],
      checkedItems: [false, true] // État des cases à cocher pour chaque ligne
    };
  },
  methods: {
    navigateTo(index) {
      switch (index) {
        case 0:
          this.$router.push('/shop/items');
          break;
        case 1:
          this.$router.push('/bank/account');
          break;
        case 2:
          this.$router.push('/shop/login');
          break;
      }
    },
    // Gestion des changements d'état des cases à cocher
    handleCheckedChange(index) {
      this.checkedItems[index] = !this.checkedItems[index]; // Inverse l'état de la case
    },
    // Gestion des clics sur les boutons d'items
    handleItemButtonClick(index) {
      alert(`Bouton cliqué pour l'élément ${index + 1}`);
    },
    // Gestion du clic sur le bouton après la liste
    handleListButtonClick() {
      alert('Bouton Submit cliqué');
    }
  }
}
</script>

<style scoped>
/* Style personnalisé pour App.vue si besoin */
</style>
