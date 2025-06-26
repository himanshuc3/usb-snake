import React, { useEffect } from "react";
import { Flex, Typography, Switch } from "antd";
import { useState } from "react";
import { SoundOutlined, MutedOutlined } from "@ant-design/icons";
import logo from "../../images/logo.png";

import SnakeCanvas from "../SnakeCanvas";
import useKeyPress from "../../hooks/useKeyPress";
import "./index.scss";
const { Text } = Typography;

export default function GameBoard() {
  const [display, setDisplay] = useState("READY");
  const [lastPressed, setLastPressed] = useState("");
  const { keyPressed } = useKeyPress();
  const evtDown = new MouseEvent("mousedown", { bubbles: true });
  const evtUp = new MouseEvent("mouseup", { bubbles: true });

  const handleButtonPress = (button) => {
    setLastPressed(button);
    setDisplay(`${button} PRESSED`);

    // Reset display after 1 second
    setTimeout(() => {
      setDisplay("READY");
      setLastPressed("");
    }, 1000);
  };

  useEffect(() => {
    let elem = null;
    switch (keyPressed) {
      case "ArrowUp":
        elem = document.getElementsByClassName("up")[0];
        break;
      case "ArrowDown":
        elem = document.getElementsByClassName("down")[0];
        break;
      case "ArrowLeft":
        elem = document.getElementsByClassName("left")[0];
        break;
      case "ArrowRight":
        elem = document.getElementsByClassName("right")[0];
        break;
    }

    if (elem) {
      elem.dispatchEvent(evtDown);
      setTimeout(() => {
        elem.dispatchEvent(evtUp);
        elem.click(); // call actual click after "visual" press
      }, 100);
    }
  }, [keyPressed]);

  const ButtonComponent = ({ children, onClick, className = "", label }) => (
    <button
      onClick={onClick}
      className={`
        bg-slate-800 hover:bg-slate-700 active:bg-slate-900 
        text-yellow-400 font-bold rounded-lg shadow-lg
        transition-all duration-150 ease-in-out
        active:scale-95 active:shadow-inner
        border-2 border-slate-900
        ${className}
      `}
      aria-label={label}
    >
      {children}
    </button>
  );

  return (
    <Flex vertical justify="center" align="center" className="root-container">
      <Flex className="logo">
        <a href="https://himanshusb.in">
          <img src={logo} width="50px" />
        </a>
      </Flex>
      <Flex className="github-fork">
        <a href="https://github.com/himanshuc3/usb-snake" target="_blank">
          <img
            loading="lazy"
            decoding="async"
            width="149"
            height="149"
            src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png"
            class="attachment-full size-full"
            alt="Fork me on GitHub"
          />
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
          <SnakeCanvas keyPressed={keyPressed} />
        </div>
      </Flex>
      <Flex className="footer">
        <Flex className="keypad">
          <button className="up"></button>
          <button className="down"></button>
          <button className="left"></button>
          <button className="right"></button>
        </Flex>
      </Flex>
    </Flex>
  );
}
