"use client";
import React, { memo } from "react";
import UserFrame from "./user-frame";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
};

const UserDisplay = memo(function ({ id }: Props) {
  const items = [0];
  return (
    <div
      id="contain"
      className={`w-full h-screen p-10 border grid transition-all gap-3 ${cn(
        items.length === 1 && "grid-cols-1",
        items.length === 2 && "grid-cols-2",
        items.length === 3 && "grid-cols-3",
        items.length >= 4 && "grid-cols-2 grid-rows-2"
      )}
    `}>
      {items.map((item) => (
        <UserFrame key={item} />
      ))}
    </div>
  );
});

export default UserDisplay;
