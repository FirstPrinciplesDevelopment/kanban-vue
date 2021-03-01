<template>
  <div class="m-2">
    <div v-if="board">
      <h2 class="text-4xl pb-2 font-semibold text-black">{{ board.name }}</h2>
      <div class="grid grid-flow-col auto-cols-max overflow-x-auto">
        <!--Container List-->
        <div
          v-for="container in containers"
          v-bind:key="container.url"
          class="p-2 w-full"
        >
          <Container :containerProp="container" />
        </div>
        <!--New Container-->
        <div class="col">
          <div class="container-create">
            <input
              type="text"
              v-model="newContainer.name"
              placeholder="New Container"
              class="appearance-none rounded-l-md px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-300 focus:border-green-300 focus:z-10 md:text-md"
            />
            <button 
            class="justify-center rounded-r-md py-2 px-2 border border-transparent text-md text-white bg-green-500 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300"
              v-on:click="createContainer">
              Add Container
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import Container from '@/components/Container.vue';

export default {
  name: 'Board',
  props: ['slug'],
  data() {
    return { newContainer: { name: '' } };
  },
  computed: {
    board() {
      return this.$store.getters.getBoardBySlug(this.slug);
    },
    containers() {
      return this.$store.getters.getContainersByBoardUrl(this.board.url);
    },
  },
  methods: {
    createContainer() {
      console.log('creating Container');
      this.newContainer['board'] = this.board.url;
      this.$store.dispatch('createContainerAsync', this.newContainer);
      // reset new container
      this.newContainer = {
        name: '',
        board: this.board.url,
      };
    },
  },
  components: {
    Container,
  },
};
</script>
