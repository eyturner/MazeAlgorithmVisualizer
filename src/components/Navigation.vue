<template>
  <section id="nav">
    <div id="navbar">
      <div class="navitem" id="title">Maze Algo Visualizer</div>
      <div class="navitem dropdown" id="algoList">
        {{currentAlgo }}<i class="fa fa-caret-down"></i>
        <div class="dropdown-content">
          <a v-for="(algo, index) in algorithms" :key="index" v-on:click="setCurrentAlgo(algo)">
          {{ algo }}
          </a>
        </div>
      </div>
      <div class="navitem" id="run" v-on:click="sendRunMsg">Visualize!</div>
      <div class="navitem" id="clear" v-on:click="sendClearMsg">Clear</div>
      <div class="navitem" id="speed">Change Speed</div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return{
      algorithms: ['Recursive BFS', 'Recursive DFS'],
      currentAlgo: 'Recursive DFS'
    }
  },
  methods: {
    sendRunMsg() {
      this.$root.$emit('run', this.currentAlgo);
    },
    sendClearMsg() {
      this.$root.$emit('clear');
    },
    setCurrentAlgo(newAlgo) {
      this.currentAlgo = newAlgo;
    }
  }
}
</script>

<style scoped>
#navbar {
  display: flex;
  justify-content: space-evenly;
  border: 1px solid black;
  height: 60px;
  background: rgb(48,66,84);
}

.navitem {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 2;
  color: white;
  transition: 0.2s ease-in-out;
}

.navitem:hover {
  background: rgb(37,199,147);
  transition: 0.2s ease-in-out;
}

#run {
  background: rgb(37,199,147);
  animation: runAnim 3s infinite;
}

#title {
  flex-grow: 1;
  font-size: 24px;
}

@keyframes runAnim {
  0% {
    background: rgb(37,199,147);
  }

  55% {
    background: rgb(25, 134, 100);
  }

  100% {
    background: rgb(37,199,147);
  }
}

.dropdown {
  position: relative;
}

.dropdown-content {
  position: absolute;
  top: 61px;
  z-index: 1;
  background: rgb(37,199,147);
  width: 100%;
}

.dropdown a {
  display: none;
  height: 30px;
  width: 100%;
  transition: 0.2s ease;
  padding-top: 5px;
}

.dropdown:hover a {
  display:block;
}

a:hover {
  display: block;
  background: rgb(25, 134, 100);
}
</style>