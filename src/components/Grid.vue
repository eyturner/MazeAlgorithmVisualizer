<template>
  <section id="grid" :style='gridStyle'>
    <!-- Index there to help Vue with key binding -->
    <div v-for="(cell,index) in cells"
    :key="index + `${cell.visited}`" 
    v-bind:id="index" 
    class="cell" 
    :class="{
    'top' : cells[index].walls[0], 
    'right': cells[index].walls[1],
    'bottom': cells[index].walls[2],
    'left': cells[index].walls[3],
    'current': cells[index].isCurrent,
    'inStack': cells[index].inStack}"
    :style='cellStyle'
    v-on:click="setCurrent(index)">
    </div> 
  </section>
</template>

<script>
import Cell from '../models/Cell';
import {mazeRD, mazeRB} from '../algorithms/RecursiveBack';

export default {
  data() {
    return {
      cells: [],
      cellLength: 50,
      stack: [],
      current: 0,
      running: [false], // Set as array so algorithms can recognize when clear() is called
      speed: 40,
    }
  },

  methods: {
    populateCells(numRows, numCols) {
      for(let i = 0; i < numRows; i++) {        
        for(let j = 0; j < numCols; j++) {
          this.cells.push(new Cell(i*numCols + j));   
        }
      }
      this.setCurrent(0);
    },

    removeWall(current, next) {
      if (next - current === -1) {
        //next is to the left of current
        this.cells[current].walls.splice(3,1,false);
        this.cells[next].walls.splice(1,1,false);
      } else if (next - current === 1) {
        //next is to the right of current
        this.cells[current].walls.splice(1,1,false);
        this.cells[next].walls.splice(3,1,false);
      } else if (next - current > 1) {
        //next is below current
        this.cells[current].walls.splice(2,1,false);
        this.cells[next].walls.splice(0,1,false);
      } else {
        //next is above current
        this.cells[current].walls.splice(0,1,false);
        this.cells[next].walls.splice(2,1,false);
      }

    },

    clearGrid() {
      for(let i = 0; i < this.cells.length; i++) {
        this.cells[i].walls = [true,true,true,true];
        this.cells[i].visited = false;
        this.cells[i].inStack = false;
        this.setCurrent(0);
        this.stack = [];
      }
    },

    setCellLength(WIDTH) {
      let bestLength = 1000;
      for(let i = this.cellLength - 5; i < this.cellLength + 6; i++) {
        let distance = Math.abs(this.cellLength - (WIDTH % i));
        if (distance < bestLength) {
          bestLength = i;
        }
      }
      this.cellLength = bestLength;
    },

    setCurrent(index) {
      if(!this.running[0]) {
        this.cells[this.current].isCurrent = false
        this.current = index;
        this.cells[index].isCurrent = true;
      }

    }
  },

  computed: {
    cellStyle() {
      return `width: ${this.cellLength}px; height: ${this.cellLength}px`;
    },
    gridStyle() {
      return `width: ${window.innerWidth}px;`;
    }

  },

  mounted() {
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight - 75;
    this.setCellLength(WIDTH);
    const numCols = Math.floor(WIDTH/this.cellLength);
    const numRows = Math.floor(HEIGHT/this.cellLength);
    console.log('NUMBERS:',numRows, numCols);
    
    this.populateCells(numRows, numCols);    
    this.$root.$on('run',(algo) => {
      if(!this.running[0]) {
        this.running[0] = true;
        if(algo == 'Recursive BFS') {
          mazeRB(this.cells, this.stack, this.current, numRows, numCols, this.removeWall, this.running, this.speed);
          } else {
            console.log("Running with speed:", this.speed);
            
          mazeRD(this.cells, this.stack, this.current, numRows, numCols, this.removeWall, this.running, this.speed);
          }
        
        }
      });
    this.$root.$on('clear',() => {
      this.running[0] = false;
      this.clearGrid();
      });

    this.$root.$on('updateSpeed',(newSpeed) => {
      this.speed = 220 - newSpeed;
    });
  }
}
</script>

<style scoped>
#grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.cell {
  box-sizing: border-box;
  font-size: 10px;
}

.cell:hover {
  background: rgba(231,12,128);
}

.top {
  border-top: 0.5px solid black;
}
.right {
  border-right: 0.5px solid black;
}
.bottom {
  border-bottom: 0.5px solid black;
}
.left {
  border-left: 0.5px solid black;
}

.current {
  background: rgba(0,200,200,0.8) !important;
}

.inStack {
  background: rgba(200,0,200,0.8);
}

</style>