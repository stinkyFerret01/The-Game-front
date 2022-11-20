//-- import des composants
import ChickNDuck from "../games/chick-n-duck/chick-n-duck";

//-- START
const Game = ({ gameConst, token, playerData, setPlayerData }) => {
  //--  RENDER
  return (
    <main>
      <section>
        <h1 style={{ color: "white" }}>GAME</h1>
        <ChickNDuck
          gameConst={gameConst}
          token={token}
          playerData={playerData}
          setPlayerData={setPlayerData}
        />
      </section>
    </main>
  );
};

export default Game;
