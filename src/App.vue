<template>
  <div>
    <NavBar :titles="menuItems" @menu-clicked="navigateTo"></NavBar>
    <CheckedList></CheckedList>
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
      ]
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
    }
  }
}
</script>
