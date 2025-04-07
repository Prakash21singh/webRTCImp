import UserDisplay from "@/components/global/user-display";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

async function RoomPage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="w-full flex items-center justify-center">
      <UserDisplay id={id} />
    </div>
  );
}

export default RoomPage;
