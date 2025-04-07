import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link as LinkIcon } from "lucide-react";
import { RoomJoinInput } from "../global/link";
type Props = {};

function Hero({}: Props) {
  return (
    <div className="w-full h-[calc(100vh-70px)] flex items-center justify-center">
      <div className="p-10 rounded-lg bg-white dark:bg-black shadow-[2px_2px_2px_rgba(0,0,0,0.1),_2px_2px_2px_rgba(0,0,0,0.05)_inset] dark:shadow-[2px_2px_2px_rgba(255,255,255,0.1),_2px_2px_2px_rgba(255,255,255,0.05)_inset]">
        <h1 className="text-xl md:text-3xl lg:text-6xl font-semibold">
          Start meet right away
        </h1>
        <div className="flex gap-x-1 items-center my-5 ">
          <RoomJoinInput />
        </div>
      </div>
    </div>
  );
}

export default Hero;
