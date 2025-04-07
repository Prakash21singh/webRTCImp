"use client";
import React from "react";

type Props = {
  stream?: MediaStream;
};

export default function UserFrame({ stream }: Props) {
  return (
    <div className="w-full  border rounded-md overflow-hidden border-blue-2 ">
      Here you will show the user pov
    </div>
  );
}
