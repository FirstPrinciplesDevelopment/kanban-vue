<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/boards">Boards</router-link>
  </div>
  <router-view/>
</template>

<style>
/* global style */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  color: #10cc39;
}

body {
  color: #10cc39;
  background-color: #33333f;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #45878a;
}

#nav a.router-link-exact-active {
  color: #10cc39;
}
</style>
