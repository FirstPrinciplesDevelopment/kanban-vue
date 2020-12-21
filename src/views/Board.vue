<template>
  <div class="board">
    <h1>{{ board.name }}</h1>
    <div class="row">
      <div v-for="container in board.containers" v-bind:key="container.url" class="col"> 
        <Container :container="container" :board_id="board.id"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Container from '@/components/Container.vue'
// import store from 'vuex'

export default {
  name: 'Board',
  props: ['id'],
  data() {
      return {
          board: this.$store.getters.getBoardById(this.id)
      }
  },
  methods: {

  },
  components: {
    Container
  },
  created() {
      console.log("Loading Containers...");
      this.$store.dispatch('loadContainersAsync', {board_id: this.id});
      console.log("Done loading Containers");
  }
}
</script>

<style scoped>
  .col {
    display: inline-block;
    vertical-align: top;
    padding: 3em;
  }
</style>