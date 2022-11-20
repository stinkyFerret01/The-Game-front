//-- START
const CndSquare = ({ val, chooseSquare }) => {
  //-- RENDER
  return (
    <button onClick={chooseSquare} className="cndSquare">
      {val}
    </button>
  );
};

export default CndSquare;
