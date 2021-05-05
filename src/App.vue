<template>
  <div id="app">
    <Board msg="Welcome to Simple Blackjack" />
  </div>
</template>

<script>
import Board from './components/Board';
export default {
  name: 'App',
  components: {
    Board,
  },
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
