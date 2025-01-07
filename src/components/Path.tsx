"use client";
import React from "react";
import { usePathname } from "next/navigation";

const Path = () => {
  const pathname = usePathname();
  return <div>{pathname}</div>;
};

export default Path;
