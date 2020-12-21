<template>
  <div class="board">
    <h1>{{ board.name }}</h1>
    <div v-for="container in board.containers" v-bind:key="container.url">
      <Container :container="container"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Container from '@/components/Container.vue'

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
  }
}
</script>
