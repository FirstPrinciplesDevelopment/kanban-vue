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