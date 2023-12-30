import { useState, useEffect } from "react";
import createBoard from "../Utils/board";
import { space } from "postcss/lib/list";
import Space from "./BoardComponents/space";
import Board from "./BoardComponents/board";
import Dock from "./Dock/Dock";
import createFleet from "../Utils/ship";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import Ping from "./Utils/Ping";
import shipImage from "../../assets/darren-nunis-5zijXd5EyzQ-unsplash.jpg";
import GameDock from "./Dock/GameDock";
import Wave from "./Utils/Wave";

let size = 10;
let player = createBoard(size, "player");
let enemy = createBoard(size, "enemy");
let playerShips = createFleet("player");
let enemyShips = createFleet("enemy");
// console.log({ playerShips });

function Battleship() {
  const [playerBoard, setPlayerBoard] = useState(player);
  const [enemyBoard, setEnemyBoard] = useState(enemy);
  const [currentPlayer, setCurrentPlayer] = useState("player");
  const [playerFleet, setPlayerFleet] = useState(playerShips);
  const [enemyFleet, setEnemyFleet] = useState(enemyShips);
  const [selectedShip, setSelectedShip] = useState();
  const [gamePeriod, setGamePeriod] = useState("pregame");
  const [counter, setCounter] = useState(1);
  const [round, setRound] = useState(1);
  const [shotQueue, setShotQueue] = useState([]);
  const [hitQueue, setHitQueue] = useState([]);
  const [isPing, setIsPing] = useState(false);
  const [mode, setMode] = useState("full");
  const [message, setMessage] = useState(false);
  const [tutorialPhase, setTutorialPhase] = useState(0);

  function resetGame() {
    setPlayerBoard(player);
    setEnemyBoard(enemy);
    setCurrentPlayer("player");
    setPlayerFleet(playerShips);
    setEnemyFleet(enemyShips);
    setGamePeriod("pregame");
    setShotQueue([]);
    setHitQueue([]);
  }

  function buildShipSpaces(selectedShip, space, tempBoard) {
    return Array.from(Array(selectedShip.length)).map((el, index) => {
      let currentSpace =
        tempBoard[selectedShip.dir === "y" ? space.y + index : space.y][
          selectedShip.dir === "x" ? space.x + index : space.x
        ];
      return currentSpace;
    });
  }

  function updateBoard(board) {
    if (board[0][0].name === "player") {
      setPlayerBoard(board);
    } else {
      setEnemyBoard(board);
    }
  }

  function checkGameStatus() {
    console.log(Object.values(playerFleet).filter((ship) => ship.isSunk));
    if (Object.values(playerFleet).filter((ship) => ship.isSunk).length === 5) {
      setGamePeriod("result");
      return "enemy wins";
    }

    if (Object.values(enemyFleet).filter((ship) => ship.isSunk).length === 5) {
      setGamePeriod("result");
      return "player wins";
    }
    return false;
  }

  function handlePing() {
    console.log("ping");
    setTimeout(() => {
      setIsPing(false);
    }, 800);
  }

  let alpha = "ABCDEFGHIJ";
  let alphaArr = Array.from(alpha);

  function handleMessage(space) {
    let tempMessage;
    if (typeof space === "string") {
      tempMessage = space;
    } else {
      if (space.name === "player") {
        tempMessage = "THE ENEMY";
        if (space.isShip && !space.isShip.isSunk) {
          tempMessage =
            tempMessage +
            " HIT YOUR " +
            space.isShip.name.toUpperCase() +
            " AT " +
            alphaArr[space.y] +
            space.x;
        }
        if (space.isShip && space.isShip.hits + 1 === space.isShip.length) {
          tempMessage =
            tempMessage +
            " SUNK YOUR " +
            space.isShip.name.toUpperCase() +
            " AT " +
            alphaArr[space.y] +
            space.x;
        }
        if (!space.isShip) {
          tempMessage =
            tempMessage + " MISSED AT " + alphaArr[space.y] + space.x;
        }
      }
      if (space.name === "enemy") {
        if (space.isShip && !space.isShip.isSunk) {
          tempMessage =
            "YOU HIT AN ENEMY SHIP AT " + alphaArr[space.y] + space.x;
        }
        if (space.isShip && space.isShip.hits + 1 === space.isShip.length) {
          tempMessage =
            "YOU SUNK THE ENEMY'S " +
            space.isShip.name.toUpperCase() +
            " AT " +
            alphaArr[space.y] +
            space.x;
        }
        if (!space.isShip) {
          tempMessage = "YOU MISSED AT " + alphaArr[space.y] + space.x;
        }
      }
    }
    setTimeout(() => {
      setMessage(tempMessage);
    }, 800);
    setTimeout(() => {
      setMessage(false);
    }, 2000);
  }

  useEffect(() => {
    // if(message) handleMessage()
    if (currentPlayer === "player") {
      let result = gamePeriod === "in progress" ? checkGameStatus() : false;
      if (result) console.log({ result });
    }
    if (currentPlayer === "enemy") {
      handlePing();
      setIsPing(true);
      setTimeout(() => {
        enemyMove();
      }, 2000);
    }
  }, [currentPlayer]);

  function nearMoves(space, board) {
    let tempMoves = [];
    Array.from(Array(3)).map((el, i) => {
      Array.from(Array(3)).map((item, j) => {
        let y = space.y + i - 1;
        let x = space.x + j - 1;
        if (y > 9 || y < 0 || x > 9 || x < 0 || i === j) return;
        tempMoves = [...tempMoves, board[y][x]];
      });
    });
    console.log({ tempMoves });
    return tempMoves.filter((move) => {
      return move.isHit === false;
    });
  }

  function isSunk(ship, space, tempBoard) {
    let spaces = buildShipSpaces(ship, space, tempBoard);

    console.log({ spaces });
  }

  function detectAxis(hits, queued, misses) {
    let detected = [];

    playerBoard.map((el, i) => {
      if (hits.filter((item) => item.x === i).length > 1)
        detected.push({ axis: "x", num: i });
      if (hits.filter((item) => item.y === i).length > 1)
        detected.push({ axis: "y", num: i });
    });

    return detected;
  }

  function enemyMove() {
    let tempFleet = { ...playerFleet };
    let tempBoard = [...playerBoard];
    let tempHits = [...hitQueue].filter((el) => {
      return tempBoard[el.y][el.x].isShip.isSunk === false;
    });
    let space;

    // let tempQueue = [...shotQueue].filter((el) => {
    //   console.log({ el });
    //   return el.isHit === false;
    // });

    let tempQueue = [];
    tempHits.map((el) => {
      tempQueue = [...tempQueue, ...nearMoves(el, tempBoard)];
    });

    // console.log({ tempBoard, tempHits, space, tempQueue });
    let axis = detectAxis(tempHits, tempQueue);
    console.log({ axis });

    let testAxis = axis.map((ax) => {
      let tempTest = tempQueue.filter((el) => {
        return el[ax.axis] === ax.num;
      });
      return tempTest > 0;
    });

    console.log({ testAxis, axis });

    if (axis.length > 0 && !testAxis[0] === false) {
      tempQueue = tempQueue.filter((el) => {
        return el[axis[0].axis] === axis[0].num;
      });
    }
    if (tempHits.length > 0 && tempQueue.length > 0) {
      space = tempBoard[tempQueue[0].y][tempQueue[0].x];
      // console.log({ space });
    }

    if (tempHits.length === 0) {
      tempQueue = [];
      let movesArr = tempBoard.map((row) =>
        row.filter((space) => space.isHit === false)
      );
      let row = Math.floor(movesArr.length * Math.random());
      let column = Math.floor(movesArr[row].length * Math.random());
      space = movesArr[row][column];
    }
    space.isHit = true;
    handleMessage(space);

    if (space.isShip) {
      let currentShip = tempFleet[space.isShip.name];
      currentShip.hits = currentShip.hits + 1;
      if (currentShip.hits === currentShip.length) currentShip.isSunk = true;
      tempHits = [...hitQueue, space];
      let moves = nearMoves(space, tempBoard);
      tempQueue = [...tempQueue, ...moves];
      tempQueue = tempQueue.filter((el) => {
        // console.log({ el });
        return el.isHit === false;
      });

      // console.log({ tempHits, tempQueue, space });
    }
    setHitQueue(tempHits);
    setShotQueue(tempQueue);
    updateBoard(tempBoard);
    console.log({ tempHits, tempQueue, space });
    setTimeout(() => {
      setCurrentPlayer("player");
      setPlayerFleet(tempFleet);
    }, 800);
  }

  function handleHover(space, mode) {
    // console.log({ space });
    if (!selectedShip) return;
    // if (space.isShip) return;
    if (space[selectedShip.dir] + selectedShip.length > size) return;

    if (gamePeriod === "setup") {
      let tempBoard =
        space.name === "player" ? [...playerBoard] : [...enemyBoard];

      let spaces = Array.from(Array(selectedShip.length)).map((el, index) => {
        let currentSpace =
          tempBoard[selectedShip.dir === "y" ? space.y + index : space.y][
            selectedShip.dir === "x" ? space.x + index : space.x
          ];
        return currentSpace;
      });

      let takenTest =
        spaces.filter((el) => {
          // console.log({ el });
          return el.isTaken;
        }).length > 0;
      // console.log({ spaces, takenTest });
      if (takenTest) return;
      if (!takenTest) {
        spaces.map((el, index) => {
          spaces[index].isShip =
            !spaces[index].isTaken && mode === "enter" ? true : false;
        });
      }
      space.name === "player"
        ? setPlayerBoard(tempBoard)
        : setEnemyBoard(tempBoard);
    }
  }

  function handleRotate() {
    let tempFleet = { ...playerFleet };
    let mutableFleet = Object.values(tempFleet).map((temp) => {
      if (temp.isPlaced) return temp;
      if (temp.dir !== "y") {
        temp.dir = "y";
      } else {
        temp.dir = "x";
      }
      return temp;
    });
    if (selectedShip) setSelectedShip(tempFleet[selectedShip.name]);

    // console.log({ temp });
    // let tempFleet = { ...playerFleet };
    // tempFleet[temp.name] = temp;

    setPlayerFleet(tempFleet);
  }

  function handleSelectedShip(ship) {
    setSelectedShip(ship);
    // console.log({ ship });
  }

  function randomInBounds(size, ship) {
    return {
      x: Math.floor(
        Math.random() * (ship.dir === "x" ? size - ship.length : size)
      ),
      y: Math.floor(
        Math.random() * (ship.dir === "y" ? size - ship.length : size)
      ),
    };
  }

  function placeEnemyShips() {
    // console.log("placing enemy");
    let tempShips = { ...enemyFleet };

    let tempBoard = [...enemyBoard];

    function recursiveFunction(tempShips, tempBoard) {
      let currentShip;
      Object.values(tempShips).map((ship, index) => {
        if (ship.isPlaced === false) {
          currentShip = tempShips[ship.name];
        }
      });

      if (currentShip === undefined) {
        setGamePeriod("in progress");
        return;
      }

      currentShip.dir = Math.floor(Math.random() * 2) ? "x" : "y";
      let move = randomInBounds(size, currentShip);
      // console.log({ tempBoard });

      let spaces = buildShipSpaces(
        currentShip,
        tempBoard[move.y][move.x],
        tempBoard
      );

      let shipTest = spaces.filter((space) => space.isShip).length;

      if (shipTest === 0) {
        tempShips[currentShip.name].x = move.x;
        tempShips[currentShip.name].y = move.y;
        tempShips[currentShip.name].isPlaced = true;

        spaces.map((space) => {
          let newSpace = tempBoard[space.y][space.x];
          newSpace.isShip = tempShips[currentShip.name];
          newSpace.isTaken = true;
        });
      }

      recursiveFunction(tempShips, tempBoard);
    }

    recursiveFunction(tempShips, tempBoard);
    setCurrentPlayer("enemy");
    // console.log({ tempBoard, tempShips });
  }

  function handleHit(space, gameBoard) {
    console.log("handleHit");
    if (space.name === "player") setRound((prev) => prev + 1);
    space.isHit = true;
    handleMessage(space);
    if (space.isShip) {
      let tempFleet =
        space.name === "player" ? { ...playerFleet } : { ...enemyFleet };
      let tempShip = tempFleet[space.isShip.name];
      tempShip.hits = tempShip.hits + 1;
      if (tempShip.hits === tempShip.length) {
        console.log("sunk");
        tempShip.isSunk = true;
      }
      if (space.name === "player") {
        setPlayerFleet(tempFleet);
        setPlayerBoard(gameBoard);
      } else {
        setEnemyFleet(tempFleet);
        setEnemyBoard(gameBoard);
      }
    }
    setCounter((prev) => prev + 1);
    setTimeout(
      () =>
        currentPlayer === "player"
          ? setCurrentPlayer("enemy")
          : setCurrentPlayer("player"),
      800
    );
    // console.log({ currentPlayer });
  }

  function handleClick(srcSpace) {
    let tempBoard =
      srcSpace.name === "player" ? [...playerBoard] : [...enemyBoard];
    let space = tempBoard[srcSpace.y][srcSpace.x];

    if (gamePeriod === "in progress") {
      if (space.name === "player") return;
      if (space.isHit) return;
      handleHit(space, tempBoard);
    }

    if (selectedShip && gamePeriod === "setup") {
      setupShips(space, tempBoard);
    }
    return true;
  }

  function handleMode() {
    if (mode === "split") {
      console.log("full");
      setMode("full");
    } else {
      console.log("split");
      setMode("split");
    }
    setCounter((prev) => prev + 1);
  }

  function setupShips(space, tempBoard) {
    let spaces = buildShipSpaces(selectedShip, space, tempBoard);

    if (space[selectedShip.dir] + selectedShip.length > size) return false;
    if (spaces.filter((space) => space.isTaken).length) return false;

    let tempFleet = { ...playerFleet };

    let tempShip = tempFleet[selectedShip.name];

    tempBoard.map((row) => {
      return row.map((space) => {
        if (space.isShip && !space.isTaken) {
          space.isTaken = true;
          space.isShip = tempShip;
        }

        return space;
      });
    });
    tempShip.isPlaced = true;
    tempShip.x = space.x;
    tempShip.y = space.y;

    setPlayerBoard(tempBoard);
    setPlayerFleet(tempFleet);
    setCounter((prev) => prev + 1);
    console.log(
      Object.values(tempFleet).filter((ship) => {
        return !ship.isPlaced;
      }).length === 0
    );
    if (
      Object.values(tempFleet).filter((ship) => {
        return !ship.isPlaced;
      }).length === 0
    ) {
      // console.log("enemy");

      placeEnemyShips(enemyFleet);
    }

    setSelectedShip(false);

    console.log({
      playerBoard,
      enemyBoard,
      playerFleet,
      enemyFleet,
      gamePeriod,
    });
  }

  return (
    <>
      {isPing && (
        <div className="fixed z-50">
          <Ping />
        </div>
      )}

      {message && (
        <div className="mt-20 fixed z-50 w-screen h-screen flex justify-center animate-fade-up animate-once animate-duration-[800ms]">
          <div className="text-[40px] md: text-[100px] text-[#CD0000] font-quantico bg-slate-200 p-4 bg-opacity-60 z-50">
            {message}
          </div>
          {/* <Wave
            text={message}
            color="#0059b3"
            textSize={"20"}
            widthModifier={30}
          /> */}
        </div>
      )}
      {counter > 0 && gamePeriod !== "pregame" && (
        <ScoreBoard
          handleMode={handleMode}
          resetGame={resetGame}
          mode={mode}
          playerScore={
            Object.values(playerFleet).filter((ship) => !ship.isSunk).length
          }
          enemyScore={
            Object.values(enemyFleet).filter((ship) => !ship.isSunk).length
          }
          round={round}
        />
      )}
      {gamePeriod === "result" && (
        <div>
          <div className=" h-fit p-10 bg-opacity-70 mt-20 h-screen flex flex-col items-center animate-fade-up animate-once animate-duration-[5000ms] ">
            <Wave
              text={
                Object.values(playerFleet).filter((el) => !el.isSunk).length > 0
                  ? "YOU WIN"
                  : "YOU LOSE"
              }
              color="#0059b3"
              textsize={"60"}
              widthmodifier={45}
            />
          </div>
        </div>
      )}
      <div
        style={{
          backgroundImage: `url(${shipImage})`,
        }}
        className="bg-center md:bg-[center_top_-200px] bg-cover flex md:justify-center gap-10 min-h-screen bg-blue-100 flex-col md:flex-row p-4 z-50"
      >
        {gamePeriod === "pregame" && (
          <div className=" bg-slate-50 h-content p-10 bg-opacity-20 mt-20 h-screen flex flex-col items-center animate-fade-up animate-once animate-duration-[5000ms] ">
            <div className="">
              <Wave
                text="MIDWAY"
                color="#0059b3"
                textsize={"90"}
                widthmodifier={65}
              />
            </div>
            <div className="flex justify-between w-full mt-20">
              <button
                onClick={() => setGamePeriod("setup")}
                className="w-40 bg-blue-400 text-white text-3xl border p-2 rounded-lg border-2 font-quantico"
              >
                BEGIN
              </button>
              <button
                onClick={() => {
                  setGamePeriod("setup");
                  setTutorialPhase((prev) => prev + 1);
                }}
                className="w-40 bg-blue-400 text-white text-3xl border p-2 rounded-lg border-2 font-quantico"
              >
                TUTORIAL
              </button>
            </div>
          </div>
        )}
        {gamePeriod === "setup" && (
          <div className="w-fit place-self-center md:self-start">
            {tutorialPhase > 2 && tutorialPhase < 5 && (
              <div
                className={
                  "pinhole z-50  rounded-full w-[400px] h-[400px] animate-fade-up animate-once animate-duration-[800ms] animate-ease-linear "
                }
                onClick={() => setTutorialPhase((prev) => prev + 1)}
              >
                {tutorialPhase === 3 && (
                  <div className="absolute text-4xl text-white ml-6 mt-[400px] w-60">
                    Use dot for reference and place on board
                  </div>
                )}
                {tutorialPhase > 2 && tutorialPhase < 5 && (
                  <div className="absolute text-2xl text-slate-800 ml-20 mt-40 w-60">
                    Click here to continue
                  </div>
                )}
                {tutorialPhase === 4 && (
                  <div className="absolute text-4xl text-white ml-6 mt-[400px]  w-60">
                    Tap or click on the enemy board when it's your turn.
                  </div>
                )}
              </div>
            )}

            <div className="font-quantico text-blue-400 font-bold bg-slate-100 bg-opacity-30 text-4xl">
              YOUR SHIPS
            </div>
            <Board
              board={playerBoard}
              handleClick={handleClick}
              handleHover={handleHover}
              gamePeriod={gamePeriod}
              counter={counter}
            />
          </div>
        )}
        {mode === "split" && gamePeriod === "in progress" && (
          <div className="w-fit place-self-center md:self-start md:order-first order-last">
            <div className="font-quantico text-blue-400 font-bold bg-slate-200 bg-opacity-30 text-4xl">
              YOUR SHIPS
            </div>
            <Board
              board={playerBoard}
              handleClick={handleClick}
              handleHover={handleHover}
              gamePeriod={gamePeriod}
              counter={counter}
            />
          </div>
        )}
        {mode === "full" &&
          currentPlayer === "enemy" &&
          gamePeriod === "in progress" && (
            <div className="w-fit place-self-center md:self-start">
              <div className="font-quantico text-blue-400 font-bold bg-slate-100 bg-opacity-30 text-4xl">
                YOUR SHIPS
              </div>
              <Board
                board={playerBoard}
                handleClick={handleClick}
                handleHover={handleHover}
                gamePeriod={gamePeriod}
                counter={counter}
              />
            </div>
          )}

        {gamePeriod === "setup" && (
          <div>
            {tutorialPhase > 0 && tutorialPhase < 3 && (
              <div
                className={
                  "pinhole z-50  rounded-full animate-fade-up animate-once animate-duration-[800ms] animate-ease-linear " +
                  (tutorialPhase === 1 &&
                    " w-[200px] h-[200px] animate-fade-up  ") +
                  (tutorialPhase === 2 && " w-[100px] h-[100px] ")
                }
                onClick={() => setTutorialPhase((prev) => prev + 1)}
              >
                {tutorialPhase === 1 && (
                  <div className="absolute text-4xl text-white -mt-40 md:-ml-72 w-60">
                    Tap or click a ship from the dock.
                  </div>
                )}
                {tutorialPhase === 2 && (
                  <div className="absolute text-4xl text-white -mt-28 md:-ml-72 w-60">
                    Use button to rotate ships
                  </div>
                )}
              </div>
            )}

            <Dock
              handleSelectedShip={handleSelectedShip}
              selectedShip={selectedShip}
              ships={playerFleet}
              handleRotate={handleRotate}
              handleHover={handleHover}
              gamePeriod={gamePeriod}
              handleMode={handleMode}
              mode={mode}
            />
          </div>
        )}
        {gamePeriod === "in progress" &&
          mode === "split" &&
          playerFleet &&
          enemyFleet && (
            <GameDock playerFleet={playerFleet} enemyFleet={enemyFleet} />
          )}

        {mode === "full" &&
          gamePeriod === "in progress" &&
          currentPlayer === "player" && (
            <div className="w-fit place-self-center md:self-start">
              <div className="font-quantico text-[#CD0000]  text-4xl  bg-neutral-100 bg-opacity-50">
                ENEMY SHIPS
              </div>
              <Board
                board={enemyBoard}
                handleClick={handleClick}
                handleHover={handleHover}
                gamePeriod={gamePeriod}
                counter={counter}
              />
            </div>
          )}

        {mode === "split" && gamePeriod === "in progress" && (
          <div className="w-fit place-self-center md:self-start">
            <div className="font-quantico text-[#CD0000]  text-4xl bg-neutral-100 bg-opacity-50">
              ENEMY SHIPS
            </div>
            <Board
              board={enemyBoard}
              handleClick={handleClick}
              handleHover={handleHover}
              gamePeriod={gamePeriod}
              counter={counter}
            />
          </div>
        )}
        {gamePeriod === "in progress" &&
          mode === "full" &&
          playerFleet &&
          enemyFleet && (
            <GameDock playerFleet={playerFleet} enemyFleet={enemyFleet} />
          )}
      </div>
    </>
  );
}

export default Battleship;
