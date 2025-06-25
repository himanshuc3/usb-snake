import React, { useState, useEffect } from "react";

function useKeyPress() {
  const [keyPressed, setKeyPressed] = useState(null);
  function onKeyPress(event) {
    setKeyPressed(event.key)
  }

  useEffect(() => {
    console.log("keypressed");
    window.addEventListener("keydown", onKeyPress);


    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, []);
  return { keyPressed };
}

export default useKeyPress;
