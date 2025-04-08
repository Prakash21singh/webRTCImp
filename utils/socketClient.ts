// utils/socketClient.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
let socketInitialising = false;
let socketInitialized = false;

export const getSocket = async (): Promise<Socket> => {
  if (socket && socketInitialized) {
    return socket;
  }

  if (!socketInitialising) {
    socketInitialising = true;

    try {
      await fetch("/api/socket");

      // Now that the socket.io server is initialized, connect to it
      socket = io();

      // Add connection listeners
      socket.on("connect", () => {
        console.log("Connected to socket.io server:", socket?.id);
        socketInitialized = true;
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from socket.io server");
        socketInitialized = false;
      });
    } catch (error) {
      console.log(`sokcet initializing error`, error);
      socketInitialising = false;
      throw error;
    }
    socketInitialising = false;
  }

  return new Promise((resolve) => {
    if (socket && socketInitialized) {
      resolve(socket);
      return;
    }

    const checkInterval = setInterval(() => {
      if (socket && socketInitialized) {
        clearInterval(checkInterval);
        resolve(socket);
      }
    }, 100);
  });
};

export const createRoom = async function ({ userId }: { userId: string }) {
  const socket = await getSocket();

  return new Promise((resolve) => {
    socket.emit("create-room", { ownerId: userId });

    socket.once("room-created", ({ roomId }) => {
      console.log(roomId);
      resolve(roomId);
    });
  });
};

export const handleJoinRoom = async function ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) {
  const socket = await getSocket();

  socket.emit("join-room", { roomId, userId });

  const userJoined = new Promise((resolve) => {
    socket.once("user-joined", (userId) => {
      resolve(userId);
    });
  });

  const existingUser = new Promise((resolve) => {
    socket.once("existing-participants", (participants) => {
      resolve(participants);
    });
  });

  const [joinedUser, existingUsers] = await Promise.all([
    userJoined,
    existingUser,
  ]);

  return {
    joinedUser,
    existingUser,
  };
};
