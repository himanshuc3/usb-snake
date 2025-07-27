import React, { createContext, useState, useContext } from "react";

const PointsContext = createContext(null);

export const PointsProvider = ({ children }: { children: any }) => {
  const [points, setPoints] = useState(0);

  const addPoints = (pointsToAdd) => {
    console.log(pointsToAdd)
    setPoints((prev) => prev + pointsToAdd);
  };

  return (
    <PointsContext.Provider value={{ points, setPoints, addPoints }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => useContext(PointsContext)
