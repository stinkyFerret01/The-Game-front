// import des composants

//-- START
const Admin = ({ backend, playerData }) => {
  //-- RENDER
  return (
    <main>
      {playerData !== null && (
        <div>
          {playerData.accessLevel === 2 && <h1>LORD</h1>}
          {playerData.accessLevel === 1 && <h1>ADMIN</h1>}
        </div>
      )}
    </main>
  );
};

export default Admin;
