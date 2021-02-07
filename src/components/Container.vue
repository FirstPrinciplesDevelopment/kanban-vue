<template>
  <div v-if="container">
    <div class="container-component">
      <h2>{{ container.name }}</h2>
      <button
        @click="deleteContainerAsync(container.url)"
        class="btn btn-danger"
      >
        Delete Container
      </button>
      <div v-for="card in cards" v-bind:key="card.url">
        <Card :cardProp="card" />
      </div>
    </div>
    <!--New Card-->
    <div class="col">
      <div class="card-create">
        <input type="text" v-model="newCard.name" placeholder="New Card" />
        <button class="btn btn-success" v-on:click="createCard">
          Add Card
        </button>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import Card from '@/components/Card.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Container',
  props: ['containerProp'],
  data() {
    return { newCard: { name: '' } };
  },
  computed: {
    container() {
      return this.$store.getters.getContainerByUrl(this.containerProp.url);
    },
    cards() {
      return this.$store.getters.getCardsByContainerUrl(this.container.url);
    },
  },
  methods: {
    createCard() {
      console.log('creating Card');
      this.newCard['container'] = this.container.url;
      this.$store.dispatch('createCardAsync', this.newCard);
      // reset the new card
      this.newCard = {
        name: '',
        container: this.container.url,
      };
    },
    ...mapActions(['updateContainerAsync', 'deleteContainerAsync']),
  },
  components: {
    Card,
  },
};
</script>

<style scoped>
.container-component {
  padding: 1em;
  margin: 1em;
  border-radius: 7px;
  color: #3389fa;
  background-color: #0d1117;
  border: 1px solid;
  border-color: #fff;
}
</style>
