<template>
  <div class="login">
    <span>Login</span>
    <div class="row">
      <div class="col">
        <div class="login-form">
          <input type="text" v-model="userName" placeholder="username"/>
          <input type="password" v-model="password" placeholder="password"/>
          <button class="btn btn-success" v-on:click="authenticate">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return { userName: '', password: '' };
  },
  methods: {
    async authenticate() {
      console.log('Authenticating async (awaiting)...');
      await this.$store.dispatch('authenticateAsync', { username: this.userName, password: this.password });
      console.log('Done Authenticating');
      this.$router.push({ name: 'Home' });
    }
  },
};
</script>

<style scoped>

</style>