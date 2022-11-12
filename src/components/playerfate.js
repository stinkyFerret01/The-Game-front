//-- CONFIG
import { useState, useEffect } from "react";
import axios from "axios";

//-- START
//-- PlayerFate est un article retournant les noms et mails des joueurs
//-- on peut y décider la suppression ou la promotion d'un joueur
const PlayerFate = ({ backend, playerData, setPlayersSensData, player }) => {
  //-- STATES
  //-1- détermine si le joueur a été selectioné pour etre effacer des BDD
  const [playerDelSelection, setPlayerDelSelection] = useState(false);
  //-2- détermine à quel statut le joueur va etre promu
  const [playerPromSelection, setPlayerPromSelection] = useState(
    player.accessLevel
  );
  //-3- détermine la médaille du rang
  const [playerALMedal, setPlayerALMedal] = useState(
    player.accessLevel.toString()
  );

  //-- FONCTIONS

  const playerDeleter = async (bannedId) => {
    //-- efface un joueur des BDD
    if (playerData.accessLevel > 0) {
      const response = await axios.post(`${backend}/admin/ban`, {
        id: `${playerData.id}`,
        bannedId: `${bannedId}`,
      });
      const newList = response.data.newList;
      setPlayersSensData(newList);
      setPlayerDelSelection(false);
      console.log(response.data.message);
    }
  };

  const playerPromoter = async (promotedId, newAL) => {
    //-- promeut un joueur au rang d'administrateur
    if (playerData.accessLevel > 0) {
      const response = await axios.put(`${backend}/lord/promote`, {
        id: `${playerData.id}`,
        promotedId: `${promotedId}`,
        newAL: newAL,
      });
      const newList = response.data.newList;
      setPlayersSensData(newList);
      setPlayerALMedal(newAL.toString());
      console.log(response.data.message);
    }
  };

  //-- USEEFFECT
  useEffect(() => {}, [playerDelSelection, playerPromSelection]);

  //-- RENDER
  return (
    <article className="playerFate">
      <div className="playerFateMedal">
        {playerALMedal === "0" && <div>🎮</div>}
        {playerALMedal === "5" && <div>🛡</div>}
        {playerALMedal === "10" && <div>👑</div>}
      </div>
      <h2 className="playerFateName">{player.name}</h2>
      <h2 className="playerFateMail">{player.mail}</h2>
      {/* //-- promotion de joueurs */}
      <div className="playerFatePromote">
        {/* //-- select de promotion */}
        {playerData.accessLevel > 5 && (
          <div>
            <select
              value={playerPromSelection}
              onChange={(event) => {
                setPlayerPromSelection(event.target.value);
              }}
            >
              <option value="0">Player</option>
              <option value="5">Admin</option>
              <option value="10">Lord</option>
            </select>
            {/* //-- confirmation de promotion (dépend du select) */}
            <button
              className={
                playerPromSelection !== null
                  ? "playerPromSelected"
                  : "playerPromUnSelected"
              }
              onClick={() => {
                playerPromSelection !== null
                  ? playerPromoter(player.id, playerPromSelection)
                  : alert(`ce joueur est déja ${playerPromSelection}`);
              }}
            >
              {/* <i class="fa-solid fa-trash-can"></i> */}
              <h3>OK</h3>
            </button>
          </div>
        )}
      </div>
      {/* //-- supression de joueurs */}
      <div className="playerFateDelete">
        {/* //-- checkbox de suppression */}
        <input
          className="checkbox"
          checked={playerDelSelection}
          type="checkbox"
          onChange={() =>
            playerDelSelection
              ? setPlayerDelSelection(false)
              : setPlayerDelSelection(true)
          }
        />
        {/* //-- confirmation de supression (dépend de la checkbox) */}
        <button
          className={
            playerDelSelection ? "playerDelSelected" : "playerDelUnSelected"
          }
          onClick={() => {
            playerDelSelection === true
              ? playerDeleter(player.id)
              : alert(
                  "vous devez selectionez un joueur pour l'effacer des bases de données!"
                );
          }}
        >
          {/* <i class="fa-solid fa-trash-can"></i> */}
          <h3>effacer</h3>
        </button>
      </div>
    </article>
  );
};

export default PlayerFate;
