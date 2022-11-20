//-- CONFIG
import { useState, useEffect } from "react";
import axios from "axios";

//----------------------SOCKETSTUFF-------------------//
import { io } from "socket.io-client";
// const socket = io.connect("http://localhost:3000");
//----------------------SOCKETSTUFF-------------------//

//-- START
//-- GameChat est un composant permettant d'acceder au chat public
//-- il est réservé aux joueurs inscrits
const GameChat = ({ gameConst, token, playerData, setDisplayGameChat }) => {
  //-- STATES
  //-1- enregistre les messages du GameChat
  const [publicChat, setPublicChat] = useState(null);
  //-2- enregistre le message que le joueur veut publier
  const [publicMessageToSend, setPublicMessageToSend] = useState("");

  //----------------------SOCKETSTUFF-------------------//
  const [arrivalMessage, setArrivalMessage] = useState(null);
  //----------------------SOCKETSTUFF-------------------//
  const [socket, setSocket] = useState(io(`${gameConst.backend}`));
  //----------------------SOCKETSTUFF-------------------//
  useEffect(() => {
    if (1 === 2) {
      setSocket("");
    }
    // socket.current = io("https://the-pouler-game.netlify.app/");
    // socket.current = io("http://localhost:3000");
    // socket.current = io("http://localhost:3001");
    socket.on("retour", (msg) => {
      console.log(msg.publisherMessage);
      if (msg.publisherId !== playerData.id) {
        setArrivalMessage(msg);
      }
    });
    socket.emit("addPlayer", {
      from: playerData.id,
    });
    console.log("useeffect ok");
  }, [playerData, socket]);

  useEffect(() => {
    arrivalMessage && setPublicChat((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  //----------------------SOCKETSTUFF-------------------//

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
    //----------------------SOCKETSTUFF-------------------//
    socket.emit("send-msg", {
      publisherId: playerData.id,
      publisherName: playerData.name,
      publisherMessage: publicMessageToSend,
      publisherAccessLevel: playerData.accessLevel,
    });
    //----------------------SOCKETSTUFF-------------------//
    setPublicMessageToSend("");
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
    if (publicChat === null) {
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
        {publicChat !== null && (
          <div className="publicChatDisplayer">
            {publicChat.map((message, index) => {
              console.log(message);
              return (
                <article
                  className="messageDisplay"
                  style={
                    message.publisherName === playerData.name
                      ? {
                          marginLeft: 10 + "%",
                          backgroundColor: "rgb(95, 210, 135)",
                          borderColor: "rgb(48, 109, 70)",
                        }
                      : {}
                  }
                  key={index}
                >
                  <div className="messageDisplayTop">
                    <h3 className="messageDisplayPublisher">
                      {message.publisherName} :
                    </h3>
                    <h4>{message.publicationDate.displayTime}</h4>
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
