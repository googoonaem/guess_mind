import events from "./events";

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

const socketController = (socket) => {
    const broadcast = (event, data) => socket.broadcast.emit(event, data);
    socket.on(events.setNickname, ({nickname}) => {
        socket.nickname = nickname;
        socket.userColor = randomColor();
        broadcast(events.newUser, {nickname, color:socket.userColor});
    });
    socket.on(events.disconnect, () => {
        broadcast(events.disconnected, {nickname: socket.nickname});
    });
    socket.on(events.sendMsg, ({message}) => {
        broadcast(events.newMsg, {message, nickname: socket.nickname, color:socket.userColor});
    });
};

export default socketController;