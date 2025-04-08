import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "lucide-react";
import { createRoom, getSocket } from "@/utils/socketClient";

type Props = {
  value: string;
  creating: boolean;
  action: string | undefined;
  setAction: Dispatch<SetStateAction<"Creating" | "Joining" | undefined>>;
  setValue: Dispatch<SetStateAction<string>>;
  setCreating: Dispatch<SetStateAction<boolean>>;
  handleJoin: () => void;
};

function CreateRoom({
  setValue,
  value,
  creating,
  setCreating,
  action,
  setAction,
  handleJoin,
}: Props) {
  async function handleClick() {
    if (value.length) {
      setAction("Joining");
    } else {
      setAction("Creating");
    }
    setCreating(true);
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(true);
      }, 3000)
    );
    if (value.length) {
      handleJoin();
    } else {
      handleCreate();
    }
  }

  async function handleCreate() {
    try {
      const roomId = await createRoom({ userId: process.env.USER_ID! });
      setValue(`http://localhost:3000/room/${roomId as string}`);
    } catch (error) {
      console.log(error);
    } finally {
      setCreating(false);
    }
  }

  return (
    <Button
      title="Create room | Join room"
      type="button"
      onClick={handleClick}
      className="absolute right-1 top-1 z-10 cursor-pointer h-10 px-4 bg-black dark:bg-white">
      {creating ? `${action}...` : <Link />}
    </Button>
  );
}

export default CreateRoom;
