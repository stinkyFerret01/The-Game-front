//-- CONFIG
import { useState, useEffect } from "react";
import axios from "axios";

//-- START
const LeaderBoard = ({ setDisplayLeaderBoard }) => {
  const [boardList, setBoardList] = useState([]);

  //-- FONCTIONS
  const leaderBoardDataFetcher = async () => {
    //-- leaderBoardDataFetcher envoie une requete pour récupérer le classement des joueurs
    const response = await axios.get(`http://localhost:3000/game/lead`);
    setBoardList(response.data.leaderBoard);
  };

  //-- USEEFFECT
  useEffect(() => {
    if (boardList.length === 0) {
      leaderBoardDataFetcher();
    }
  }, [boardList]);

  //-- RENDER
  return (
    <main className="overallContainer">
      <section className="leaderboard">
        <div className="dataformTop">
          {/* message discret */}
          <div className="leaderBoardTopLeft">
            <h6>* nous ne conservons aucun sel dans nos bases de données</h6>
          </div>
          {/* femer le leaderboard */}
          <button onClick={() => setDisplayLeaderBoard(false)}>X</button>
        </div>
        <h1 className="leaderBoardTitle">LEADERBOARD</h1>
        {console.log(boardList)}

        <div className="board">
          {boardList.length > 0 &&
            boardList.map((player, index) => {
              return (
                <article key={index} className="playerDisplayer">
                  <div>{player.name}</div>
                  <div>{player.score}</div>
                </article>
              );
            })}
        </div>
      </section>
    </main>
  );
};

export default LeaderBoard;
