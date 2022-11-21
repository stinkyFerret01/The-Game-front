//-- START
const CndSquare = ({ val, chooseSquare }) => {
  //-- RENDER
  return (
    <button onClick={chooseSquare} className="cndSquare">
      {val}
      {/* <img className="cndPlayerMarks" src={val} alt="image"></img> */}
    </button>
  );
};

export default CndSquare;
