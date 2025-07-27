import React, { useEffect } from "react";
import { Flex, Typography, Tooltip } from "antd";
import { useState } from "react";
import {
  SoundOutlined,
  MutedOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

import SnakeCanvas from "../SnakeCanvas";
import useKeyPress from "../../hooks/useKeyPress";
import "./index.scss";
import { usePoints } from "../../state/points";
import { githubColors } from "../../common/constants";
const { Text } = Typography;

export default function GameBoard() {
  const [display, setDisplay] = useState("READY");
  const [lastPressed, setLastPressed] = useState("");
  const [direction, setDirection] = useState(null);
  const { keyPressed, isKeyPressed, lastFiveKeys } = useKeyPress();
  const { points, addPoints } = usePoints();
  const [muted, setMuted] = useState();

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

  // Function to format key names for display
  const formatKeyName = (key) => {
    if (
      key.length === 1 &&
      ((key >= "a" && key <= "z") || (key >= "A" && key <= "Z"))
    ) {
      return key.toUpperCase();
    }
    switch (key) {
      case "ArrowUp":
        return "↑";
      case "ArrowDown":
        return "↓";
      case "ArrowLeft":
        return "←";
      case "ArrowRight":
        return "→";
      case "Meta":
        return "⌘";
      case "Control":
        return "⌃";
      case "Shift":
        return "⇧";
      case "Alt":
        return "⌥";
      case "CapsLock":
        return "⇪";
      case "Enter":
        return "↵";
      case "Backspace":
        return "⌫";
      case "Delete":
        return "⌦";
      case "PageUp":
        return "⇞";
      case "PageDown":
        return "⇟";
      case "Home":
        return "⇱";
      case "End":
        return "⇲";
      default:
        return "🤷";
    }
  };

  // Last Five Keys Component
  const LastFiveKeys = () => (
    <div className="key-history">
      <Flex vertical gap={8} className="keys-list">
        {lastFiveKeys.map((key, index) => (
          <div
            key={`${key}-${index}`}
            className={`key-item ${index === 0 ? "most-recent" : ""}`}
            style={{ opacity: Math.max(1 - index / 5, 0.1) }}
          >
            {formatKeyName(key)}
          </div>
        ))}
      </Flex>
    </div>
  );

  // Keyboard Controls Component
  const KeyboardControls = () => (
    <Flex className="keyboard-controls" vertical align="center" gap={8}>
      <Flex vertical gap={4}>
        <Flex justify="center">
          <div
            className={`key-button ${
              isKeyPressed("ArrowUp") || isKeyPressed("W") || isKeyPressed("w")
                ? "active"
                : ""
            }`}
          >
            ↑ / W
          </div>
        </Flex>
        <Flex gap={4} justify="center">
          <div
            className={`key-button ${
              isKeyPressed("ArrowLeft") ||
              isKeyPressed("A") ||
              isKeyPressed("a")
                ? "active"
                : ""
            }`}
          >
            ← / A
          </div>
          <div
            className={`key-button ${
              isKeyPressed("ArrowDown") ||
              isKeyPressed("S") ||
              isKeyPressed("s")
                ? "active"
                : ""
            }`}
          >
            ↓ / S
          </div>
          <div
            className={`key-button ${
              isKeyPressed("ArrowRight") ||
              isKeyPressed("D") ||
              isKeyPressed("d")
                ? "active"
                : ""
            }`}
          >
            → / D
          </div>
        </Flex>
      </Flex>
    </Flex>
  );

  return (
    <Flex vertical justify="center" align="center" className="root-container">
      <Flex
        align="center"
        justify="space-between"
        className="header-container w-full relative"
      >
        <Text
          style={{ color: "white", fontWeight: "500" }}
          className="contributions-text"
        >
          <span className="points-counter">{points}</span>
        </Text>
        <Flex gap={10}>
          <Flex onClick={() => setMuted(!muted)} className="sound-container">
            {muted ? <MutedOutlined /> : <SoundOutlined />}
          </Flex>
          <Flex onClick={() => {}} >
            <Tooltip title={<div>

            </div>} placement="bottom">
              <InfoCircleOutlined />
            </Tooltip>
          </Flex>
        </Flex>
      </Flex>
      <Flex className="game-board-container" gap={20}>
        <div className="game-canvas">
          <SnakeCanvas keyPressed={keyPressed} direction={direction} />
        </div>
        <LastFiveKeys />
      </Flex>
      <Flex className="footer">
        <Flex justify="space-between" align="center" className="footer-help">
          <Flex>
            <a
              href="https://github.com/himanshuc3/usb-snake"
              style={{  }}
              target="_blank"
              className="contribute-link"
            >
              Want to contribute or give feedback?
            </a>
          </Flex>
          <Flex
            className="contribution-container"
            justify="space-between"
            gap={6}
          >
            <Text style={{ color: "#9198a1" }}>Less</Text>
            <Flex gap={4}>
              {githubColors.map((color, index) => (
                <div
                  key={index}
                  className="contribution-box"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </Flex>
            <Text style={{ color: "#9198a1" }}>More</Text>
          </Flex>
        </Flex>

        <KeyboardControls />
      </Flex>
    </Flex>
  );
}
