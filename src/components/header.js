//-- START
const Header = ({ setFormType }) => {
  //-- RENDER
  return (
    <header className="header">
      {/* logo/acceuil */}
      <div>THE GAME</div>
      {/* inscription, connection */}
      <button onClick={() => setFormType("signup")}>se connecter</button>
    </header>
  );
};

export default Header;
