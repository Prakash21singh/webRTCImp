"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

interface RoomJoinInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onJoin?: (value: string) => void;
}

export const RoomJoinInput = React.forwardRef<
  HTMLInputElement,
  RoomJoinInputProps
>(({ className, onJoin, ...props }, ref) => {
  const [value, setValue] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const handleJoin = () => {
    if (onJoin && value.trim()) {
      onJoin(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) {
      handleJoin();
    }
  };

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
        onKeyDown={handleKeyDown}
        {...props}
        placeholder="Paste meet link or enter room id"
      />
      <Button
        type="button"
        className="absolute right-1 top-1 z-10 cursor-pointer h-10 px-4 bg-black dark:bg-white"
        onClick={handleJoin}
        disabled={!value.trim()}>
        <Link />
      </Button>
    </div>
  );
});
