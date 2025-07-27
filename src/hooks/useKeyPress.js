import React, { useState, useEffect, useCallback } from "react";

function useKeyPress() {
  const [keyPressed, setKeyPressed] = useState(null);
  const [keysPressed, setKeysPressed] = useState(new Set());

  const handleKeyDown = useCallback((event) => {
    // Prevent default behavior for arrow keys to avoid page scrolling
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
    }
    
    setKeyPressed(event.key);
    setKeysPressed(prev => new Set([...prev, event.key]));
    
    // Clear the key after a brief moment to allow for continuous movement
    setTimeout(() => setKeyPressed(null), 100);
  }, []);

  const handleKeyUp = useCallback((event) => {
    setKeysPressed(prev => {
      const newSet = new Set(prev);
      newSet.delete(event.key);
      return newSet;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return { 
    keyPressed, 
    keysPressed,
    isKeyPressed: (key) => keysPressed.has(key)
  };
}

export default useKeyPress;
