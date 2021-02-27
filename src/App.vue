<template>
  <div v-if="authenticated" id="nav" class="flex flex-row bg-gray-200">
    <div class="text-2xl px-8 py-4 my-1">
          <router-link to="/">Home</router-link>
    </div>
    <div class="text-2xl px-8 py-4 my-1">
      <router-link to="/about">About</router-link>
    </div>
    <div class="text-2xl px-8 py-4 my-1">
      <router-link to="/boards">Boards</router-link>
    </div>
  </div>
  <div class="">
    <router-view/>
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
    await this.$store.dispatch('getApiRoutesAsync');
    if (store.state.isAuthenticated)
    {
      console.log('Loading Data...');
      this.$store.dispatch('loadDataAsync');
      console.log('Done loading data');
    }
  }
};
</script>

