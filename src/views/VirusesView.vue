<template>
  <div>
    <h1>Les virus</h1>

    <span>Filtres :</span>

    <label for="filterpriceactive">par prix</label>
    <input type="checkbox" v-model="filterPriceActive" id="filterpriceactive">
    <div v-if="filterPriceActive">
      <label for="filterprice">Prix inférieur à : </label>
      <input v-model="priceFilter" id="filterprice">
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

    <ul v-if="filteredViruses.length > 0">
      <li v-for="(virus, index) in filteredViruses" :key="index">{{ virus.name }} : {{ virus.price }}</li>
    </ul>
    <p v-else>Aucun virus ne correspond aux filtres appliqués.</p>

    <p>Le tableau dans le store : {{ viruses }}</p>
    <p>Sous forme de liste avec certains champs</p>
    <ul>
      <li v-for="(virus, index) in viruses" :key="index">{{ virus.name }} : {{ virus.price }}, {{ virus.stock }}</li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'VirusesView',
  data: () => ({
    priceFilter: 0,
    nameFilter: "",
    stockFilter: false,
    filterPriceActive: false,
    filterNameActive: false,
    filterStockActive: false,
  }),
  computed: {
    ...mapState(['viruses']),
    filteredViruses() {
      let filtered = this.viruses;
      if (this.filterPriceActive && !isNaN(this.priceFilter) && this.priceFilter > 0) {
        filtered = filtered.filter(v => v.price < this.priceFilter);
      }
      if (this.filterNameActive && this.nameFilter) {
        filtered = filtered.filter(v => v.name.toLowerCase().includes(this.nameFilter.toLowerCase()));
      }
      if (this.filterStockActive && this.stockFilter) {
        filtered = filtered.filter(v => v.stock);
      }
      return filtered;
    }
  }
}
</script>
