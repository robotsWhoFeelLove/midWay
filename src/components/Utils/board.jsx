export default function createBoard(size, name) {
  function createSpace(x, y) {
    return { x, y, isShip: false, isHit: false, name, isTaken: false };
  }

  function createRow(rowNum) {
    let rows = [];
    let i = 0;
    while (i < size) {
      const space = createSpace(i, rowNum);
      rows.push(space);
      i++;
    }
    return rows;
  }

  function createRows() {
    let rows = [];
    let i = 0;
    while (i < size) {
      const space = createRow(i);
      rows.push(space);
      i++;
    }
    return rows;
  }

  const board = createRows();

  console.log({ board });
  return board;
}
