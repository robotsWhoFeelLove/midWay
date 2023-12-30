import React, { useEffect, useState } from "react";

const colors = {
  Battleship: " bg-[#08262C] ",
  Carrier: " bg-[#003B4F] ",
  Submarine: " bg-[#088199] ",
  Cruiser: " bg-[#C6CCD0] ",
  Destroyer: " bg-[#E8B00F] ",
};

function Space({ space, handleClick, handleHover, gamePeriod, counter }) {
  const [shipColor, setShipColor] = useState(" bg-blue-400 ");

  useEffect(() => {
    setShipColor(colors[space.isShip.name]);
  }, [counter]);

  // if (space.isShip) shipColor = colors[space.isShip.name];

  return (
    <>
      {counter > 0 && (
        <div
          onMouseEnter={() => handleHover(space, "enter")}
          onMouseLeave={() => handleHover(space, "leave")}
          onClick={() => handleClick(space)}
          className={
            "shrink h-9 w-9 md:h-10 md:w-10 border border-blue-300 " +
            (space.isShip && gamePeriod === "setup" && "  ") +
            (space.isShip &&
              !space.isTaken &&
              gamePeriod === "setup" &&
              " bg-red-200 ") +
            (!space.isHit &&
              space.name === "player" &&
              ` ${colors[space.isShip.name]} `) +
            (gamePeriod === "in progress" &&
              !space.isHit &&
              " hover:bg-blue-200 ") +
            (space.isHit &&
              space.isShip !== false &&
              " bg-red-400 animate-jump-in animate-once animate-duration-500") +
            (space.isHit &&
              !space.isShip &&
              " bg-red-100 animate-jump-in animate-once animate-duration-500")
          }
          key={"space_" + space.x + "_" + space.y}
        ></div>
      )}
    </>
  );
}

export default Space;
