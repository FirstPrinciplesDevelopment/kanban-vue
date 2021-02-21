<template>
  <div v-if="container">
    <div class="container-component">
      <input
        type="text"
        v-model="containerClone.name"
        @change="updateContainer"
      />
      <p>{{ container.url }}</p>
      <button
        @click="deleteContainerAsync(container.url)"
        class="btn btn-danger"
      >
        Delete Container
      </button>
      <!--Cards-->
      <draggable
        :list="cards"
        group="containers"
        @start="dragging = true"
        @end="dragging = false"
        item-key="id"
        @change="handleChange"
      >
        <template v-slot:item="{ element }">
          <Card :cardProp="element" @delete="deleteCard" />
        </template>
      </draggable>
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
import draggable from 'vuedraggable';

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
  computed: {
    containerClone() {
      return _.clone(this.container);
    },
  },
  methods: {
    async updateContainer() {
      console.log('updating conatiner');
      await this.updateContainerAsync(this.containerClone);
      this.UpdateData();
    },
    async createCard() {
      console.log('creating Card');
      this.newCard['container'] = this.container.url;
      await this.createCardAsync(this.newCard);
      // reset the new card
      this.newCard = {
        name: '',
        container: this.container.url,
      };
      this.updateData();
    },
    async handleChange(ev) {
      console.log('handle change!');
      console.log(ev);
      if (ev.added) {
        console.log(ev.added);
        var card = _.clone(ev.added.element);
        card.container = this.containerProp.url;
        console.log(card);
        await this.updateCardAsync(card);
        this.updateData();
      }
    },
    async deleteCard(cardUrl) {
      console.log('deleting Card');
      await this.deleteCardAsync(cardUrl);
      this.updateData();
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
      'deleteCardAsync',
    ]),
  },
  components: {
    Card,
    draggable,
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
