function ScoreBoard({
  round,
  enemyScore,
  playerScore,
  mode,
  handleMode,
  resetGame,
}) {
  return (
    <>
      {/* {round > 0 && ( */}
      <div className="flex bg-blue-50  h-20 font-quantico justify-between">
        <div className="hidden md:flex">
          <div className="border w-20">
            <div className="leading-4 text-center">PLAYER SHIPS</div>
            <div className="text-blue-400 text-3xl text-center font-bold">
              {playerScore}
            </div>
          </div>
          <div className="border w-20">
            <div className="leading-4 text-center">ENEMY SHIPS</div>
            <div className="text-[#CD0000] text-3xl text-center font-bold">
              {enemyScore}
            </div>
          </div>
        </div>
        <div>
          <div className="text-[25px] text-[#CD0000] -mb-11 ml-14">MID</div>
          <span className="text-[60px] text-blue-400 font-bold -mr-2 ">W</span>
          <span className="text-[40px] text-slate-600 ">AY</span>
        </div>
        <div>
          <button
            onClick={() => handleMode()}
            className="m-1 bg-blue-400  rounded-lg text-white font-bold p-1 w-20 text-lg "
          >
            {mode === "split" ? "FULL-" : "SPLIT-"} SCREEN
          </button>
          <button
            onClick={() => resetGame()}
            className="m-1 bg-blue-400  rounded-lg text-white font-bold p-1 w-20 text-lg "
          >
            RESET GAME
          </button>
        </div>
      </div>
      {/* )} */}
    </>
  );
}

export default ScoreBoard;
