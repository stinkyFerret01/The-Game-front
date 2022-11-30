import { useEffect, useState } from "react";
// import axios from "axios";

//-- START
const TestIa = ({ setDisplayGame }) => {
  //-- STATE
  //-1- détermine le plateau de jeu
  const [board, setBoard] = useState([
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
  ]);
  //-2- détermine le tour de jeu
  const [gTurn, setGTurn] = useState(0);
  //-3- détermine le tour du joueur
  const [pTurn, setPTurn] = useState("first");
  //-4- enregistre le modele de jeu
  const [model, setModel] = useState(false);
  //-5- enregistre les données nécessaires pour modifier le modele
  const [newData, setNewData] = useState([]);

  //-- TEST
  useEffect(() => {
    const testmodel = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 4, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 8, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 4, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 8, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 7, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    setModel(testmodel);
    console.log(newData);
    // eslint-disable-next-line
  }, []);

  //-- FONCTIONS
  const turner = (choice, player) => {
    if (board[choice] === "0") {
      let newBoard = [...board];
      newBoard.splice(choice, 1, player);
      setBoard(newBoard);
      if (player === "first") {
        setPTurn("second");
      } else {
        setPTurn("first");
      }
      setGTurn(gTurn + 1);
      let render = { choice: choice, pTurn: pTurn };
      setNewData((prev) => [...prev, render]);
    }
  };

  const thinker = () => {
    if (model === false) {
      let choice = board.indexOf("0");
      turner(choice, pTurn);
    } else {
      let max = Math.max(...model[gTurn]);
      let choice = model[gTurn].indexOf(max);
      turner(choice, pTurn);
    }
  };

  useEffect(() => {
    if (pTurn === "second") {
      thinker();
    }
    // eslint-disable-next-line
  }, [pTurn]);

  //-- USEEFFECT
  useEffect(() => {}, [board]);

  //-- RENDER
  return (
    <section>
      <div style={{ color: "white" }} className="testIaTitleContainer">
        <h1>Test Ia</h1>
        <button className="closingBox" onClick={() => setDisplayGame(false)}>
          X
        </button>
      </div>
      <section className="iaBoardContainer">
        {board.map((square, index) => (
          <button
            key={index}
            onClick={() => turner(index, pTurn)}
            className="iaSquare"
          >
            {square}
          </button>
        ))}
      </section>
      <div style={{ color: "white" }}>En cours de dévelopement</div>
    </section>
  );
};

export default TestIa;
