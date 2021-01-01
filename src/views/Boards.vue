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
        <tr v-for="board in boards" v-bind:key="board.id">
            <td><router-link :to="'/board/' + board.id">{{ board.name }}</router-link></td>
            <td>{{ board.archived }}</td>
            <td>{{ board.position }}</td>
            <td><button v-on:click="handleBoardEdit(board)" class="btn btn-primary">Edit</button></td>
            <td><button v-on:click="deleteBoardAsync(board.id)" class="btn btn-danger">Delete</button></td>
        </tr>
    </table>
    <div>
      <BoardModal :initialBoard="selectedBoard" 
                  v-on:close="showModal = false"
                  v-if="showModal"/>
      <button class="btn btn-primary" v-on:click="handleBoardCreate">New Board</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from '@/store'
import BoardModal from '@/components/BoardModal.vue'
import { mapActions } from 'vuex';

export default {
  name: 'Boards',
  data() {
    return {
      showModal: false,
      selectedBoard: {}
    }
  },
  components: {
    BoardModal
  },
  computed: {
    boards () {
      return store.state.boards;
    }
  },
  methods: {
    handleBoardEdit (board) {
      console.log("handling board save");
      this.selectedBoard = board;
      this.showModal = true;
    },
    handleBoardCreate () {
      console.log("handling board create");
      this.selectedBoard = {};
      this.showModal = true;
    },
    ...mapActions([
      'deleteBoardAsync'
    ])
  }
}
</script>
