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
      <div
        v-for="card in cards"
        v-bind:key="card.url"
        v-bind:id="container.url"
        @drop.prevent="drop($event)"
        @dragover.prevent="notify"
      >
        <Card :cardProp="card" />
      </div>
    </div>
    <!--New Card-->
    <div class="col">
      <div class="card-create">
        <input type="text" v-model="newCard.name" placeholder="New Card" />
        <button class="btn btn-success" @click="createCard">
          Add Card
        </button>
      </div>
    </div>
    <!-- TODO: remove: For Debugging/Testing only -->
    <pre>{{
      JSON.stringify(
        cards.map((x) => x.url),
        undefined,
        4
      )
    }}</pre>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import _ from 'lodash';
import Card from '@/components/Card.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Container',
  props: ['containerProp'],
  data() {
    return {
      newCard: { name: '' },
      container: this.$store.getters.getContainerByUrl(this.containerProp.url),
      cards: this.$store.getters.getCardsByContainerUrl(this.containerProp.url),
    };
  },
  methods: {
    createCard() {
      console.log('creating Card');
      this.newCard['container'] = this.container.url;
      this.createCardAsync(this.newCard);
      // reset the new card
      this.newCard = {
        name: '',
        container: this.container.url,
      };
      this.updateData();
    },
    async drop(ev) {
      console.log('Dropped!!');
      var cardUrl = ev.dataTransfer.getData('card');
      console.log(cardUrl);
      var card = this.$store.getters.getCardByUrl(cardUrl);
      // deep copy the card, don't want to directly mutate state
      var cardCopy = _.clone(card);
      // change container field on the deep copy
      cardCopy.container = this.containerProp.url;
      await this.updateCardAsync(cardCopy);
      this.updateData();
    },
    notify() {
      console.log('Notified!');
    },
    updateData() {
      // refresh component data from vuex state
      console.log('updateData');
      this.container = this.$store.getters.getContainerByUrl(
        this.containerProp.url
      );
      this.cards = this.$store.getters.getCardsByContainerUrl(
        this.containerProp.url
      );
      console.log(this.cards);
    },
    ...mapActions([
      'updateContainerAsync',
      'deleteContainerAsync',
      'updateCardAsync',
      'createCardAsync',
    ]),
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

pre {
  font-size: 10px;
  background-color: rgb(27, 27, 27);
  margin: 30px;
  padding: 10px;
  width: 400px;
  min-height: 100px;
}
</style>
