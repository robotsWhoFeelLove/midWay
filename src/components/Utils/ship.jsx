function createShip(length, dir, name) {
  const ship = {
    length,
    hits: 0,
    x: null,
    y: null,
    dir,
    isSunk: false,
    name,
    isPlaced: false,
  };
  return ship;
}

export default function createFleet() {
  let fleet = {
    Battleship: createShip(4, "x", "Battleship"),
    Carrier: createShip(5, "x", "Carrier"),
    Cruiser: createShip(3, "x", "Cruiser"),
    Submarine: createShip(3, "x", "Submarine"),
    Destroyer: createShip(2, "x", "Destroyer"),
  };
  //   let fleet = {
  //     Battleship,
  //     Carrier,
  //     Cruiser,
  //     Submarine,
  //     Desroyer,
  //   };
  return fleet;
}
