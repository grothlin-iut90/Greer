<template>
  <div>
    <button
        v-for="(title, index) in titles"
        :key="index"
        :style="{ backgroundColor: title.color }"
        @click="onMenuClick(index)">
      {{ title.text }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    titles: {
      type: Array,
      required: true
    }
  },
  methods: {
    onMenuClick(index) {
      this.$emit('menu-clicked', index);
    }
  }
}
</script>

<style scoped>
button {
  margin: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}
</style>
