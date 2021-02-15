<template>
  <!-- The Card Modal -->
  <div id="card-modal" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <div class="modal-header">
        <span class="close" @click="$emit('close')">&times;</span>
        <input type="text" v-model="card.name" placeholder="name" />
      </div>
      <div class="modal-body">
        <textarea
          rows="25"
          cols="55"
          v-model="card.content"
          placeholder="content"
        />
      </div>
      <div class="modal-footer">
        <h3>Modal Footer</h3>
        <button class="btn btn-primary" @click="handleCardSave">
          Save
        </button>
        <button class="btn btn-danger" @click="$emit('close')">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'CardModal',
  props: ['initialCard'],
  data() {
    return {
      card: _.clone(this.initialCard),
    };
  },
  methods: {
    handleCardSave() {
      if (this.card?.url?.length > 0) {
        // update card
        this.$store.dispatch('updateCardAsync', this.card);
      } else {
        // create card
        this.$store.dispatch('createCardAsync', this.card);
      }
      // close modal
      this.$emit('close');
      // reset local state
      this.card = {};
    },
  },
};
</script>

<style scoped>
/* The Modal (background) */
.modal {
  /* display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 20%;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
.modal-body {
  padding: 2px 16px;
}

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
  width: 45%;
  height: 60%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation-name: animatetop;
  animation-duration: 0.4s;
}

/* Add Animation */
@keyframes animatetop {
  from {
    bottom: -300px;
    opacity: 0;
  }
  to {
    bottom: 0;
    opacity: 1;
  }
}
</style>
