<template>
  <div
    v-bind:id="card.url"
    class="p-2 m-2 max-w-sm mx-auto rounded-xl shadow-md items-center space-x-4 bg-blue-50 border border-blue-300"
  >
    <div v-if="card" @click="showModal = true">
      <div class="">
        <div class="text-lg text-black font-semibold pb-2">{{ card.name }}</div>
        <div v-if="card.content" class="text-sm text-gray-400 pb-1">{{ card.content.substring(0, 40) }}...</div>
        <button
          @click.prevent.stop="$emit('delete', card.url)"
          class="px-4 py-1 text-sm text-red-600 font-semibold rounded-full border border-red-600 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
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
    ...mapActions(['updateCardAsync']),
  },
  components: {
    CardModal,
  },
};
</script>
