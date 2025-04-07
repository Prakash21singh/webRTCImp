"use client";
import Hero from "@/components/landing/hero";
import TopBar from "@/components/landing/topbar";
import React from "react";

type Props = {};

function RootPage({}: Props) {
  return (
    <div className="w-full h-full ">
      <TopBar />
      <Hero />
    </div>
  );
}

export default RootPage;
