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
  const [cops, setCops] = useState([
    [28, 3],
    [28, 11],
    [30, 3],
    [30, 11],
    [32, 3],
    [32, 11],
  ]);

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
      if (
        cops.findIndex(
          (cop) => cop[0] === playerPositionX && cop[1] === playerPositionY
        ) >= 0
      ) {
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
    if (col.slice(0, 1) === "C") {
      return {
        borderRadius: "50%",
        color: "blue",
        backgroundColor: "aqua",
      };
    }
  };

  const playerMover = (dir) => {
    if (start === true) {
      let newPosX = playerPositionX;
      let newPosY = playerPositionY;
      if (dir === "ArrowLeft") {
        newPosX = newPosX - 1;
      }
      if (dir === "ArrowRight") {
        newPosX = newPosX + 1;
      }
      if (dir === "ArrowUp") {
        newPosY = newPosY - 1;
      }
      if (dir === "ArrowDown") {
        newPosY = newPosY + 1;
      }
      let compare = grid[newPosY][newPosX];
      if (compare === " " || compare === "C") {
        setPlayerPositionX(newPosX);
        setPlayerPositionY(newPosY);
      }
    }
  };

  const handleKeyDown = (event) => {
    playerMover(event.key);
  };

  //-- USEEFFECT
  useEffect(() => {
    console.log("useEffect 0");
    let interval;
    if (start === false) {
      clearTimeout(interval);
    }
    const copsMover = () => {
      let newCops = [];
      for (let c = 0; c < cops.length; c++) {
        let oldCop = [cops[c][0], cops[c][1]];
        let newCop = [];
        if (oldCop[0] > playerPositionX) {
          newCop.push(oldCop[0] - 1);
        } else if (oldCop[0] < playerPositionX) {
          newCop.push(oldCop[0] + 1);
        } else {
          newCop.push(oldCop[0]);
        }
        if (oldCop[1] > playerPositionY) {
          newCop.push(oldCop[1] - 1);
        } else if (oldCop[1] < playerPositionY) {
          newCop.push(oldCop[1] + 1);
        } else {
          newCop.push(oldCop[1]);
        }
        if (
          newCops.find((cop) => cop[0] === newCop[0] && cop[1] === newCop[1]) ||
          cops.find((cop) => cop[0] === newCop[0] && cop[1] === newCop[1])
        ) {
          newCops.push(oldCop);
        } else {
          newCops.push(newCop);
        }
      }
      // if (cops[0] > playerPositionX) {
      //   newCops.push(cops[0] - 1);
      // } else if (cops[0] < playerPositionX) {
      //   newCops.push(cops[0] + 1);
      // } else {
      //   newCops.push(cops[0]);
      // }
      // if (cops[1] > playerPositionY) {
      //   newCops.push(cops[1] - 1);
      // } else if (cops[1] < playerPositionY) {
      //   newCops.push(cops[1] + 1);
      // } else {
      //   newCops.push(cops[1]);
      // }
      const checkStart = () => {
        if (start === true) {
          setCops(newCops);
          clearTimeout(interval);
        } else {
          clearTimeout(interval);
        }
      };
      interval = setTimeout(checkStart, 300);
    };
    if (start === true) {
      copsMover();
      // interval = setTimeout(copsMover, 1000);
    }
    // eslint-disable-next-line
  }, [start, cops]);

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
          } else if (
            cops.findIndex((cop) => cop[0] === gx && cop[1] === gy) >= 0
          ) {
            let index = cops.findIndex((cop) => cop[0] === gx && cop[1] === gy);
            newLign.push(`C${index}`);
          } else {
            newLign.push(char);
          }
        }
        newGrid.push(newLign);
      }
      setGrid(newGrid);
    };
    console.log();
    gridMaker();
    if (
      cops.find(
        (cop) => cop[0] === playerPositionX && cop[1] === playerPositionY
      )
    ) {
      setStart(false);
    }
  }, [start, playerPositionX, playerPositionY, cops, key]);

  useEffect(() => {
    console.log("useEffect 2");
    //-- Add event listener on keydown
    window.removeEventListener("keydown", handleKeyDown);
    window.addEventListener("keydown", handleKeyDown);
    // cleanup this component
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line
  }, [grid, playerPositionX, playerPositionY, start]);

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
              playerMover("ArrowUp");
            }}
          >
            ⬆
          </button>
        </div>
        <div className="moveControl2">
          <button
            className="moveButton"
            onClick={() => {
              playerMover("ArrowLeft");
            }}
          >
            ⬅
          </button>
          <button
            className="moveButton"
            onClick={() => {
              playerMover("ArrowRight");
            }}
          >
            ➡
          </button>
        </div>
        <div className="moveControl1">
          <button
            className="moveButton"
            onClick={() => {
              playerMover("ArrowDown");
            }}
          >
            ⬇
          </button>
        </div>
      </article>
      <div className="meTitleContainer">
        <button
          className="restarter"
          style={start === false ? { backgroundColor: "red" } : {}}
          onClick={() => restarter()}
        >
          restart
        </button>
      </div>
    </section>
  );
};

export default MoveExperiment;
