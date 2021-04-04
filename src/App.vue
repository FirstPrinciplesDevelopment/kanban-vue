<template>
  <div
    id="nav"
    v-if="authenticated"
    class="flex items-center justify-between bg-gray-200"
  >
    <div id="nav-links" class="flex flex-row">
      <div class="text-2xl px-8 py-4 my-1 text-black">
        <router-link to="/about">About</router-link>
      </div>
      <div class="text-2xl px-8 py-4 my-1 text-black">
        <router-link to="/boards">Boards</router-link>
      </div>
    </div>
    <div class="float-right">
      <button
        v-on:click="logoutUser"
        type="button"
        class="mx-2 rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-white text-xl text-gray-700 hover:text-white hover:bg-gray-400 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
      >
        Logout
      </button>
    </div>
  </div>

  <MessageBanner />

  <div class="main-view">
    <router-view />
  </div>
</template>

<script>
import store from '@/store';
import MessageBanner from './components/MessageBanner.vue';

export default {
  name: 'App',
  computed: {
    authenticated() {
      return store.state.isAuthenticated;
    },
  },
  methods: {
    logoutUser() {
      store.commit('logout');
      this.$router.push({ name: 'Login' });
    },
  },
  async created() {
    // if there is token already in local storage, authenticate with it
    if (
      localStorage.getItem('kanbanAccessToken') &&
      localStorage.getItem('kanbanRefreshToken')
    ) {
      this.$store.commit('authenticate', {
        access: localStorage.getItem('kanbanAccessToken'),
        refresh: localStorage.getItem('kanbanRefreshToken'),
      });
    }
    // get Api routes
    await this.$store.dispatch('getApiRoutesAsync');
    if (store.state.isAuthenticated) {
      console.log('Loading Data...');
      this.$store.dispatch('loadDataAsync');
      console.log('Done loading data');
    }
  },
  components: {
    MessageBanner,
  }
};
</script>
