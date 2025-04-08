"use server";

import Room from "../models/room.model";
import { connectDb } from "../utils";

async function createRoom({ ownerId }: { ownerId: string }) {
  connectDb();
  try {
    const roomId = crypto.randomUUID();
    const newRoom = await Room.create({ owner: ownerId, roomId });
    return newRoom;
  } catch (error: any) {
    throw new Error(`Error creating database: ${error.message}`);
  }
}

async function findRoom(id: string) {
  connectDb();
  try {
    const room = await Room.findById(id);
    if (!room) throw new Error("No room found with this id");
    return room;
  } catch (error: any) {
    throw new Error(`Error getting the room with this id:${error.message}`);
  }
}

async function findRoomByIdAndAddParticipants({
  roomId,
  participant,
}: {
  roomId: string;
  participant: string;
}) {
  connectDb();
  try {
    const room = await Room.findById(roomId);

    if (!room) throw new Error("No room found with this id");

    room.participants.push(participant);

    await room.save();

    return room;
  } catch (error: any) {
    throw new Error(`Error finding room:${error.message}`);
  }
}

async function removeUserFromRoom(userId: string) {
  connectDb();
  try {
    const rooms = await Room.find({
      participants: userId,
    });

    const roomIds = [];
    for (const room of rooms) {
      room.participants.filter(
        (participant: any) => participant._id !== userId
      );

      if (room.participants.length === 0) {
        await Room.deleteOne({ _id: room._id });
      } else {
        roomIds.push(room._id);
        await room.save();
      }
    }

    return roomIds;
  } catch (error: any) {
    throw new Error(`Error finding room:${error.message}`);
  }
}

export {
  createRoom,
  findRoom,
  findRoomByIdAndAddParticipants,
  removeUserFromRoom,
};
