<template>
  <div id="app">
    <Navigation></Navigation>
    <Grid></Grid>
    <Footer></Footer>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';
import Grid from './components/Grid.vue';

export default {
  name: 'App',
  components: {
    Navigation,
    Footer,
    Grid,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

body {
  margin: 0;
}
</style>
