//-- CONFIG
import { useState, useEffect } from "react";
import axios from "axios";

//-- START
//-- PrivateChat est un composant permettant d'acceder aux conversations privés
//-- il est réservé aux joueurs inscrits
const PrivateChat = ({
  gameConst,
  token,
  playerData,
  setDisplayPrivateChat,
}) => {
  //-- STATES
  //-0- détermine la section a afficher
  const [displaySection, setDisplaySection] = useState("players");
  //-1- enregistre la conversation selectionée
  const [privateChat, setPrivateChat] = useState([]);
  //-2- enregistre les conversations du joueurs
  const [privateChats, setPrivateChats] = useState([]);
  //-3- enregistre le message que le joueur veut publier
  const [privateMessageToSend, setPrivateMessageToSend] = useState("");
  //-4- enregistre la liste des joueurs joignables en chat
  const [chatterList, setChatterList] = useState([]);
  //-5- détermine le receveur du message sous forme d'id
  const [receiverId, setReceiverId] = useState("");
  //-6- enregistre le nom du receveur (pour l'affichage)
  const [receiverName, setReceiverName] = useState("");
  //-7- determine le chat sous forme d'id
  const [chatId, setChatId] = useState("");
  //-10- ENTOURLOUPE bloque le lancement de privateChatFetcher
  const [pVFLock, setPVFLock] = useState(false);

  //-- FONCTIONS
  const privateMessageSender = async () => {
    //-- privateMessageSender enregistre un nouveau message privé en BDD
    const response = await axios.post(`${gameConst.backend}/privatechat/send`, {
      playerId: `${playerData.id}`,
      playerToken: `${token}`,
      receiverId: `${receiverId}`,
      senderName: `${playerData.name}`,
      senderMessage: `${privateMessageToSend}`,
      chatId: `${chatId}`,
    });
    console.log(response.data.message);
    setPVFLock(false);
    setPrivateChat(response.data.newPrivateChat);
    setPrivateMessageToSend("");
  };

  const receiverChecker = (id) => {
    //-- receiverChecker vérifie que le joueur selectioné ne partage pas déja une conversation commune
    let ch = "";
    let pc = [];
    privateChats.forEach((chat) => {
      if (id === chat.reId || id === chat.seId) {
        ch = chat._id;
        pc = chat.chat;
      }
    });
    setChatId(ch);
    setPrivateChat(pc);
  };

  //-- USEEFFECT
  useEffect(() => {
    const chatterListFetcher = async () => {
      //-- ChatterListFetcher envoie une requête pour récupérer la liste des joueurs joignables
      const response = await axios.post(
        `${gameConst.backend}/chatterlist/get`,
        {
          playerId: `${playerData.id}`,
          playerToken: `${token}`,
        }
      );
      console.log(response.data.message);
      setChatterList(response.data.chatterList);
    };
    chatterList.length === 0 && chatterListFetcher();

    const privateChatsFetcher = async () => {
      //-- privateChatFetcher envoie une requête pour récupérer les données du chat public
      const response = await axios.post(
        `${gameConst.backend}/privatechat/get`,
        {
          playerId: `${playerData.id}`,
          playerToken: `${token}`,
        }
      );
      console.log(response.data.message);
      setPrivateChats(response.data.privateChats);
      setPVFLock(true);
    };
    pVFLock === false && privateChatsFetcher();
  }, [
    gameConst,
    token,
    playerData,
    privateChat,
    privateChats,
    chatterList,
    pVFLock,
  ]);

  //-- RENDER
  return (
    <main className="overallContainer">
      <section className="gameChat">
        {/* Private Chat Header */}
        <div className="dataformTop">
          {/* message discret */}
          <div className="gameChatTopLeft">
            <h6>* soyez poli, pas polisson!</h6>
          </div>
          {/* femer le Private Chat */}
          <button
            className="closingBox"
            onClick={() => setDisplayPrivateChat(false)}
          >
            X
          </button>
        </div>
        <div className="chooseSection">
          <button
            className="chooseSectionBA"
            style={
              displaySection === "players"
                ? {
                    color: "white",
                    backgroundColor: "black",
                  }
                : {}
            }
            onClick={() => {
              setDisplaySection("players");
            }}
          >
            joueurs
          </button>
          <button
            className="chooseSectionBA"
            style={
              displaySection === "chat"
                ? {
                    color: "white",
                    backgroundColor: "black",
                  }
                : {}
            }
            onClick={() => {
              setDisplaySection("chat");
            }}
          >
            chat
          </button>
          <button
            className="chooseSectionBA"
            style={
              displaySection === "chats"
                ? {
                    color: "white",
                    backgroundColor: "black",
                  }
                : {}
            }
            onClick={() => {
              setDisplaySection("chats");
            }}
          >
            conversations
          </button>
        </div>
        {/* liste des chatteurs */}
        {displaySection === "players" && (
          <div className="privateChatSection">
            <div className="privatePlayersList">
              {chatterList.length > 0 &&
                chatterList.map((chatter, index) => {
                  return (
                    <button
                      className="playersDisplayer"
                      onClick={() => {
                        setReceiverId(chatter.chatterId);
                        setReceiverName(chatter.chatterName);
                        receiverChecker(chatter.chatterId);
                        setDisplaySection("chat");
                      }}
                      key={index}
                    >
                      {chatter.chatterName}
                    </button>
                  );
                })}
            </div>
          </div>
        )}
        {/* chatBox avec le receveur */}
        {displaySection === "chat" && (
          <div className="privateChatSection">
            {/* ChatBox receveur */}
            <div className="privateChatTopBox">
              {receiverName === "" ? (
                <h3>choisissez un joueur pour discuter avec lui</h3>
              ) : (
                <h3>vous dicutez avec {receiverName}</h3>
              )}
            </div>
            {/* ChatBox message */}
            <div className="privateChatBoxDisplayer">
              {privateChat &&
                privateChat.length > 0 &&
                privateChat.map((chat, index) => {
                  return (
                    <article
                      className="messageDisplay"
                      style={
                        chat.seName === playerData.name
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
                          {chat.seName} :
                        </h3>
                        <h4>{chat.messageDate.displayTime}</h4>
                      </div>
                      <h3 className="messageDisplayMessage">
                        {chat.senderMessage}
                      </h3>
                    </article>
                  );
                })}
            </div>
            {/* formulaire d'envoi du message */}
            <div className="privateMessageToSendForm">
              <textarea
                className="privateMessageInputs"
                type="text"
                maxLength="256"
                placeholder="Your Message"
                value={privateMessageToSend}
                onChange={(event) => {
                  setPrivateMessageToSend(event.target.value);
                }}
              />
              {/* chat submit */}
              <input
                className="privateMessageSubmit"
                type="submit"
                value="Envoyer !"
                onClick={() => {
                  privateMessageSender();
                }}
              />
            </div>
          </div>
        )}
        {/* choix du receveur */}
        {displaySection === "chats" && (
          <div className="privateChatSection">
            <div className="privateChatOpen">
              {privateChats.length > 0 &&
                privateChats.map((chat, index) => {
                  return (
                    <button
                      className="chatsDisplayer"
                      onClick={() => {
                        setPrivateChat(chat.chat);
                        setReceiverId(chat.reId);
                        setReceiverName(chat.reName);
                        setChatId(chat._id);
                        setDisplaySection("chat");
                      }}
                      key={index}
                    >
                      {chat.seName === playerData.name
                        ? chat.reName
                        : chat.seName}
                    </button>
                  );
                })}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default PrivateChat;
