<template>
  <div class="board">
    <div v-if="board">
      <h2>{{ board.name }}</h2>
      <div class="row">
        <!--Container List-->
        <div
          v-for="container in containers"
          v-bind:key="container.url"
          class="col"
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
            />
            <button class="btn btn-success" v-on:click="createContainer">
              Create
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

<style scoped>
.row {
  overflow-x: scroll;
  white-space: nowrap;
  overflow-wrap: unset;
}
.col {
  width: 350px;
  display: inline-block;
  vertical-align: top;
}
.container-create {
  padding: 1em;
  margin: 1em;
  border-radius: 7px;
  color: #3389fa;
  background-color: #0d1117;
  border: 1px solid;
  border-color: #fff;
}
</style>
