//-- CONFIG
import { useState, useEffect } from "react";
import axios from "axios";

//-- START
//-- GameChat est un composant permettant d'acceder au chat public
//-- il est réservé aux joueurs inscrits
const GameChat = ({ gameConst, token, playerData, setDisplayGameChat }) => {
  //-- STATES
  //-1- enregistre les messages du GameChat
  const [publicChat, setPublicChat] = useState([]);
  //-2- enregistre le message que le joueur veut publier
  const [publicMessageToSend, setPublicMessageToSend] = useState("");

  //-- FONCTIONS
  const publicMessageSender = async () => {
    //-- publicMessageSender enregistre un nouveau message en BDD
    const response = await axios.post(
      `${gameConst.backend}/publicchat/publish`,
      {
        playerId: `${playerData.id}`,
        playerToken: `${token}`,
        publisherName: `${playerData.name}`,
        publisherMessage: `${publicMessageToSend}`,
      }
    );
    console.log(response.data.message);
    setPublicChat(response.data.publicChat);
    setPublicMessageToSend("");
  };

  const medaler = (AL) => {
    //-- détermine la médaille du publicateur
    if (AL === 0) {
      return "💀";
    }
    if (AL === 1) {
      return "🚫";
    }
    if (AL === 2) {
      return "🎮";
    }
    if (AL === 5) {
      return "🛡";
    }
    if (AL === 10) {
      return "👑";
    }
  };

  //-- USEEFFECT
  useEffect(() => {
    const publicChatFetcher = async () => {
      //-- publicChatFetcher envoie une requête pour récupérer les données du chat public
      const response = await axios.post(`${gameConst.backend}/publicchat/get`, {
        playerId: `${playerData.id}`,
        playerToken: `${token}`,
      });
      console.log(response.data.message);
      setPublicChat(response.data.publicChat);
    };
    if (publicChat.length === 0) {
      publicChatFetcher();
    }
  }, [gameConst, token, playerData, publicChat]);

  //-- RENDER
  return (
    <main className="overallContainer">
      <section className="gameChat">
        {/* Game Chat Header */}
        <div className="dataformTop">
          {/* message discret */}
          <div className="gameChatTopLeft">
            <h6>* soyez poli, pas polisson!</h6>
          </div>
          {/* femer le Game Chat */}
          <button
            className="closingBox"
            onClick={() => setDisplayGameChat(false)}
          >
            X
          </button>
        </div>
        {/* Chat */}
        {publicChat.length > 0 && (
          <div className="publicChatDisplayer">
            {publicChat.map((message, index) => {
              return (
                <article
                  className="messageDisplay"
                  style={
                    message.publisherName === playerData.name
                      ? {
                          marginLeft: 2 + "rem",
                        }
                      : {}
                  }
                  key={index}
                >
                  <div
                    className="messageDisplayTop"
                    style={
                      message.publisherName === playerData.name
                        ? { backgroundColor: "aqua" }
                        : { backgroundColor: "aquamarine" }
                    }
                  >
                    <h3 className="messageDisplayPublisher">
                      from {medaler(message.publisherAccessLevel)}/
                      {message.publisherName} :
                    </h3>
                    <h4>prochainement, la date et l'heure</h4>
                  </div>
                  <h3 className="messageDisplayMessage">
                    {message.publisherMessage}
                  </h3>
                </article>
              );
            })}
          </div>
        )}
        {/* Chat Sender */}
        {/* Chat message */}
        <div className="messageToSendForm">
          <textarea
            className="messageInputs"
            type="text"
            maxLength="256"
            placeholder="Your Message"
            value={publicMessageToSend}
            onChange={(event) => {
              setPublicMessageToSend(event.target.value);
            }}
          />
          {/* chat submit */}
          <div className="messageSubmitContainer">
            <input
              className="messageSubmit"
              type="submit"
              value="Envoyer !"
              onClick={() => publicMessageSender()}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default GameChat;
