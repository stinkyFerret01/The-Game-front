//-- import des composants
import ChickNDuck from "../games/chick-n-duck/chick-n-duck";

//-- START
const Game = ({
  gameConst,
  setToken,
  playerData,
  setPlayerData,
  setDisplayGameChat,
  setDisplayPrivateChat,
}) => {
  //--  RENDER
  return (
    <main>
      <section>
        <h1 style={{ color: "white" }}>GAME</h1>
        <ChickNDuck />
      </section>
    </main>
  );
};

export default Game;
