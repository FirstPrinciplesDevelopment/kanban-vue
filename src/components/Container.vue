<template>
  <div v-if="container" class="overflow-y-auto h-auto">
    <div class="border border-gray-300 bg-gray-100 rounded-md shadow-xl">
      <div class="bg-gray-300 p-2">
        <label
          class="w-1/6 justify-center rounded-l-md py-2 px-2 border border-transparent text-md text-white bg-gray-600 hover:bg-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          class="w-5/6 appearance-none rounded-r-md px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 md:text-md font-bold"
          v-model="containerClone.name"
          @change="updateContainer"
        />
        <button
          @click="deleteContainerAsync(container.url)"
          class="px-4 py-1 my-2 text-sm text-red-600 font-semibold rounded-full border border-red-600 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
        >
          Delete
        </button>
      </div>
      <div class="p-2">
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
        <!--New Card-->
        <div class="py-4">
          <div class="card-create">
            <input
              type="text"
              class="w-3/4 appearance-none rounded-l-md px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-300 focus:border-green-300 focus:z-10 md:text-md"
              v-model="newCard.name"
              placeholder="New Card"
            />
            <button
              class="w-1/4 justify-center rounded-r-md py-2 px-2 border border-transparent text-md text-white bg-green-500 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300"
              @click="createCard"
            >
              Add Card
            </button>
          </div>
        </div>
      </div>
    </div>
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
      var card;
      if (ev.added) {
        console.log(ev.added);
        card = _.clone(ev.added.element);
        // set current container on the moved card
        card.container = this.containerProp.url;
        // set current position on the moved card
        card.position = ev.added.newIndex + 1;
        console.log(card);
        await this.updateCardAsync(card);
        this.updateData();
      } else if (ev.removed) {
        console.log(ev.removed);
      } else if (ev.moved) {
        console.log(ev.moved);
        card = _.clone(ev.moved.element);
        // set current position on the moved card, negotiate 0 vs. 1 based index
        card.position = ev.moved.newIndex + 1;
        console.log(card);
        await this.updateCardAsync(card);
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
