<template>
  <div>
    <h1>Les virus disponibles</h1>

    <!-- Filtres -->
    <span>Filtres :</span>
    <label for="filterpriceactive">par prix</label>
    <input type="checkbox" v-model="filterPriceActive" id="filterpriceactive">
    <div v-if="filterPriceActive">
      <label for="filterprice">Prix inférieur à : </label>
      <input v-model="priceFilter" id="filterprice" type="number">
    </div>
    <br>

    <label for="filternameactive">par nom</label>
    <input type="checkbox" v-model="filterNameActive" id="filternameactive">
    <div v-if="filterNameActive">
      <label for="filtername">Nom du virus : </label>
      <input v-model="nameFilter" id="filtername" placeholder="Tapez un nom">
    </div>
    <br>

    <label for="filterstockactive">par stock</label>
    <input type="checkbox" v-model="filterStockActive" id="filterstockactive">
    <div v-if="filterStockActive">
      <label for="filterstock">Stock disponible : </label>
      <input type="checkbox" v-model="stockFilter" id="filterstock">
    </div>

    <hr>

    <!-- Liste des virus filtrés avec cases à cocher et boutons -->
    <CheckedList
        :data="filteredViruses"
        :fields="['name', 'price']"
        :itemCheck="true"
        :checked="virusCheckedStatus"
        :itemButton="{ show: true, text: 'Détails' }"
        :listButton="{ show: true, text: 'Voir sélection' }"
        @checked-changed="handleCheckedChange"
        @item-button-clicked="handleItemButtonClick"
        @list-button-clicked="handleListButtonClick"
    />

    <!-- Message si aucun virus ne correspond aux filtres -->
    <p v-if="filteredViruses.length === 0">Aucun virus ne correspond aux filtres appliqués.</p>
  </div>
</template>

<script>
import CheckedList from '@/components/CheckedList.vue';
import { mapState } from 'vuex';

export default {
  name: 'VirusesView',
  components: {
    CheckedList
  },
  data() {
    return {
      viruses: this.$store.state.viruses.map(virus => ({ ...virus, checked: false }))
    };
  },
  computed: {
    ...mapState(['viruses']),

    // Liste des virus filtrés selon les critères de filtrage
    filteredViruses() {
      return this.viruses.filter(virus => {
        const matchesPrice = !this.filterPriceActive || (virus.price < this.priceFilter);
        const matchesName = !this.filterNameActive || (virus.name.toLowerCase().includes(this.nameFilter.toLowerCase()));
        const matchesStock = !this.filterStockActive || (virus.stock);
        return matchesPrice && matchesName && matchesStock;
      });
    },

    // Tableau de booléens indiquant l'état des cases à cocher
    virusCheckedStatus() {
      return this.filteredViruses.map(virus => this.selected.includes(this.viruses.indexOf(virus)));
    }

  },
  methods: {
    // Gère les changements d'état des cases à cocher
    handleCheckedChange(index) {
      this.filteredViruses[index].checked = !this.filteredViruses[index].checked;
    },
    handleListButtonClick() {
      const selectedViruses = this.filteredViruses.filter(v => v.checked);
      alert(`Virus sélectionnés: ${selectedViruses.map(v => v.name).join(', ')}`);
    },

    // Gère les clics sur les boutons de fin de ligne
    handleItemButtonClick(index) {
      const virus = this.filteredViruses[index];
      alert(`Virus: ${virus.name}, Stock: ${virus.stock}, En vente: ${virus.onSale ? 'Oui' : 'Non'}`);
    },
  }
};
</script>

<style scoped>
</style>
