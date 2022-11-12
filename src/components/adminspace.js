//-- CONFIG
import { useEffect } from "react";

//-- import des composants
import PlayerFate from "./playerfate";

//-- START
//-- AdminSpace est un composant résevé à tous les administrateurs
const AdminSpace = ({
  gameConst,
  playerData,
  playersSensData,
  setPlayersSensData,
}) => {
  //-- USEEFFECT
  useEffect(() => {}, [playersSensData]);

  //-- RENDER
  return (
    <section>
      {/* espace administration (acces à la supression des profils et des messages) */}
      {playersSensData && playersSensData.length > 0 && (
        <div>
          {playersSensData.map((player, index) => {
            return (
              <PlayerFate
                gameConst={gameConst}
                playerData={playerData}
                playersSensData={playersSensData}
                setPlayersSensData={setPlayersSensData}
                player={player}
                key={index}
                index={index}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default AdminSpace;
