//-- CONFIG
import { useState, useEffect } from "react";

//-- START
const MoveExperiment = ({ setDisplayGame }) => {
  //-- STATES
  //-1- détermine l'état de la grid
  const [grid, setGrid] = useState("");
  //-2- détermine la position du joueur sur la grid
  const [playerPositionX, setPlayerPositionX] = useState(2);
  const [playerPositionY, setPlayerPositionY] = useState(7);

  //-test-
  const [key, setKey] = useState(false);
  const [start, setStart] = useState(false);
  const [cops, setCops] = useState([28, 3]);

  //-- FONCTION
  const restarter = () => {
    if (start === true) {
      setStart(false);
      setPlayerPositionX(2);
      setPlayerPositionY(7);
      setCops([28, 3]);
    } else {
      setStart(true);
    }
  };

  const nivCharger = (niv) => {
    let nivToCharge = [];
    for (let i = 0; i < niv.length; i++) {
      let lignToCharge = [];
      for (let j = 0; j < niv[0].length; j++) {
        lignToCharge.push(niv[i][j]);
      }
      nivToCharge.push(lignToCharge);
    }
    return nivToCharge;
  };

  const spePos = [{ y: 27, x: 12 }];
  const spePosChecker = (x, y) => {
    let s = false;
    for (let i = 0; i < spePos.length; i++) {
      if (spePos[i].y === y && spePos[i].x === x) {
        s = true;
      }
    }
    return s;
  };

  const styleMaker = (col) => {
    if (col === "🐔") {
      if (cops[1] === playerPositionY && cops[0] === playerPositionX) {
        return {
          zIndex: "1",
          color: "red",
          animation: "pulseMoveP infinite 1.3s",
          borderRadius: "50%",
          backgroundColor: "red",
        };
      } else if (spePosChecker(playerPositionY, playerPositionX) === true) {
        return {
          zIndex: "1",
          color: "orange",
          animation: "pulseMoveP infinite 1.3s",
          borderRadius: "50%",
          backgroundColor: "orange",
        };
      } else {
        return {
          borderRadius: "50%",
          color: "orange",
          backgroundColor: "orange",
        };
      }
    }
    if (col === ".") {
      return { bottom: "0.125rem" };
    }
    if (col === "W") {
      return { backgroundColor: "gray" };
    }
    if (col === "🗝") {
      return { overflow: "inherit" };
    }
    if (col === "C") {
      return {
        borderRadius: "50%",
        color: "aqua",
        backgroundColor: "aqua",
      };
    }
  };

  const playerMover = (dir) => {
    if (start === true) {
      let newPos = { x: playerPositionX, y: playerPositionY };
      if (dir === "L") {
        newPos.x--;
      }
      if (dir === "R") {
        newPos.x++;
      }
      if (dir === "U") {
        newPos.y--;
      }
      if (dir === "D") {
        newPos.y++;
      }
      let compare = grid[newPos.y][newPos.x];
      if (compare === " " || compare === "e") {
        setPlayerPositionX(newPos.x);
        setPlayerPositionY(newPos.y);
      }
    }
  };

  /////---PROBLEMO---/////
  // const copsMover = () => {
  //   let newCops = [];
  //   if (cops[0] > playerPositionX) {
  //     newCops.push(cops[0] - 1);
  //   } else if (cops[0] < playerPositionX) {
  //     newCops.push(cops[0] + 1);
  //   } else {
  //     newCops.push(cops[0]);
  //   }
  //   if (cops[1] > playerPositionY) {
  //     newCops.push(cops[1] - 1);
  //   } else if (cops[1] < playerPositionY) {
  //     newCops.push(cops[1] + 1);
  //   } else {
  //     newCops.push(cops[1]);
  //   }
  //   setCops(newCops);
  // };
  // if (start === true) {
  //   setTimeout(copsMover, 1000);
  // }

  const handleKeyDown = (event) => {
    const playerMover = (key) => {
      console.log(key);
      if (start === true) {
        let newPos = { x: playerPositionX, y: playerPositionY };
        if (key === "ArrowLeft") {
          newPos.x = newPos.x - 1;
        }
        if (key === "ArrowRight") {
          newPos.x = newPos.x + 1;
        }
        if (key === "ArrowUp") {
          newPos.y = newPos.y - 1;
        }
        if (key === "ArrowDown") {
          console.log("ok");
          newPos.y = newPos.y + 1;
        }
        let compare = grid[newPos.y][newPos.x];
        if (compare === " " || compare === "e") {
          setPlayerPositionX(newPos.x);
          setPlayerPositionY(newPos.y);
        }
      }
    };
    playerMover(event.key);
    // console.log("A key was pressed", event.key);
  };
  //-- USEEFFECT
  useEffect(() => {
    console.log("useEffect 1");
    // const niv1 = [
    //   "                                   ",
    //   "                                   ",
    //   "    Bienvenue joueur               ",
    //   "                                   ",
    //   "  trouve la sorti de cette page    ",
    //   "                                   ",
    //   "  si tu y arrives                  ",
    //   "                                   ",
    //   "                                   ",
    //   "                                   ",
    //   "                                   ",
    //   "                                   ",
    //   "  crois en toi, tu es la clef      ",
    //   "                                   ",
    //   "                                   ",
    //   "                                   ",
    //   "  sortie   |  |                    ",
    //   "           |  |                    ",
    //   "           |  |                    ",
    // ];

    const niv2 = [
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      "W                                 W",
      "W                                 W",
      "W                                 W",
      "W                                 W",
      "W                                 W",
      "W                                 W",
      "W                                 W",
      "W                                 W",
      "W                                 W",
      "W                                 W",
      "W                                 W",
      "W                                 W",
      "W                                 W",
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    ];

    const base = nivCharger(niv2);
    const gridMaker = () => {
      const newGrid = [];
      for (let gy = 0; gy < base.length; gy++) {
        const newLign = [];
        for (let gx = 0; gx < base[0].length; gx++) {
          const char = base[gy][gx];
          if (gy === playerPositionY && gx === playerPositionX) {
            newLign.push("🐔");
          } else if (gy === 7 && gx === 32 && key === true) {
            newLign.push("🗝");
          } else if (gx === cops[0] && gy === cops[1]) {
            newLign.push("C");
          } else {
            newLign.push(char);
          }
        }
        newGrid.push(newLign);
      }
      setGrid(newGrid);
    };
    gridMaker();
    if (cops[0] === playerPositionX && cops[1] === playerPositionY) {
      setStart(false);
    }
    // if (start === false && cops[0] !== 28 && cops[1] !== 3) {
    //   setCops([28, 3]);
    // }
  }, [playerPositionX, playerPositionY, cops, key]);

  useEffect(() => {
    console.log("useEffect 2");
    //-- Add event listener on keydown
    window.removeEventListener("keydown", handleKeyDown);
    window.addEventListener("keydown", handleKeyDown);
    // cleanup this component
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      console.log("CLOSE");
    };
    // eslint-disable-next-line
  }, [grid, playerPositionX, playerPositionY]);

  //-- RENDER
  return (
    <section id="meGame" className="moveExperimentContainer">
      <div className="meTitleContainer">
        <h1>Move Experiment</h1>
        <button className="closingBox" onClick={() => setDisplayGame(false)}>
          X
        </button>
      </div>
      <div className="moveBox">
        {grid.length > 0 &&
          grid.map((lign, index) => {
            return (
              <div className="meLigns" key={index}>
                {lign.map((column, indexc) => {
                  return spePosChecker(index, indexc) === false ||
                    column !== "🐔" ? (
                    <div
                      className="meColumns"
                      style={styleMaker(column)}
                      key={indexc}
                    >
                      {column === "🐔" ? "e" : column}
                    </div>
                  ) : (
                    column === "🐔" && (
                      <button
                        className="meColumns"
                        onClick={() => {
                          setKey(true);
                        }}
                        style={styleMaker(column)}
                        key={indexc}
                      >
                        {column === "🐔" ? "e" : column}
                      </button>
                    )
                  );
                })}
              </div>
            );
          })}
      </div>
      <article className="moveControl">
        <div className="moveControl1">
          <button
            className="moveButton"
            onClick={() => {
              playerMover("U");
            }}
          >
            ⬆
          </button>
        </div>
        <div className="moveControl2">
          <button
            className="moveButton"
            onClick={() => {
              playerMover("L");
            }}
          >
            ⬅
          </button>
          <button
            className="moveButton"
            onClick={() => {
              playerMover("R");
            }}
          >
            ➡
          </button>
        </div>
        <div className="moveControl1">
          <button
            className="moveButton"
            onClick={() => {
              playerMover("D");
            }}
          >
            ⬇
          </button>
        </div>
      </article>
      <div className="meTitleContainer">
        <button className="restarter" onClick={() => restarter()}>
          restart
        </button>
      </div>
    </section>
  );
};

export default MoveExperiment;
