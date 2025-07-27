import React, { useEffect } from "react";
import { Flex, Typography, Switch } from "antd";
import { useState } from "react";
import { SoundOutlined, MutedOutlined } from "@ant-design/icons";
import logo from "../../images/logo.png";

import SnakeCanvas from "../SnakeCanvas";
import useKeyPress from "../../hooks/useKeyPress";
import "./index.scss";
import Button from "../button";
const { Text } = Typography;

const githubColors = ["#033a16", "#196c2e", "#2ea043", "#56d364"];

export default function GameBoard() {
  const [display, setDisplay] = useState("READY");
  const [lastPressed, setLastPressed] = useState("");
  const [direction, setDirection] = useState(null);
  const { keyPressed, isKeyPressed } = useKeyPress();

  // Handle direction changes
  const handleDirectionChange = (newDirection) => {
    setDirection(newDirection);
    setLastPressed(newDirection);
    setDisplay(`${newDirection.toUpperCase()} PRESSED`);

    // Reset display after 1 second
    setTimeout(() => {
      setDisplay("READY");
      setLastPressed("");
    }, 1000);
  };

  useEffect(() => {
    if (keyPressed) {
      switch (keyPressed) {
        case "ArrowUp":
        case "w":
        case "W":
          handleDirectionChange("up");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          handleDirectionChange("down");
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          handleDirectionChange("left");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          handleDirectionChange("right");
          break;
      }
    }
  }, [keyPressed]);

  // Keyboard Controls Component
  const KeyboardControls = () => (
    <Flex className="keyboard-controls" vertical align="center" gap={8}>
      <Text style={{ color: '#9198a1', fontSize: '12px' }}>Keyboard Controls</Text>
      <Flex vertical gap={4}>
        <Flex justify="center">
          <div className={`key-button ${isKeyPressed('ArrowUp') || isKeyPressed('W') || isKeyPressed('w') ? 'active' : ''}`}>
            ↑ / W
          </div>
        </Flex>
        <Flex gap={4} justify="center">
          <div className={`key-button ${isKeyPressed('ArrowLeft') || isKeyPressed('A') || isKeyPressed('a') ? 'active' : ''}`}>
            ← / A
          </div>
          <div className={`key-button ${isKeyPressed('ArrowDown') || isKeyPressed('S') || isKeyPressed('s') ? 'active' : ''}`}>
            ↓ / S
          </div>
          <div className={`key-button ${isKeyPressed('ArrowRight') || isKeyPressed('D') || isKeyPressed('d') ? 'active' : ''}`}>
            → / D
          </div>
        </Flex>
      </Flex>
    </Flex>
  );

  return (
    <Flex vertical justify="center" align="center" className="root-container">
      <Flex className="logo">
        <a href="https://himanshusb.in">
          <img src={logo} width="50px" />
        </a>
      </Flex>
      <Flex
        align="center"
        justify="space-between"
        className="header-container w-full relative"
      >
        <Flex>USB</Flex>
        <Flex>
          <Text>133 points</Text>
          <Flex>
            <Switch
              checkedChildren={<SoundOutlined />}
              unCheckedChildren={<MutedOutlined />}
              defaultChecked
              className="sound-switch"
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex className="game-board-container">
        <div>
          <SnakeCanvas keyPressed={keyPressed} direction={direction} />
        </div>
      </Flex>
      <Flex className="footer">
        <Flex justify="space-between" align="center" className="footer-help">
          <Flex>
            <Text style={{ color: '#9198a1'}}>Want to contribute.</Text>
          </Flex>
          <Flex
            className="contribution-container"
            justify="space-between"
            gap={6}
          >
            <Text style={{color:"#9198a1"}}>Less</Text>
            <Flex gap={4}>
            {githubColors.map((color, index) => (
              <div
                key={index}
                className="contribution-box"
                style={{ backgroundColor: color }}
                ></div>
            ))}
                </Flex>
            <Text style={{color:"#9198a1"}}>More</Text>
          </Flex>
        </Flex>
        
        {/* Add keyboard controls display */}
        <KeyboardControls />
        
        
      </Flex>
    </Flex>
  );
}
