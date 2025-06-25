import Sketch from 'react-p5'
import React, {useRef, useEffect} from 'react';
import GameEnvInstance from '../../game';
import { DIRECTION } from '../../helper/constants';


// NOTE:
// 1. Random walker that moves in 8 directions
class Walker {
  direction = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
  } 

  diffBasedOnDirection = {
    [this.direction.UP]: { x: 0, y: -1 }, // UP
    [this.direction.DOWN]: { x: 0, y: 1 },  // DOWN
    [this.direction.LEFT]: { x: -1, y: 0 }, // LEFT
    [this.direction.RIGHT]: { x: 1, y: 0 }   // RIGHT
  }

  constructor(p5) {
    this.p5 = p5;
    this.x = this.p5.random(p5.width);
    this.y = this.p5.random(p5.height);
  }

  step(){
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
    }
    else if (r < 0.4) {
      this.x -= 1; // move left
    }
    else if (r < 0.6) {
      this.y += 1; // move down
    }
    else {
      this.y -= 1; // move up
    }
  }

  render() {
    this.p5.stroke(0);
    this.p5.point(this.x, this.y)
  }
}




class Food {
  contructor(p5) {
    this.p5 = p5
    
  }
}



function drawRandomGaussian(p5){
  let x = p5.randomGaussian(p5.width/2, 60)

  p5.noStroke()
  p5.fill(0,10)
  p5.circle(x, 120, 16)
}

function drawPerlinNoise(p5) {
  let t = 0

  function draw(){
    let n = p5.noise(t)
    let x = p5.map(n, 0, 1, p5.width*0.1, p5.width*0.9)
    p5.ellipse(x,180,16,16)
    t += 0.01
  }
  return {draw}
} 



let p5Instance = null
function SnakeGame({keyPressed}) {
  const snakeBoard = useRef(null);
  useEffect(() => {
      switch (keyPressed) {
        case 'ArrowUp':
          snakeBoard.current.snake.setDirection(DIRECTION.UP);
          break;
        case 'ArrowDown':
          snakeBoard.current.snake.setDirection(DIRECTION.DOWN);
          break;
        case 'ArrowLeft':
          snakeBoard.current.snake.setDirection(DIRECTION.LEFT);
          break;
        case 'ArrowRight':
          snakeBoard.current.snake.setDirection(DIRECTION.RIGHT);
          break;
      }
  }, [keyPressed])
  const setup = (p5, canvasParentRef) => {
    if(p5Instance) p5Instance.remove();
    p5.createCanvas(canvasParentRef.clientWidth, canvasParentRef.clientHeight).parent(canvasParentRef)
    snakeBoard.current = new GameEnvInstance(p5);
    p5Instance = p5;
  };
  
  const draw = (p5) => {
    p5.frameRate(10);
    p5.background(250);
    snakeBoard.current.update()
    snakeBoard.current.render()
    

  };


  return (
    <> 
    <Sketch setup={setup} draw={draw} />
    </>
  )
}

export default SnakeGame;
