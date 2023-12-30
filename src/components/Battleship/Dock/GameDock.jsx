function GameDock({ playerFleet, enemyFleet }) {
  console.log({ playerFleet });
  return (
    <div className="text-xs font-quantico bg-slate-300 bg-opacity-50  h-fit w-fit place-self-center md:self-start flex md:flex-col gap-10">
      <div className="flex flex-col mb-4 border border-white p-6 ">
        <div className="underline text-blue-400 font-bold text-sm bg-slate-200 w-fit px-2">
          PLAYER SHIPS
        </div>
        {Object.values(playerFleet).map((el, index) => {
          return (
            <div key={"pels" + el.name + "header" + index}>
              <div className="text-slate-800">{el.name.toUpperCase()}</div>
              <div className="flex">
                {Array.from(Array(el.length)).map((item, index) => {
                  if (el.isSunk) {
                    return (
                      <div
                        key={"p" + el.name + index}
                        className="h-2 w-2 bg-red-400 border"
                      ></div>
                    );
                  } else {
                    return (
                      <div
                        key={"ps" + el.name + index}
                        className="h-2 w-2 bg-slate-400 border"
                      ></div>
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col mb-4 border border-white p-6 ">
        <div className="underline text-[#CD0000] font-bold text-sm bg-slate-200 w-fit px-2">
          ENEMY SHIPS
        </div>
        {Object.values(enemyFleet).map((el) => {
          return (
            <div key={"e" + el.name + "header"}>
              <div>{el.name.toUpperCase()}</div>
              <div className="flex">
                {Array.from(Array(el.length)).map((item, index) => {
                  if (el.isSunk) {
                    return (
                      <div
                        key={"e" + el.name + index}
                        className="h-2 w-2 bg-red-400 border"
                      ></div>
                    );
                  } else {
                    return (
                      <div
                        key={"es" + el.name + index}
                        className="h-2 w-2 bg-slate-400 border"
                      ></div>
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GameDock;
