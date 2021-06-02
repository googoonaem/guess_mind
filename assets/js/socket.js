import { handleNewUser } from "./notification";

let socket = null;

export const updateSockets = (aSocket) => {
    socket = aSocket;
};

export const getSocket = () => socket;

export const initSockets = (aSocket) => {
    const {events} = window;
    updateSockets(aSocket);
    socket.on(events.newUser, handleNewUser);
};