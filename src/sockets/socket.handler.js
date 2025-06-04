module.exports = (io, socket) => {
  socket.on("joinRoom", ({ roomId, user }) => {
    socket.join(roomId);
    io.to(roomId).emit("userJoined", user);
  });

  socket.on("answer", ({ roomId, answer }) => {
    io.to(roomId).emit("receiveAnswer", { user: socket.id, answer });
  });

  socket.on("disconnect", () => {
    console.log("🔴 Usuario desconectado:", socket.id);
  });
};
