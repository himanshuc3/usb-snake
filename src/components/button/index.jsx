import React from "react";
import "./index.scss";

export default function Button({text, className}) {
  return (
     <button className={`red button ${className}`}>Cancel</button>
  );
}
