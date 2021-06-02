import { handleNewMessage } from "./chat";
import { handleDisconnected, handleNewUser } from "./notification";

let socket = null;

export const getSocket = () => socket;

export const initSockets = (aSocket) => {
    const {events} = window;
    socket = aSocket;
    aSocket.on(events.newUser, handleNewUser);
    aSocket.on(events.disconnected, handleDisconnected);
    aSocket.on(events.newMsg, handleNewMessage);
};