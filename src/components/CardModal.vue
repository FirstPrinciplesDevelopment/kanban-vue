<template>
  <!-- The Card Modal -->
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
            >
              <!-- Heroicon name: template -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                class="text-2xl pt-2 pb-4 leading-6 font-semibold text-gray-500"
                id="modal-headline"
              >
                Edit Card
              </h3>
              <input
                class="w-full appearance-none rounded-md px-3 py-2 border border-gray-300 placeholder-gray-500 text-xl font-semibold my-1 text-gray-900 focus:outline-none focus:ring-green-300 focus:border-green-300 focus:z-10 md:text-md"
                type="text"
                v-model="card.name"
                placeholder="name"
              />
              <textarea
                class="w-full appearance-none rounded-md px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-300 focus:border-green-300 focus:z-10 md:text-md"
                name="content"
                rows="20"
                cols="40"
                v-model="card.content"
                placeholder="content"
              />
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            @click="handleCardSave"
            type="button"
            class="w-1/3 mx-2 inline-flex justify-center rounded-md border border-green-400 shadow-sm px-4 py-2 bg-white text-xl text-green-400 hover:text-white hover:bg-green-400 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          >
            Save
          </button>
          <button
            @click="$emit('close')"
            type="button"
            class="w-1/3 mx-2 inline-flex justify-center rounded-md border border-red-600 shadow-sm px-4 py-2 bg-white text-xl text-red-600 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
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
