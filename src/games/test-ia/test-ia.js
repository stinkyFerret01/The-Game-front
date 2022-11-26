//-- START
const TestIa = ({ setDisplayGame }) => {
  //-- RENDER
  return (
    <section>
      <div className="testIaTitleContainer">
        <h1>Test Ia</h1>
        <button className="closingBox" onClick={() => setDisplayGame(false)}>
          X
        </button>
      </div>
      <div style={{ color: "white" }}>En cours de dévelopement</div>
    </section>
  );
};

export default TestIa;
