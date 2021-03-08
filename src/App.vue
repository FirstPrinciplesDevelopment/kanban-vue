<template>
  <div v-if="authenticated" id="nav" class="flex flex-row bg-gray-200">
    <div class="text-2xl px-8 py-4 my-1 text-black">
      <router-link to="/about">About</router-link>
    </div>
    <div class="text-2xl px-8 py-4 my-1 text-black">
      <router-link to="/boards">Boards</router-link>
    </div>
  </div>
  <div class="">
    <router-view />
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: 'App',
  computed: {
    authenticated() {
      return store.state.isAuthenticated;
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
};
</script>
