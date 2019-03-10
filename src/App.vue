<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  body {
    margin: 0;
    font-size: 14px;
    font-weight: 500;
    -webkit-font-smoothing: antialiased;
  }

  p {
    line-height: 1.5em;
  }

  h1 + p, p + p {
    margin-top: 10px;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
