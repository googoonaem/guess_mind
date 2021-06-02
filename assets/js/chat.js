const socket = io("/");
const input = document.querySelector("#jsinput");
input.focus();
input.addEventListener("click", () => {
    socket.emit("newMessage", {message:input.value});
    console.log(`You: ${input.value}`);
    input.value = "";
});

function sendMessage(message) {
    
};

export const handleMessageNotif = (data) => {
    const {message, nickname} = data;
    console.log(`${nickname} : ${message}`);
};

function setNickname(nickname) {
    socket.emit("setNickname", {nickname});
}

socket.on("messageNotif", handleMessageNotif);