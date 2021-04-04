<template>
  <div class="bg-indigo-600">
    <div
      v-for="message in messages"
      :key="message"
      class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8"
    >
      <Message v-bind:messageProp="message" v-bind:secondsProp="4" v-on:destroy="remove(message)"/>
    </div>
    <div class="flex justify-center font-small">
      <button v-if="messages.length > 0" @click="clear()">
          Clear All Messages
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Message from '@/components/Message.vue';

export default {
  name: 'MessageBanner',
  computed: {
    ...mapGetters({ messages: 'getMessages' }),
  },
  methods: {
    ...mapMutations({ clear: 'clearMessages', remove: 'removeMessage', pop: 'popMessage'}),
  },
  components: {
      Message,
  },
};
</script>
