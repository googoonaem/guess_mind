const notifications = document.getElementById("jsNotifications");

export const fireNotification = (text, color) => {
   notifications.innerHTML = "";
   const noti = document.createElement("div");
   noti.innerText = text;
   noti.style.backgroundColor = color;
   notifications.appendChild(noti);
   setTimeout(() => {noti.style.opacity = 0;}, 1000);
   setTimeout(() => {noti.remove()}, 1500);
};

export const handleNewUser = ({nickname, color}) => {
   fireNotification(`${nickname} just joined!`, color);
};

export const handleDisconnected = ({nickname, color}) => {
   fireNotification(`${nickname} just disconnected!`, color);
};

