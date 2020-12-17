<template>
  <div class="boards">
    <table id="board-table">
        <tr>
            <th>Name</th>
            <th>Archived</th>
            <th>Position</th>
        </tr>
        <tr v-for="board in boards" v-bind:key="board.url">
            <td>{{ board.name }}</td>
            <td>{{ board.archived }}</td>
            <td>{{ board.position }}</td>
        </tr>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
import store from '@/store'

export default {
  name: 'Boards',
  components: {},
  computed: {
    boards () {
      return store.state.boards;
    }
  },
  created: function () {
      console.log("Loading Boards...");
      store.dispatch('loadBoardsAsync');
      console.log("Done loading Boards");
  }
}
</script>
