import { disableCanvas, enableCanvas, hideControls, showControls, resetCanvas } from "./painter";
import {fireNotification} from "./notification";
import { disableChat, enableChat } from "./chat";

const board = document.getElementById("jsPlayerBoard");
const leaderNotif = document.getElementById("leaderNotif");

const addPlayers = (players) => {
    board.innerHTML = "";
    const ul = document.createElement("ul");
    players.forEach(player => {
        const li = document.createElement("li");
        li.innerText = `${player.nickname} : ${player.score}점`;
        ul.appendChild(li);
    });
    board.appendChild(ul);
};

const setLeaderNotif = (text) => {
    leaderNotif.innerText = "";
    if(text) leaderNotif.innerText = text;
}

export const hadnlePlayerUpdate = ({sockets}) => addPlayers(sockets);
export const handleGameStarted = () => {
    setLeaderNotif();
    disableCanvas();
    hideControls();
    enableChat();
};
export const handleLeaderNotif = ({word}) => {
    setLeaderNotif(`You are the leader, paint: ${word}`);
    showControls();
    enableCanvas();
    disableChat();
};
export const handleGameEnded = () => {
    leaderNotif.innerText = "";
    fireNotification("Game Ended");
    disableCanvas();
    hideControls();
    resetCanvas();
 };
 
 export const handleGameStarting = () => {
    let timing = 2;
    let startingTime = setInterval(() => {
       fireNotification(`Game will Starting in ${timing} seconds...`);
       timing -= 1;
       if(timing === 0) {
           clearInterval(startingTime);
       }
    }, 1000);
 };

 export const handleSuperEnd = () => {
    leaderNotif.innerText = "";
    fireNotification("Game Ended");
    disableCanvas();
    hideControls();
    resetCanvas();
 };