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
      <label for="filterstock">Stock ou non : </label>
      <input type="checkbox" v-model="stockFilter" id="filterstock">
    </div>

    <hr>

    <ul v-if="filterViruses.length > 0">
      <li v-for="(virus, index) in filterViruses" :key="index">{{ virus.name }} : {{ virus.price }}</li>
    </ul>
    <p v-else>Aucun item disponible à partir du filtre sur le prix.</p>

    <ul v-if="filterVirusesByName.length > 0">
      <li v-for="(virus, index) in filterVirusesByName" :key="index">{{ virus.name }} : {{ virus.price }}</li>
    </ul>
    <p v-else>Aucun item ne correspond au filtre sur le nom.</p>

    <table v-if="filterVirusesByStock.length > 0">
      <thead>
      <tr>
        <th>Nom</th>
        <th>Prix</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(virus, index) in filterVirusesByStock" :key="index">
        <td>{{ virus.name }}</td>
        <td>{{ virus.price }}</td>
      </tr>
      </tbody>
    </table>
    <p v-else>Aucun virus disponible en stock.</p>

    <p>Le tableau dans le store : {{ viruses }}</p>
    <p>Sous forme de liste avec certains champs</p>
    <ul>
      <li v-for="(virus, index) in viruses" :key="index">{{ virus.name }} : {{ virus.price }}, {{ virus.stock }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

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

    // Filtrage par prix
    filterViruses() {
      if (!this.filterPriceActive) {
        // Si le filtre prix n'est pas actif, retourner tous les virus
        return this.viruses;
      }
      if (isNaN(this.priceFilter) || this.priceFilter <= 0) {
        return [];
      }
      return this.viruses.filter(v => v.price < this.priceFilter);
    },

    // Filtrage par nom
    filterVirusesByName() {
      if (!this.filterNameActive) {
        // Si le filtre nom n'est pas actif, retourner tous les virus
        return this.viruses;
      }
      if (!this.nameFilter) {
        return [];
      }
      return this.viruses.filter(v => v.name.toLowerCase().includes(this.nameFilter.toLowerCase()));
    },

    // Filtrage par stock
    filterVirusesByStock() {
      if (!this.filterStockActive) {
        // Si le filtre stock n'est pas actif, retourner tous les virus
        return this.viruses;
      }
      return this.viruses.filter(v => v.stock); // Filtrer les virus en stock
    }
  }
}
</script>
