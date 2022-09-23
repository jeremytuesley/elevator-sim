// A passenger can summon the lift to go up or down from any floor, once in the lift they can choose the floor they’d like to travel to.

// Your program needs to plan the optimal set of instructions for the lift to travel, stop, and open its doors.

// Some test cases:

// Passenger summons lift on the ground floor. Once in, choose to go to level 5.

// Passenger summons lift on level 6 to go down. Passenger on level 4 summons the lift to go down. They both choose L1.

// Passenger 1 summons lift to go up from L2. Passenger 2 summons lift to go down from L4. Passenger 1 chooses to go to L6. Passenger 2 chooses to go to Ground Floor

// Passenger 1 summons lift to go up from Ground. They choose L5. Passenger 2 summons lift to go down from L4. Passenger 3 summons lift to go down from L10. Passengers 2 and 3 choose to travel to Ground.

// -- Thought process --
// want instructions to be: elevator = {passengers: [p1, p2, p3, p4, p5], level: 0, currentDirection: up}
// display passengers and level to show p3 picked up, up, stop, diplay passengers and level to show p4 picked up,
// up, stop, diplay passengers and level(4) p4 now gone, up, stop, diplay passengers and level (6) p3 now gone (empty),
// up, diplay passengers and level(10) p2 on, down, stop, diplay passengers and level(5) p2, p1, down, stop diplay passengers and level (empty, 0)

// {passengers: [p3], level: 0, currentDirection: up} <-- always starts on up and level 0
// direction
// {passengers: [p3, p4], level: 1, currentDirection: up}
// direction
// {passengers: [p3], level: 4, currentDirection: up}
// direction
// {passengers: [], level: 6, currentDirection: up}
// direction
// {passengers: [p2], level: 10, currentDirection: down}
// direction
// {passengers: [p2, p1], level: 5, currentDirection: down}
// direction
// {passengers: [], level: 0, currentDirection: down} <-- ends with no passengers and whatever level was last and direction

// check if elevator level & direction match passenger, pick them up, otherwise next
// check each level if current passengers has destination

// ---- SETTINGS ----
// -- Supplied test cases --

// Passenger summons lift on the ground floor. Once in, choose to go to level 5.
// const passengerGroup = [{ pNum: 1, level: 0, direction: "up", destination: 5 }];

// Passenger summons lift on level 6 to go down. Passenger on level 4 summons the lift to go down. They both choose L1.
// const passengerGroup = [
//   { pNum: 1, level: 6, direction: "down", destination: 1 },
//   { pNum: 2, level: 4, direction: "down", destination: 1 },
// ];

// Passenger 1 summons lift to go up from L2. Passenger 2 summons lift to go down from L4. Passenger 1 chooses to go to L6. Passenger 2 chooses to go to Ground Floor
// const passengerGroup = [
//   { pNum: 1, level: 2, direction: "up", destination: 6 },
//   { pNum: 2, level: 4, direction: "down", destination: 0 },
// ];

// Passenger 1 summons lift to go up from Ground. They choose L5. Passenger 2 summons lift to go down from L4. Passenger 3 summons lift to go down from L10. Passengers 2 and 3 choose to travel to Ground.
// const passengerGroup = [
//   { pNum: 1, level: 0, direction: "up", destination: 5 },
//   { pNum: 2, level: 4, direction: "down", destination: 0 },
//   { pNum: 3, level: 10, direction: "down", destination: 0 },
// ];

// -- my test cases --
// testcase1 -- uncomment const below
// const passengerGroup = [
//   { pNum: 1, level: 5, direction: "down", destination: 0 },
//   { pNum: 2, level: 7, direction: "down", destination: 0 },
//   { pNum: 3, level: 0, direction: "up", destination: 6 },
//   { pNum: 4, level: 1, direction: "up", destination: 4 },
// ];

// testcase2
// const passengerGroup = [
//   { pNum: 1, level: 1, direction: "down", destination: 0 },
//   { pNum: 2, level: 10, direction: "down", destination: 3 },
//   { pNum: 3, level: 2, direction: "up", destination: 6 },
//   { pNum: 4, level: 1, direction: "up", destination: 4 },
// ];

// testcase3
// const passengerGroup = [
//   { pNum: 1, level: 1, direction: "up", destination: 2 },
//   { pNum: 2, level: 4, direction: "up", destination: 6 },
//   { pNum: 3, level: 9, direction: "up", destination: 10 },
//   { pNum: 4, level: 1, direction: "up", destination: 2 },
// ];

// testcase4
// const passengerGroup = [
//   { pNum: 1, level: 1, direction: "down", destination: 0 },
//   { pNum: 2, level: 10, direction: "down", destination: 3 },
//   { pNum: 3, level: 6, direction: "down", destination: 4 },
//   { pNum: 4, level: 2, direction: "down", destination: 1 },
// ];

// ---- SETTINGS END -----

const elevator = { level: 0, currentDirection: "up" };
const maxLevel = passengerGroup.reduce((max, passenger) => Math.max(passenger.level, passenger.destination, max), 0);

const instructElevator = () =>
  passengerGroup.forEach((passenger) => {
    if (
      passenger.level === elevator.level &&
      !passenger.insideElevator &&
      passenger.direction === elevator.currentDirection
    ) {
      passenger.insideElevator = true;
      console.log("Doors opening!", "Passenger", passenger.pNum, "has entered the elevator on level", elevator.level);
    }

    if (passenger.destination === elevator.level && passenger.insideElevator) {
      console.log("Doors opening!", "Passenger", passenger.pNum, "has left the elevator on level", elevator.level);
      passenger.insideElevator = false;
    }
  });

const runElevator = () =>
  [...Array(maxLevel * 2 + 1)].forEach((_, i) => {
    if (elevator.level === maxLevel) elevator.currentDirection = "down";
    instructElevator();

    elevator.currentDirection === "down" && elevator.level === 0
      ? console.log("Thanks for riding this elevator :)")
      : console.log("Going", elevator.currentDirection, "-", "Current Level:", elevator.level);

    if (elevator.currentDirection === "up" && elevator.level !== maxLevel) elevator.level += 1;
    if (elevator.currentDirection === "down" && elevator.level !== 0) elevator.level -= 1;
  });

runElevator();
