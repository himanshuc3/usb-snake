import Sketch from "react-p5";
import React, { useRef, useEffect } from "react";
import GameEnvInstance from "../../game";
import { DIRECTION } from "../../helper/constants";
import { usePoints } from '../../state/points';

// NOTE:
// 1. Random walker that moves in 8 directions
class Walker {
  direction = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
  };

  diffBasedOnDirection = {
    [this.direction.UP]: { x: 0, y: -1 }, // UP
    [this.direction.DOWN]: { x: 0, y: 1 }, // DOWN
    [this.direction.LEFT]: { x: -1, y: 0 }, // LEFT
    [this.direction.RIGHT]: { x: 1, y: 0 }, // RIGHT
  };

  constructor(p5) {
    this.p5 = p5;
    this.x = this.p5.random(p5.width);
    this.y = this.p5.random(p5.height);
  }

  step() {
    // const choice = this.p5.floor(this.p5.random(4))
    // this.x += this.diffBasedOnDirection[choice].x;
    // this.y += this.diffBasedOnDirection[choice].y;
    // NOTE:
    // 1. random() is producing a uniform distribution
    // 2. Producing a normal distribution (bell curve) is non-uniform
    // 3. Accept-reject sampling algorithms (two phased, r1 and r2)
    // 4. Perlin noise is a gradient noise function that produces smooth transitions
    // let xstep = this.p5.floor(this.p5.random(3)) - 1
    // let ystep = this.p5.floor(this.p5.random(3)) - 1
    // this.x += xstep;
    // this.y += ystep;
    let r = this.p5.random(1);
    if (r < 0.2) {
      this.x += 1; // move right
    } else if (r < 0.4) {
      this.x -= 1; // move left
    } else if (r < 0.6) {
      this.y += 1; // move down
    } else {
      this.y -= 1; // move up
    }
  }

  render() {
    this.p5.stroke(0);
    this.p5.point(this.x, this.y);
  }
}

class Food {
  contructor(p5) {
    this.p5 = p5;
  }
}

function drawRandomGaussian(p5) {
  let x = p5.randomGaussian(p5.width / 2, 60);

  p5.noStroke();
  p5.fill(0, 10);
  p5.circle(x, 120, 16);
}

function drawPerlinNoise(p5) {
  let t = 0;

  function draw() {
    let n = p5.noise(t);
    let x = p5.map(n, 0, 1, p5.width * 0.1, p5.width * 0.9);
    p5.ellipse(x, 180, 16, 16);
    t += 0.01;
  }
  return { draw };
}

let p5Instance = null;
function SnakeGame({ keyPressed, direction }) {
  const snakeBoard = useRef(null);
  const pointsContext = usePoints()
  
  // Direction mapping function
  const mapToGameDirection = (input) => {
    switch (input) {
      case "ArrowUp":
      case "w":
      case "W":
      case "up":
        return DIRECTION.UP;
      case "ArrowDown":
      case "s":
      case "S":
      case "down":
        return DIRECTION.DOWN;
      case "ArrowLeft":
      case "a":
      case "A":
      case "left":
        return DIRECTION.LEFT;
      case "ArrowRight":
      case "d":
      case "D":
      case "right":
        return DIRECTION.RIGHT;
      default:
        return null;
    }
  };

  // Handle direction changes from keyPressed prop (backward compatibility)
  useEffect(() => {
    if (keyPressed && snakeBoard.current) {
      const gameDirection = mapToGameDirection(keyPressed);
      if (gameDirection) {
        snakeBoard.current.snake.setDirection(gameDirection);
      }
    }
  }, [keyPressed]);

  // Handle direction changes from direction prop (new way)
  useEffect(() => {
    if (direction && snakeBoard.current) {
      const gameDirection = mapToGameDirection(direction);
      if (gameDirection) {
        snakeBoard.current.snake.setDirection(gameDirection);
      }
    }
  }, [direction]);

  const preload = (p5) => {
    // textureImg = p5.loadImage("../../images/texture1.jpg"); // replace with your texture image path
  };

  const setup = (p5, canvasParentRef) => {
    if (p5Instance) p5Instance.remove();
    p5.createCanvas(
      canvasParentRef.clientWidth,
      canvasParentRef.clientHeight
    ).parent(canvasParentRef);
    snakeBoard.current = new GameEnvInstance(p5, pointsContext);
    p5Instance = p5;
    p5.background(50);
  };

  const draw = (p5) => {
    if(pointsContext.points > 200){
      p5.frameRate(30)
    }else if(pointsContext.points > 150){
      p5.frameRate(25)
    }else if(pointsContext.points > 100){
      p5.frameRate(22)
    }else if(pointsContext.points > 60){
      p5.frameRate(18)
    }else if(pointsContext.points > 30){
      p5.frameRate(12)
    }else{
      p5.frameRate(10)
    }
    
    snakeBoard.current.update();
    snakeBoard.current.render();
  };

  return <Sketch setup={setup} draw={draw} preload={preload} />;
}

export default SnakeGame;
