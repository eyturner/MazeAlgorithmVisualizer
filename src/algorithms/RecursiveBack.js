const mazeRD = (cells, stack, current, numRows, numCols, removeWall, running, speed) => {
  console.log(speed);
  if(!running[0]) {
    cells[current].isCurrent = false;
    return;
  }
  else if(cells[current].visited == false) {
    //Haven't run yet!
    console.log("running!");
    cells[current].visited = true;
    stack.push(current);
  }
  else if(stack.length === 0) {
    console.log("done!");
    cells[current].isCurrent = false;
    return;
  }    
    //console.log(stack.length);
    
    cells[current].isCurrent = false;
    current = stack.pop();
    cells[current].isCurrent = true;
    
    cells[current].inStack = false; 
    let next = checkNeighbors(cells, current, numRows, numCols)
    if(next >= 0) {
      //found neighbors!
      stack.push(current);
      cells[current].inStack = true;
      cells[next].visited = true;
      removeWall(current, next);
      stack.push(next);
    }
    setTimeout(() => mazeRD(cells, stack, current, numRows, numCols, removeWall,running, speed),speed);
    return;
}

const mazeRB = (cells, stack, current, numRows, numCols, removeWall, running, speed) => {
  if(!running[0]) {
    cells[current].isCurrent = false;
    return;
  }
  else if(cells[current].visited == false) {
    //Haven't run yet!
    console.log("running!");
    cells[current].visited = true;
    stack.push(current);
  }
  else if(stack.length === 0) {
    console.log("done!");
    cells[current].isCurrent = false;
    return;
  }    
    //console.log(stack.length);
    
    cells[current].isCurrent = false;
    current = stack.shift();
    cells[current].isCurrent = true;
    
    cells[current].inStack = false; 
    let next = checkNeighbors(cells, current, numRows, numCols)
    if(next >= 0) {
      //found neighbors!
      stack.push(current);
      cells[current].inStack = true;
      cells[next].visited = true;
      removeWall(current, next);
      stack.push(next);
    }
    setTimeout(() => mazeRB(cells, stack, current, numRows, numCols, removeWall,running, speed),speed);
    return;
}

const checkNeighbors = (cells, current, numRows, numCols) => {
  let nextArr = [];
  if(current > numCols) { 
    //not on top row
    if(!cells[current - numCols].visited) {
      nextArr.push(current - numCols);
    }
  }
  if((current + 1) % (numCols)) {
    //not on right column
    if(!cells[current + 1].visited) {
      nextArr.push(current + 1);
    }
  }
  if(current < numCols*(numRows - 1)) {
    //not on bottom row
    if(!cells[current + numCols].visited) {
      nextArr.push(current + numCols);
    }
  }
  if(current % numCols) {    
    //not on left column
    if(!cells[current - 1].visited) {
      nextArr.push(current - 1);
    }
  }
  if(nextArr.length > 0) {
    let choice = Math.floor(Math.random()*nextArr.length);
    return nextArr[choice];
  } else {
    return -1;
  }
}

export {mazeRD, mazeRB}