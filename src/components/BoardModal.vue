<template>
  <!-- The Board Modal -->
  <div id="board-modal" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <div class="modal-header">
        <span class="close">&times;</span>
        <h2>Modal Header</h2>
      </div>
      <div class="modal-body">
        <div class="create-board">
          <input type="text" v-model="board.name" placeholder="name" />
        </div>
      </div>
      <div class="modal-footer">
        <h3>Modal Footer</h3>
        <button class="btn btn-primary" v-on:click="handleBoardSave">
          Save
        </button>
        <button class="btn btn-danger" v-on:click="$emit('close')">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'BoardModal',
  props: ['initialBoard'],
  data() {
    return {
      board: _.clone(this.initialBoard),
    };
  },
  methods: {
    handleBoardSave() {
      if (this.board?.url?.length > 0) {
        // update board
        this.$store.dispatch('updateBoardAsync', this.board);
      } else {
        // create board
        this.$store.dispatch('createBoardAsync', this.board);
      }
      // close modal
      this.$emit('close');
      // reset local state
      this.board = {};
    },
  },
};
</script>
