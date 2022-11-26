//-- CONFIG
import { useState } from "react";

//-- import des composants
import ChickNDuck from "../games/chick-n-duck/chick-n-duck";
import MoveExperiment from "../games/move-experiment/move-experiment";
import TestIa from "../games/test-ia/test-ia";

//-- START
const Game = ({ gameConst, token, playerData, setPlayerData }) => {
  const [displayCnd, setDisplayCnd] = useState(false);
  const [displayMe, setDisplayMe] = useState(false);
  const [displayTestIa, setDisplayTestIa] = useState(false);

  //--  RENDER
  return (
    <main>
      <section className="gameMain">
        <div className="gameTitle">
          <h1 style={{ color: "white" }}>GAMES :</h1>
        </div>
        {!displayCnd && !displayMe && !displayTestIa && (
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
            <button
              className="displayGameBA"
              onClick={() => setDisplayTestIa(true)}
            >
              test IA
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
        {displayTestIa && (
          <TestIa
            gameConst={gameConst}
            token={token}
            playerData={playerData}
            setPlayerData={setPlayerData}
            setDisplayGame={setDisplayTestIa}
          />
        )}
      </section>
    </main>
  );
};

export default Game;
