export const socketHandler = (io) => {
  io.on("connection", (socket) => {

    socket.on("locationUpdate", (data) => {
      socket.broadcast.emit("locationBroadcast", data);
    });

    socket.on("tripRequest", (data) => {
      socket.broadcast.emit("newTrip", data);
    });

    socket.on("tripAccepted", (data) => {
      socket.broadcast.emit("tripAccepted", data);
    });

  });
};