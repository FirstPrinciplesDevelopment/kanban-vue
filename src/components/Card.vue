<template>
  <div v-bind:id="card.url">
    <div v-if="card" @click="showModal = true">
      <div class="card-component">
        <div class="card-header">{{ card.name }}</div>
        <div>position: {{ card.position }}</div>
        <div>{{ card.content }}</div>
        <button
          @click.prevent="deleteCardAsync(card.url)"
          class="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
    <div v-else>Loading...</div>
    <CardModal
      :initialCard="card"
      v-on:close="showModal = false"
      v-if="showModal"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import CardModal from '@/components/CardModal.vue';

export default {
  name: 'Card',
  props: ['cardProp'],
  data() {
    return { showModal: false };
  },
  computed: {
    card() {
      return this.$store.getters.getCardByUrl(this.cardProp.url);
    },
  },
  methods: {
    drag(ev) {
      console.log('I am being dragged!!!');
      ev.dataTransfer.setData('card', ev.target.id);
      console.log(ev.dataTransfer.types);
    },
    ...mapActions(['updateCardAsync', 'deleteCardAsync']),
  },
  components: {
    CardModal,
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
