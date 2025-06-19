import Sketch from 'react-p5'
import React, {useRef} from 'react';

import './index.css'

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


class SnakeBoard {
  constructor(p5){
    this.p5 = p5
    this.snake = new Snake(this.p5)
  }

  render(){
    this.p5.background(250)
    this.snake.update()
    this.snake.render()

  }

}


class Food {
  contructor(p5) {
    this.p5 = p5
    
  }
}


class Snake {
  constructor(p5) {
    this.p5 = p5
    this.body = [this.p5.createVector(this.p5.width / 2, this.p5.height / 2)];
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.growing = false
    this.mode = "usb-c"
  }

  setSpeed(x, y) {
    this.xSpeed = x;
    this.ySpeed = y;
  }
  update() {
    let head = this.body[this.body.length - 1].copy();
    head.x += this.xSpeed*2
    head.y += this.ySpeed*2
    
    this.body.push(head)
    if(!this.growing){
      // TODO: change this to DLL instead of array for O(1) shift
      this.body.shift()
    }
    this.growing = false
  }

  eat(pos){
    let head = this.body[this.body.length - 1]
    if(head.x === pos.x && head.y == pos.y){
      this.growing = true
      // this.mode = "usb-b"
      return true
    }
    return false
  }

  render() {
    for(let i=0;i<this.body.length;i++){
      let seg = this.body[i]
      let isHead = i === this.body.length - 1
      if(this.mode === "usb-c"){
        this.drawUSBC(seg.x,seg.y,isHead)
      }
    }
  }

  drawUSBC(x, y, isHead) {
    this.p5.fill(150)
    this.p5.rect(x+4, y+ 6, 12, 8, 4)
    this.p5.fill(80)
    this.p5.rect(x+8,y+8, 4, 4)
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
function SnakeGame() {
  const walker = useRef(null);
  const perlinNoise = useRef(null);
  const snakeBoard = useRef(null);
  const setup = (p5, canvasParentRef) => {
    // console.dir(canvasParentRef)
    if(p5Instance) p5Instance.remove();
    p5.createCanvas(canvasParentRef.clientWidth, canvasParentRef.clientHeight).parent(canvasParentRef)
    // walker.current = new Walker(p5);
    snakeBoard.current = new SnakeBoard(p5);
    p5Instance = p5;
    // perlinNoise.current = drawPerlinNoise(p5);
  };

  const draw = (p5) => {
    p5.frameRate(30);
    p5.background(250);
    // p5.ellipse(50,100,100)
    p5.stroke(0)
    // walker.current.step();
    // walker.current.render();
    // drawRandomGaussian(p5)
    // perlinNoise.current.draw()
    snake.current.update()
    snake.current.render()


  };

  return (
    <Sketch setup={setup} draw={draw} />
  )
}

export default SnakeGame;
