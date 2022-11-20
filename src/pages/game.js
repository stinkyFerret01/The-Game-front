//-- import des composants
import { useState } from "react";
import ChickNDuck from "../games/chick-n-duck/chick-n-duck";

//-- START
const Game = ({ gameConst, token, playerData, setPlayerData }) => {
  const [displayCnd, setDisplayCnd] = useState(false);
  //--  RENDER
  return (
    <main>
      <section className="gameMain">
        <div className="gameTitle">
          <h1 style={{ color: "white" }}>GAMES :</h1>
        </div>
        {displayCnd ? (
          <ChickNDuck
            gameConst={gameConst}
            token={token}
            playerData={playerData}
            setPlayerData={setPlayerData}
            setDisplayCnd={setDisplayCnd}
          />
        ) : (
          <button className="displayGameBA" onClick={() => setDisplayCnd(true)}>
            Chick-duck-luck
          </button>
        )}
      </section>
    </main>
  );
};

export default Game;
