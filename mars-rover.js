// ======================
// Rover Objects
// ======================
const ROVER1 = {
  name: "Rover1",
  direction: "N",
  travelLog: [[0,0,"N"]],
  x: 0,
  y: 0,
}

const ROVER2 = {
  name: "Rover2",
  direction: "N",
  travelLog: [[7,6,"N"]],
  x: 7,
  y: 6,
}

// ======================
// Grid
// ======================
const marsGrid = [
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null]
]

// ======================
// Create Obstacles
// ======================
function createObstacles(numObstacles) {
  for (let i = 0; i <= numObstacles; i++) {
    let x = Math.floor(Math.random() * 6)
    let y = Math.floor(Math.random() * 6)
    if (marsGrid[y][x] === null) marsGrid[y][x] = "#"
  }
}
//Initialize Obstacles
createObstacles(5);

// ====================== 
// Turn Left
// ======================
function turnLeft(rover){
  switch(rover.direction) {
    case "N":
      rover.direction = "W"
      rover.travelLog.push([rover.x, rover.y, rover.direction])
      break;
    case "W":
      rover.direction = "S"
      rover.travelLog.push([rover.x, rover.y, rover.direction])
      break;
    case "S":
      rover.direction = "E"
      rover.travelLog.push([rover.x, rover.y, rover.direction])
      break;
    case "E":
      rover.direction = "N";
      rover.travelLog.push([rover.x, rover.y, rover.direction])
      break;
  }
  console.log(`turnLeft was called, ${rover.name} is facing ${rover.direction}`);
}

// ======================
// Turn Right
// ======================
function turnRight(rover){
  switch(rover.direction) {
    case "N":
      rover.direction = "E"
      rover.travelLog.push([rover.x, rover.y, rover.direction])
      break;
    case "E":
      rover.direction = "S"
      rover.travelLog.push([rover.x, rover.y, rover.direction])
      break;
    case "S":
      rover.direction = "W"
      rover.travelLog.push([rover.x, rover.y, rover.direction])
      break;
    case "W":
      rover.direction = "N"
      rover.travelLog.push([rover.x, rover.y, rover.direction])
      break;
  }
  console.log(`turnRight was called, ${rover.name} is facing ${rover.direction}`)
}

// ======================
// Move Forward
// ======================
function moveForward(rover){
  switch (rover.direction) {
    case "N":
        marsGrid[rover.y][rover.x] = null
        rover.y -= 1
        marsGrid[rover.y][rover.x] = rover.name
        rover.travelLog.push([rover.x, rover.y, rover.direction])
        break;
    case "E":
        marsGrid[rover.y][rover.x] = null
        rover.x += 1
        marsGrid[rover.y][rover.x] = rover.name
        rover.travelLog.push([rover.x, rover.y, rover.direction])
        break;
    case "S":
        marsGrid[rover.y][rover.x] = null
        rover.y += 1
        marsGrid[rover.y][rover.x] = rover.name
        rover.travelLog.push([rover.x, rover.y, rover.direction])
        break;
    case "W":
        marsGrid[rover.y][rover.x] = null
        rover.x -= 1
        marsGrid[rover.y][rover.x] = rover.name
        rover.travelLog.push([rover.x, rover.y, rover.direction])

        break;
  }
  console.log(`moveForward was called ${rover.name}'s new position is [${rover.x}, ${rover.y}]`)
  console.table(marsGrid) // put this here so you can see it moving in the grid
}

// ======================
// Move Backward
// ======================
function moveBackward(rover) {
  switch (rover.direction) {
    case "N":
        marsGrid[rover.y][rover.x] = null
        rover.y += 1
        marsGrid[rover.y][rover.x] = rover.name
        rover.travelLog.push([rover.x, rover.y, rover.direction])
        break;
    case "E":
        marsGrid[rover.y][rover.x] = null
        rover.x -= 1
        marsGrid[rover.y][rover.x] = rover.name
        rover.travelLog.push([rover.x, rover.y, rover.direction])
        break;
    case "S":
        marsGrid[rover.y][rover.x] = null
        rover.y -= 1
        marsGrid[rover.y][rover.x] = rover.name
        rover.travelLog.push([rover.x, rover.y, rover.direction])
        break;
    case "W":
        marsGrid[rover.y][rover.x] = null
        rover.x += 1
        marsGrid[rover.y][rover.x] = rover.name
        rover.travelLog.push([rover.x, rover.y, rover.direction])
        break;
  }
  console.log(`moveBackward was called ${rover.name}'s new position is [${rover.x}, ${rover.y}]`)
  console.table(marsGrid) // put this here so you can see it moving in the grid
}

// ======================
// Command List
// ======================
function commandList(rover, string) {
  marsGrid[rover.y][rover.x] = rover.name
  console.log(`${rover.name}'s original position is [${rover.x}, ${rover.y}]`) // put this here to show original position in console
  console.table(marsGrid) // put this here to show rover's original position.
  if (!!isValid(string)) {
    for (let i = 0; i < string.length; i++) {
      let command = string[i].toLowerCase();
      switch(command) {
        case "l":
          turnLeft(rover);
          break;
        case "r":
          turnRight(rover);
          break;
        case "f":
          if (forwardCheck(rover)) moveForward(rover);
          else return printTravelLog(rover);
          break;
        case "b":
          if (backwardCheck(rover)) moveBackward(rover);
          else return printTravelLog(rover);
      }
    }
  }
  printTravelLog(rover);
}
// Initialize commands
commandList(ROVER1, "rffrfflfrff")
//commandList(ROVER2, "rffrfflfrff") // commands for rover2

// ======================
// Validate Commands
// ======================
function isValid(string) {
  let valid = ["f", "r", "l", "b"]
  for (let i = 0; i < string.length; i++) {
    if (!valid.includes(string[i])) {
      console.log(`${string[i]} is not a valid command. Valid commands are "l", "r", "f" and "b".`)
      return false
    }
  }
  return true
}

// ======================
// Print Travel Log
// ======================
function printTravelLog(rover) {
  rover.travelLog.forEach(function(position, i) {
    return console.log(`The ${rover.name} has moved ${i} time(s). It's position is [${position[0]}, ${position[1]}] ${position[2]}`)
  })
}

// ======================
// Check for obstacles in forward movement
// ======================
function forwardCheck(rover) {
  switch(rover.direction) {
    case "N":
      if (marsGrid[rover.y-1][rover.x] === null && rover.y > 0) return true
      else {
        console.log(`${rover.name} has encountered an obstacle at [${rover.x}, ${rover.y-1}]`)
        return false;
      }
    case "E":
      if (marsGrid[rover.y][rover.x+1] === null && rover.x < 9) return true
      else {
        console.log(`${rover.name} has encountered an obstacle at [${rover.x+1}, ${rover.y}]`)
        return false;
      }
    case "S":
      if (marsGrid[rover.y+1][rover.x] === null && rover.y < 9) return true
      else {
        console.log(`${rover.name} has encountered an obstacle at [${rover.x}, ${rover.y+1}]`)
        return false;
      }
    case "W":
      if (marsGrid[rover.y][rover.x-1] === null && rover.x > 0) return true
      else {
        console.log(`${rover.name} has encountered an obstacle at [${rover.x-1}, ${rover.y}]`)
        return false;
      }
  }
}

// ======================
// Check for obstacles in backward movement
// ======================
function backwardCheck(rover) {
  switch(rover.direction) {
    case "N":
      if (marsGrid[rover.y+1][rover.x] === null && rover.y < 9) return true
      else {
        console.log(`${rover.name} has encountered an obstacle at [${rover.x}, ${rover.y+1}]`)
        return false;
      }
    case "E":
      if (marsGrid[rover.y][rover.x-1] === null && rover.x > 0) return true
      else {
        console.log(`${rover.name} has encountered an obstacle at [${rover.x-1}, ${rover.y}]`)
        return false;
      }
    case "S":
      if (marsGrid[rover.y-1][rover.x] === null  && rover.y > 0) return true
      else {
        console.log(`${rover.name} has encountered an obstacle at [${rover.x}, ${rover.y-1}]`)
        return false;
      }
    case "W":
      if (marsGrid[rover.y][rover.x+1] === null && rover.x < 9) return true
      else {
        console.log(`${rover.name} has encountered an obstacle at [${rover.x+1}, ${rover.y}]`)
        return false;
      }
  }
}