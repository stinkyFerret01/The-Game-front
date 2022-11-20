//-- CONFIG
import { useEffect, useState } from "react";

//-- import des composants
import CndSquare from "./cnd-square";

//-- START
const ChickNDuck = () => {
  //-- STATES
  //-1- enregistre les valeurs de la grille
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  //-2- enregistre le tour du joueur
  const [playerTurn, setPlayerTurn] = useState("🐔");
  //-3- tours de jeu
  const [cndTurn, setCndTurn] = useState(0);
  //-4- gagnant
  const [cndWinner, setCndWinner] = useState("none");

  //-- FONCTIONS
  //-1- changePlayer
  const changePlayer = () => {
    if (playerTurn === "🦆") {
      setPlayerTurn("🐔");
    } else {
      setPlayerTurn("🦆");
    }
  };

  //-2- chooseSquare
  const chooseSquare = (square) => {
    if (cndWinner === "none" && playerTurn === "🐔") {
      setBoard(
        board.map((val, index) => {
          if (index === square && val === "") {
            setCndTurn(cndTurn + 1);
            changePlayer();
            return playerTurn;
          }
          return val;
        })
      );
    }
  };

  //-- USEEFFECT
  useEffect(() => {
    //-1- changePlayer
    const changePlayer = () => {
      if (playerTurn === "🦆") {
        setPlayerTurn("🐔");
      } else {
        setPlayerTurn("🦆");
      }
    };
    //-2- winCondition
    const winConditon = () => {
      //-- condition de victoire
      const conditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      let gotWinner = false;
      conditions.forEach((cond) => {
        if (
          board[cond[0]] !== "" &&
          board[cond[0]] === board[cond[1]] &&
          board[cond[0]] === board[cond[2]]
        ) {
          gotWinner = true;
          setCndWinner(board[cond[0]]);
          console.log(board[cond[0]]);
        }
      });
      if (
        board.filter((val) => val === "").length === 0 &&
        gotWinner === false
      ) {
        setCndWinner("tie");
      }
    };
    if (cndWinner === "none") {
      winConditon();
    }
    const autoplay = () => {
      setBoard(
        board.map((val) => {
          const prob = Math.floor(Math.random() * (8 - cndTurn));
          if (val === "" && prob < 1) {
            setCndTurn(cndTurn + 1);
            return playerTurn;
          }
          return val;
        })
      );
      changePlayer();
    };
    if (playerTurn === "🦆" && cndWinner === "none") {
      setTimeout(autoplay, 1000);
    }
  }, [board, cndTurn, cndWinner, playerTurn]);

  //-- RENDER
  return (
    <section className="chickNDuckContainer">
      <h1>ChickNDuck</h1>
      <div className="cndBoard">
        <div className="cndBoardLine">
          <CndSquare
            val={board[0]}
            chooseSquare={() => {
              chooseSquare(0);
            }}
          />
          <CndSquare
            val={board[1]}
            chooseSquare={() => {
              chooseSquare(1);
            }}
          />
          <CndSquare
            val={board[2]}
            chooseSquare={() => {
              chooseSquare(2);
            }}
          />
        </div>
        <div className="cndBoardLine">
          <CndSquare
            val={board[3]}
            chooseSquare={() => {
              chooseSquare(3);
            }}
          />
          <CndSquare
            val={board[4]}
            chooseSquare={() => {
              chooseSquare(4);
            }}
          />
          <CndSquare
            val={board[5]}
            chooseSquare={() => {
              chooseSquare(5);
            }}
          />
        </div>
        <div className="cndBoardLine">
          <CndSquare
            val={board[6]}
            chooseSquare={() => {
              chooseSquare(6);
            }}
          />
          <CndSquare
            val={board[7]}
            chooseSquare={() => {
              chooseSquare(7);
            }}
          />
          <CndSquare
            val={board[8]}
            chooseSquare={() => {
              chooseSquare(8);
            }}
          />
        </div>
      </div>
      <h1>turn : {playerTurn}</h1>
      {cndWinner !== "none" && <h1>winner is {cndWinner}</h1>}
    </section>
  );
};

export default ChickNDuck;
