"use client";
import React, { createContext, useState } from "react";

export const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [scrollY, setScrollY] = useState(1);

  return (
    <AppContext.Provider value={{ scrollY, setScrollY }}>
      {children}
    </AppContext.Provider>
  );
};
