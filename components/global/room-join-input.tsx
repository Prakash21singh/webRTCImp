"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { getSocket } from "@/utils/socketClient";
import { useRouter } from "next/navigation";
import CreateRoom from "../actions/CreateRoom";
interface RoomJoinInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onJoin?: (value: string) => void;
}

export const RoomJoinInput = React.forwardRef<
  HTMLInputElement,
  RoomJoinInputProps
>(({ className, onJoin, ...props }, ref) => {
  const [value, setValue] = React.useState("");
  const [creating, setCreating] = React.useState<boolean>(false);
  const [action, setAction] = React.useState<"Creating" | "Joining">();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  React.useEffect(() => {
    async function initiate() {
      const socket = await getSocket();
      socket.on("connect", () => {
        socket.on("room-created", ({ roomId }) => {
          setValue(`room/${roomId}`);
        });
      });
    }
    initiate();
  }, []);

  async function handleJoin() {
    try {
      console.log("Failed to join");
      router.push(value);
    } catch (error) {
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="relative w-full">
      <input
        className={cn(
          "flex h-12 w-full rounded-md border border-input bg-background px-4 py-2 pr-24 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        value={value}
        onChange={handleChange}
        {...props}
        placeholder="Paste meet link or enter room id"
      />
      <CreateRoom
        value={value}
        creating={creating}
        setValue={setValue}
        setCreating={setCreating}
        action={action!}
        setAction={setAction}
        handleJoin={handleJoin}
      />
    </div>
  );
});
