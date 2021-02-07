<template>
  <div v-if="card">
    <div class="card-component">
      <div class="card-header">{{ card.name }}</div>
      <div>position: {{ card.position }}</div>
      <div>{{ card.content }}</div>
      <button @click="deleteCardAsync(card.url)" class="btn btn-danger">
        X
      </button>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Card',
  props: ['cardProp'],
  computed: {
    card() {
      return this.$store.getters.getCardByUrl(this.cardProp.url);
    },
  },
  methods: {
    ...mapActions(['updateCardAsync', 'deleteCardAsync']),
  },
};
</script>

<style scoped>
.card-component {
  padding: 1em;
  margin: 1em;
  border-radius: 7px;
  color: #c0d4ee;
  background-color: #5b7bcc;
  box-shadow: 5px 7px 5px #000;
}
.card-header {
  font-weight: 700;
  font-size: 20px;
}
</style>
