"use server";
import {
  createRoom,
  findRoomByIdAndAddParticipants,
  removeUserFromRoom,
} from "@/lib/actions/room";
import { Http2Server } from "http2";
import { Socket } from "net";
import { NextApiRequest, NextApiResponse } from "next";
import { Server, type Server as IOServer } from "socket.io";

type ExtendedNextApiRequest = NextApiRequest & {
  socket: Socket & {
    server: Http2Server & {
      io?: IOServer;
    };
  };
};

export default function SocketHandler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.socket.server.io) {
    return res.end();
  }

  const io = new Server(req.socket.server);

  req.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log(`User connected:🟢 ${socket.id}`);

    socket.on("create-room", async ({ ownerId }) => {
      const room = await createRoom({ ownerId });

      socket.join(room._id);

      io.to(room._id).emit("room-created", { roomId: room._id });
    });

    socket.on("join-room", async ({ roomId, userId }) => {
      try {
        const room = await findRoomByIdAndAddParticipants({
          roomId,
          participant: userId,
        });
        socket.join(room._id);

        socket.to(room._id).emit("user-joined", userId);

        socket.emit("existing-participants", {
          participants: room.participants.filter(
            (participant: any) => participant._id !== userId
          ),
        });
      } catch (error: any) {
        throw new Error("Failed to join room", error.message);
      }
    });

    socket.on("singling", ({ roomId, userId, signal }) => {
      socket.to(roomId).emit("signal", { userId, signal });
    });

    socket.on("disconnect", async () => {
      const roomIds = await removeUserFromRoom(socket.id);

      roomIds.map((room) => {
        socket.to(room).emit("user-left", { userId: socket.id });
      });
    });
  });

  return res.end();
}
