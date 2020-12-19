<template>
    <button class="btn btn-primary" v-on:click="showModal = true">New Board</button>
    <!-- The Board Modal -->
    <div id="boardModal" class="modal" v-if="showModal">
        <!-- Modal content -->
        <div class="modal-content">
            <div class="modal-header">
                <span class="close">&times;</span>
                <h2>Modal Header</h2>
            </div>
            <div class="modal-body">
                <div class="create-board">
                    <input type="text" v-model="board.name" placeholder="name" />
                    <input type="text" v-model="board.slug" placeholder="slug" />
                    <input type="number" step="1" v-model="board.position" />
                </div>
            </div>
            <div class="modal-footer">
                <h3>Modal Footer</h3>
                <button class="btn btn-primary" v-on:click="createBoardAsync(board)">Create</button>
                <button class="btn btn-danger" v-on:click="showModal = false">Cancel</button>
            </div>
        </div> 
    </div>
</template>

<script>
// import { mapActions } from 'vuex';

export default {
    name: "CreateBoard",
    data() {
        return {
            board: {
                name: '',
                slug: '',
                position: 0,
                changed_by: null,
                archived: false,
                archived_by: null,
                archived_time: null
            },
            showModal: false
        }
    },
    methods: {
        createBoardAsync() {
            this.$store.dispatch('createBoardAsync', this.board);
            // close modal
            this.showModal = false;
            // reset local state
            this.board = {name: '', slug: '', position: 0, changed_by: null, archived: false, archived_by: null, archived_time: null};
        }
        // ...mapActions([
        //     'createBoardAsync'
        // ])
    }
}
</script>

<style scoped>
 /* The Modal (background) */
.modal {
  /* display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

 /* Modal Header */
.modal-header {
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
}

/* Modal Body */
.modal-body {padding: 2px 16px;}

/* Modal Footer */
.modal-footer {
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  animation-name: animatetop;
  animation-duration: 0.4s
}

/* Add Animation */
@keyframes animatetop {
  from {top: -300px; opacity: 0}
  to {top: 0; opacity: 1}
} 
</style>