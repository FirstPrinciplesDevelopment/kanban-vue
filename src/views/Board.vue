<template>
  <div class="board">
    <div v-if="board">
      <span>{{ board.name }}</span>
      <div class="row">
        <!--Container List-->
        <div
          v-for="container in containers"
          v-bind:key="container.id"
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
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Container from '@/components/Container.vue';

export default {
  name: 'Board',
  props: ['id'],
  data() {
    return { newContainer: { name: '' } };
  },
  computed: {
    board() {
      return this.$store.getters.getBoardById(this.id);
    },
    containers() {
      return this.$store.getters.getContainersByBoardId(this.id);
    },
  },
  methods: {
    createContainer() {
      console.log('creating Container');
      // TODO: fix this hardcoded mess - can the server side handle some of these?
      this.newContainer['board'] = {
        url: this.board.url,
        id: this.board.id,
        name: this.board.name,
      };
      this.newContainer['archived'] = false;
      this.newContainer['position'] = 7;
      this.$store.dispatch('createContainerAsync', this.newContainer);
      // reset new container
      this.newContainer = {
        name: '',
        board: {
          url: this.board.url,
          id: this.board.id,
          name: this.board.name,
        },
        archived: false,
        position: 0,
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
