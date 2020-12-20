<template>
  <div class="board">
    <h2>{{ board.name }}</h2>
    <div v-for="container in board.containers" v-bind:key="container.url">
      <Container :id="container.url"/>
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
