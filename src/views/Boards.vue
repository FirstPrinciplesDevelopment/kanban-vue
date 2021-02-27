<template>
  <div class="items-center justify-center p-12 max-w-8xl w-full space-y-8">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider"
                >
                  Archived
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="board in boards" v-bind:key="board.url">
                <td class="px-6 py-4 whitespace-nowrap text-2xl">
                  <router-link :to="'/board/' + board.slug">
                    {{ board.name }}
                  </router-link>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-xl">
                  <div
                    v-if="board.archived"
                    class="px-4 py-1 inline-flex leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >
                    Archived
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button
                    v-on:click="handleBoardEdit(board)"
                    class="px-4 py-1 text-xl text-blue-600 font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                  >
                    Edit
                  </button>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button
                    v-on:click="deleteBoardAsync(board.url)"
                    class="px-4 py-1 text-xl text-red-600 font-semibold rounded-full border border-red-600 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>


        </div>
      </div>
    </div>
    <div class="py-10">
      <BoardModal
        :initialBoard="selectedBoard"
        v-on:close="showModal = false"
        v-if="showModal"
      />
      <button
        class="px-4 py-1 text-xl text-green-500 font-semibold rounded-full border border-green-500 hover:text-white hover:bg-green-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        v-on:click="handleBoardCreate">
        New Board
      </button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from '@/store';
import BoardModal from '@/components/BoardModal.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Boards',
  data() {
    return {
      showModal: false,
      selectedBoard: {},
    };
  },
  components: {
    BoardModal,
  },
  async created() {
    if (store.state.isAuthenticated) {
      console.log('Loading Data...');
      this.$store.dispatch('loadDataAsync');
      console.log('Done loading data');
    }
  },
  computed: {
    boards() {
      return store.state.boards;
    },
  },
  methods: {
    handleBoardEdit(board) {
      console.log('handling board save');
      this.selectedBoard = board;
      this.showModal = true;
    },
    handleBoardCreate() {
      console.log('handling board create');
      this.selectedBoard = {};
      this.showModal = true;
    },
    ...mapActions(['deleteBoardAsync']),
  },
};
</script>
