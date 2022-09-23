# Elevator Sim

## Challenge

- You are in charge of writing software for an elevator (lift) company.
- Your task is to write a program to control the travel of a lift for a 10 storey building.
- A passenger can summon the lift to go up or down from any floor, once in the lift they can choose the floor they’d like to travel to.
- Your program needs to plan the optimal set of instructions for the lift to travel, stop, and open its doors.

## To run app

```javascript
node index.js
```

### create array of objects with passengers e.g

{ pNum: 1, level: (integer of level passenger is on), direction: "up/down", destination: (integer of level passenger wants to go to) }

```javascript
const passengerGroup = [
  { pNum: 1, level: 4, direction: "up", destination: 6 },
  { pNum: 2, level: 9, direction: "up", destination: 10 },
  { pNum: 3, level: 1, direction: "up", destination: 2 },
];
```

### run function

```
runElevator()
```
