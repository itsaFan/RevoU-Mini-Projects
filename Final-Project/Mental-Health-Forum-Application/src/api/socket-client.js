import io from "socket.io-client";

// baseURL: "https://us-central1-personal-d9ef9.cloudfunctions.net/health_haven_forum_server/api",

export const socket = io("https://personal-d9ef9.el.r.appspot.com", {
  reconnection: true,
  reconnectionAttempts: 3,
  reconnectionDelay: 5 * 1000,
  reconnectionDelayMax: 60 * 1000,
});
