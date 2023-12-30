import Space from "./space";

function Board({ board, handleClick, handleHover, gamePeriod, counter }) {
  return (
    <>
      {board.map((row, index) => {
        return (
          <div className=" flex bg-blue-50 border  " key={"row_" + index}>
            {row.map((space) => {
              return (
                <Space
                  key={"spaceComp" + space.x + space.y}
                  space={space}
                  handleClick={handleClick}
                  handleHover={handleHover}
                  gamePeriod={gamePeriod}
                  counter={counter}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
}

export default Board;
