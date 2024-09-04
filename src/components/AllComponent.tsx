import { CountProvider } from "@/context/CountContext";
import React from "react";
import { AComponent } from "./AComponent";
import { BComponent } from "./BComponent";

const AllComponent = () => {
  return (
    <CountProvider>
      <AComponent />
      <BComponent />
    </CountProvider>
  );
};

export default AllComponent;
