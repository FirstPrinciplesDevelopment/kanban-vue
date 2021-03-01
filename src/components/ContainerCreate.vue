<template>
  <div v-if="container">
    <div class="container-component">
      <h2>{{ container.name }}</h2>
    </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
// import store from 'vuex';
import Card from '@/components/Card.vue';

export default {
  name: 'Container',
  props: ['containerProp'],
  computed: {
    container() {
      return this.$store.getters.getContainerByUrl(this.containerProp.url);
    },
  },
  components: {
    Card,
  },
};
</script>
