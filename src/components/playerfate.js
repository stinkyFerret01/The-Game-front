//-- CONFIG
import { useState, useEffect } from "react";
import axios from "axios";

//-- START
//-- PlayerFate est un article retournant les noms et mails des joueurs
//-- on peut y décider la suppression ou la promotion d'un joueur
const PlayerFate = ({
  gameConst,
  token,
  playerData,
  setPlayersSensData,
  player,
}) => {
  //-- STATES
  //-1- détermine si le joueur a été selectioné pour etre effacer des BDD
  const [playerDelSelection, setPlayerDelSelection] = useState(false);
  //-2- détermine à quel statut le joueur va etre promu
  const [playerPromSelection, setPlayerPromSelection] = useState(
    player.accessLevel
  );

  //-- FONCTIONS

  const playerDeleter = async (bannedId) => {
    //-- efface un joueur des BDD
    if (playerData.accessLevel >= gameConst.aLR.admin) {
      const response = await axios.post(`${gameConst.backend}/admin/ban`, {
        playerId: `${playerData.id}`,
        playerToken: `${token}`,
        bannedId: `${bannedId}`,
      });
      console.log(response.data.message);
      const newList = response.data.newList;
      setPlayerDelSelection(false);
      setPlayersSensData(newList);
    }
  };

  const playerPromoter = async (promotedId, newAL) => {
    //-- promeut un joueur au rang d'administrateur
    if (playerData.accessLevel >= gameConst.aLR.admin) {
      const response = await axios.put(`${gameConst.backend}/lord/promote`, {
        playerId: `${playerData.id}`,
        playerToken: `${token}`,
        promotedId: `${promotedId}`,
        newAL: newAL,
      });
      console.log(response.data.message);
      const newList = response.data.newList;
      setPlayersSensData(newList);
    }
  };

  //-- USEEFFECT
  useEffect(() => {}, [
    playerDelSelection,
    playerPromSelection,
    setPlayersSensData,
  ]);

  //-- RENDER
  return (
    <article className="playerFate">
      <div className="playerFateMedal">
        {player.accessLevel === gameConst.aLR.banned && <div>💀</div>}
        {player.accessLevel === gameConst.aLR.restricted && <div>🚫</div>}
        {player.accessLevel === gameConst.aLR.player && <div>🎮</div>}
        {player.accessLevel === gameConst.aLR.admin && <div>🛡</div>}
        {player.accessLevel === gameConst.aLR.lord && <div>👑</div>}
      </div>
      <h2 className="playerFateName">{player.name}</h2>
      <h2 className="playerFateMail">{player.mail}</h2>
      {/* //-- promotion de joueurs */}
      <div className="playerFatePromote">
        {/* //-- select de promotion */}
        {playerData.accessLevel >= gameConst.aLR.admin && (
          <div>
            {player.accessLevel < playerData.accessLevel && (
              <select
                value={playerPromSelection}
                onChange={(event) => {
                  setPlayerPromSelection(event.target.value);
                }}
              >
                <option value={gameConst.aLR.banned.toString()}>banned</option>
                <option value={gameConst.aLR.restricted.toString()}>
                  restricted
                </option>
                <option value={gameConst.aLR.player.toString()}>Player</option>
                {playerData.accessLevel === gameConst.aLR.lord && (
                  <option value={gameConst.aLR.admin.toString()}>Admin</option>
                )}
                {playerData.accessLevel > gameConst.aLR.lord && (
                  <option value={gameConst.aLR.lord.toString()}>Lord</option>
                )}
              </select>
            )}
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
