//-- CONFIG
import { useEffect } from "react";

//-- START
const LordSpace = ({
  backend,
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
      {playersSensData.length > 0 && (
        <div>
          {playersSensData.map((player, index) => {
            return (
              <article className="playerSensData" key={index}>
                <h2>{player.name}</h2>
                <h2>{player.mail}</h2>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default LordSpace;
