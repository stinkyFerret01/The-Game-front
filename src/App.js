//-- Style
import "./App.css";

//-- CONFIG
import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

//-- import des pages
import Home from "./pages/home";

//-- import des composants
import Header from "./components/header";
import Dataform from "./components/dataform";

//--START
function App() {
  const [isLoading, setIsLoading] = useState(true);
  //-- détermine l'authentification d'un Player
  const [token, setToken] = useState(Cookies.get("TG-token") || null);
  //-- détérmine la présence d'un formulaire et son type
  const [formType, setFormType] = useState("none");

  //--useEffect
  useEffect(() => {}, [formType]);

  //--RENDER
  return (
    <section className="App">
      <Router>
        <Header token={token} setTken={setToken} setFormType={setFormType} />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        {/* décide de la présence d'un formulaire */}
        {formType !== "none" && (
          <Dataform formType={formType} setFormType={setFormType} />
        )}
      </Router>
    </section>
  );
}

export default App;
