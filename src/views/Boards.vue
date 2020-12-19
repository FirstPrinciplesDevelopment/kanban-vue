<template>
  <div class="boards">
    <table id="board-table">
        <tr>
            <th>Name</th>
            <th>Archived</th>
            <th>Position</th>
            <th></th>
            <th></th>
        </tr>
        <tr v-for="board in boards" v-bind:key="board.url">
            <td>{{ board.name }}</td>
            <td>{{ board.archived }}</td>
            <td>{{ board.position }}</td>
            <td><button v-on:click="editBoard" class="btn btn-primary">Edit</button></td>
            <td><button v-on:click="deleteBoardAsync(board.id)" class="btn btn-danger">Delete</button></td>
        </tr>
    </table>
    <div>
      <CreateBoard />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from '@/store'
import CreateBoard from '@/components/CreateBoard.vue'
import { mapActions } from 'vuex';

export default {
  name: 'Boards',
  components: {
    CreateBoard
  },
  computed: {
    boards () {
      return store.state.boards;
    }
  },
  methods: {
    editBoard () {
      alert("editBoard not implemented");
    },
    ...mapActions([
      'deleteBoardAsync'
    ])
  },
  created: function () {
      console.log("Loading Boards...");
      store.dispatch('loadBoardsAsync');
      console.log("Done loading Boards");
  }
}
</script>
