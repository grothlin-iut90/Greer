<template>
  <div>
    <ul>
      <li v-for="(item, index) in data" :key="index">
        <input
            v-if="itemCheck"
            type="checkbox"
            :checked="checked[index]"
            @change="$emit('checked-changed', index)"
        >

        <span v-for="field in fields" :key="field">
          {{ item[field] }}
        </span>

        <button
            v-if="itemButton?.show"
            @click="$emit('item-button-clicked', index)"
        >
          {{ itemButton.text }}
        </button>
      </li>
    </ul>

    <button v-if="listButton?.show" @click="$emit('list-button-clicked')">
      {{ listButton.text }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'CheckedList',
  props: {
    data: { type: Array, default: () => [] },
    fields: { type: Array, default: () => [] },
    itemCheck: { type: Boolean, default: false },
    checked: { type: Array, default: () => [] },
    itemButton: { type: Object, default: () => ({ show: false, text: '' }) },
    listButton: { type: Object, default: () => ({ show: false, text: '' }) },
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

span {
  margin-right: 10px;
}

button {
  margin-left: auto;
}
</style>
