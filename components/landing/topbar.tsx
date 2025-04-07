"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

const TopBar = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <header className={`w-full h-[70px] bg-white dark:bg-black`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className={`text-xl font-bold ${
            currentTheme === "dark" ? "text-white" : "text-black"
          }`}>
          AI Meet
        </Link>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            className={`p-2 rounded-md ${
              currentTheme === "dark"
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-800"
            }`}
            aria-label="Toggle Theme">
            {currentTheme === "dark" ? "🌞" : "🌙"}
          </button>

          <Link
            href="/login"
            className={`px-4 py-2 rounded-md  transition-all dark:bg-black dark:text-white bg-white text-black`}>
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
