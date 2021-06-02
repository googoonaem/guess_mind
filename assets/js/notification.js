const notifications = document.getElementById("jsNotifications");

const fireNotification = (text) => {
   const noti = document.createElement("div");
   noti.innerText = text;
   notifications.appendChild(noti);
};

export const handleNewUser = ({nickname}) => {
   fireNotification(`${nickname} just joined!`);
};

export const handleDisconnected = ({nickname}) => {
   fireNotification(`${nickname} just disconnected!`);
};