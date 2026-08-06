export const socketHandler = (io) => {
  io.on("connection", (socket) => {

    socket.on("locationUpdate", (data) => {
      socket.broadcast.emit("locationBroadcast", data);
    });

  });
};