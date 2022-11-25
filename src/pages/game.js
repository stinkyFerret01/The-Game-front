//-- CONFIG
import { useState } from "react";

//-- import des composants
import ChickNDuck from "../games/chick-n-duck/chick-n-duck";
import MoveExperiment from "../games/move-experiment/move-experiment";

//-- START
const Game = ({ gameConst, token, playerData, setPlayerData }) => {
  const [displayCnd, setDisplayCnd] = useState(false);
  const [displayMe, setDisplayMe] = useState(false);

  //--  RENDER
  return (
    <main>
      <section className="gameMain">
        <div className="gameTitle">
          <h1 style={{ color: "white" }}>GAMES :</h1>
        </div>
        {!displayCnd && !displayMe && (
          <div>
            <button
              className="displayGameBA"
              onClick={() => setDisplayCnd(true)}
            >
              Chick-duck-luck
            </button>
            <button
              className="displayGameBA"
              onClick={() => setDisplayMe(true)}
            >
              move Experiment
            </button>
          </div>
        )}
        {displayCnd && (
          <ChickNDuck
            gameConst={gameConst}
            token={token}
            playerData={playerData}
            setPlayerData={setPlayerData}
            setDisplayGame={setDisplayCnd}
          />
        )}
        {displayMe && (
          <MoveExperiment
            gameConst={gameConst}
            token={token}
            playerData={playerData}
            setPlayerData={setPlayerData}
            setDisplayGame={setDisplayMe}
          />
        )}
      </section>
    </main>
  );
};

export default Game;
