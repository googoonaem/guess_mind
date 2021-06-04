import events from "./events";
import { chooseWord } from "./words";

let sockets = [];
let inProgress = false;
let word = null;
let leader = null;
let timer = null;
let gameCnt = 0;

const ran = () => {
    let random = Math.floor(Math.random() * 16);
    switch (random) {
       case 10:
          random = "a";
          break;
       case 11:
          random = "b";
          break;
       case 12:
          random = "c";
          break;
       case 13:
          random = "d";
          break;
       case 14:
          random = "e";
          break;
       case 15:
          random = "f";
    }
    return random;
 };
 
 const randomColor = () => {
    const color = `#${ran()}${ran()}${ran()}${ran()}${ran()}${ran()}`;
    return color;
 };

const socketController = (socket, io) => {
   const broadcast = (event, data) => socket.broadcast.emit(event, data);
   const superBroadcast = (event, data) => io.emit(event, data);
   const sendPlayerUpdate = () => {
      return superBroadcast(events.playerUpdate, {sockets});
   };
   const chooseLeader = () => sockets[Math.floor(Math.random() * sockets.length)];
   const startGame = () => {
      if(sockets.length > 1) {
         if(inProgress === true) endGame();
         else {
            inProgress = true;
            leader = chooseLeader();
            word = chooseWord();
            superBroadcast(events.gameStarting);
            setTimeout(() => {
               superBroadcast(events.gameStarted);
               io.to(leader.id).emit(events.leaderNotif, {word});
               timer = setTimeout(endGame, 10000);
            }, 3000);
         }
      }
   };
   const endGame = () => {
      console.log(gameCnt);
      gameCnt++;
      if(gameCnt === 5) {
         superEndGame();
         return;
      }
      inProgress = false;
      superBroadcast(events.gameEnded);
      if (timer !== null) {
         clearTimeout(timer);
      }
      setTimeout(() => {
         startGame();
      }, 2000);
   };
   const superEndGame = () => {
      socket.score = 0;
      sendPlayerUpdate();
      gameCnt = 0;
      superBroadcast(events.superEnd);
   };
   const addPoints = (id) => {
      sockets = sockets.map(socket => {
         if(socket.id === id) {
            socket.score += 10;
         }
         return socket;
      });
      sendPlayerUpdate();
      endGame();
      clearTimeout(timer);
   };
   socket.on(events.setNickname, ({nickname}) => {
      socket.nickname = nickname;
      socket.userColor = randomColor();
      sockets.push({id: socket.id, score: 0, nickname: nickname, color:socket.userColor});
      broadcast(events.newUser, {nickname, color:socket.userColor});
      sendPlayerUpdate();
      startGame();
   });
   socket.on(events.disconnect, () => {
      sockets = sockets.filter((aSocket) => aSocket.id !== socket.id);
      broadcast(events.disconnected, {nickname: socket.nickname, color:socket.userColor});
      if(sockets.length === 1) {
         endGame();
      } else if(leader) {
         if(socket.id === leader.id) {
            endGame();
         }
      }
      sendPlayerUpdate();
   });
   socket.on(events.sendMsg, ({message}) => {
      broadcast(events.newMsg, {message, nickname: socket.nickname, color:socket.userColor});
      if(message === word) {
         superBroadcast(events.newMsg, {
            message: `Winner is ${socket.nickname}, word was: ${word}`,
            nickname: "Bot",
         });
         addPoints(socket.id);
      }
   });
   socket.on(events.beginPath, ({x, y}) => {
   broadcast(events.beganPath, {x, y});
   });
   socket.on(events.strokePath, ({x, y, color, lineWidth}) => {
   broadcast(events.strokedPath, {x, y, color, lineWidth});
   });
   socket.on(events.fill, ({color}) => broadcast(events.filled, {color}));
};

export default socketController;