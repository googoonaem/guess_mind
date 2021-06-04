import { getSocket } from "./socket";

const messages = document.getElementById("jsMessages");
const sendMsg = document.getElementById("jsSendMsg");

const appendMsg = (text, nickname, color) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="author ${nickname ? 'out' : 'self'}">${nickname ? nickname : "You"}:</span> ${text}
    `;
    li.style.color = color;
    if(!nickname) {
        li.style.fontWeight = "bold";
    }
    messages.appendChild(li);
};

const handleSendMsg = (e) => {
    e.preventDefault();
    const input = sendMsg.querySelector("input");
    const {value} = input;
    getSocket().emit(window.events.sendMsg, {message: value});
    input.value = "";
    appendMsg(value);
};

if(sendMsg) {
    sendMsg.addEventListener("submit", handleSendMsg);
}

export const handleNewMessage = ({message, nickname, color}) => appendMsg(message, nickname, color);
export const disableChat = () => sendMsg.style.display = "none";
export const enableChat = () => sendMsg.style.display = "block";