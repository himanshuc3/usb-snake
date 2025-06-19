import { DIRECTION } from "../helper/constants";

class SnakeBoard {
  constructor(p5) {
    this.p5 = p5;

    this.grid = {
      rows: 50,
      cols: 50,
      cellSize: 20,
    };

    this.snake = new Snake(this.p5, this.grid);
  }

  update() {
    this.snake.update();
  }

  render() {
    this.p5.background(250);
    this.p5.rect(0,0,this.grid.cols * this.grid.cellSize, this.grid.rows * this.grid.cellSize);

    // this.p5.scale(
    //   this.p5.width / this.grid.cols,
    //   this.p5.height / this.grid.rows
    // );
    this.snake.render();
  }
}

class Snake {
  constructor(p5, grid) {
    this.p5 = p5;
    this.grid = grid;
    this.setup();
    // this.growing = false;
    this.mode = "usb-c";
  }

  setDirection(direction){// Collision with itself
    switch(direction){
      case DIRECTION.UP:
        if(this.direction === DIRECTION.DOWN || this.direction === DIRECTION.UP) return; // Prevent reversing
        this.speed.set(0, -1);
        this.direction = DIRECTION.UP;
        break;
      case DIRECTION.DOWN:
        if(this.direction === DIRECTION.UP || this.direction === DIRECTION.DOWN) return; // Prevent reversing
        this.speed.set(0, 1);
        this.direction = DIRECTION.DOWN;
        break;
      case DIRECTION.LEFT:
        if(this.direction === DIRECTION.RIGHT || this.direction === DIRECTION.LEFT) return; // Prevent reversing
        this.speed.set(-1, 0);
        this.direction = DIRECTION.LEFT;
        break;
      case DIRECTION.RIGHT:
        if(this.direction === DIRECTION.LEFT || this.direction === DIRECTION.RIGHT) return; // Prevent reversing
        this.speed.set(1, 0);
        this.direction = DIRECTION.RIGHT;
        break;
    }
  }

  setup() {
    this.body = Array.apply(null, Array(10)).map((el, id) => 
      this.p5.createVector(id, this.grid.rows / 2)
)

    this.speed = this.p5.createVector(1, 0);
    this.direction = DIRECTION.RIGHT;
  }

  isColliding() {
    return this.isCollidingWithWall() || this.isCollidingWithSelf();
  }

  isCollidingWithSelf(){
    let head = this.getHead()

    let segmentsAfterHead = this.body.slice(0, this.body.length - 1);
    for (let segment of segmentsAfterHead) {
      if (segment.equals(head)) {
        return true; 
      }
    }
    return false
  }

  getHead(){
    return this.body[this.body.length - 1];
  }

  isCollidingWithWall() {
    let head = this.getHead();
    return (
      head.x < 0 ||
      head.x >= this.grid.cols ||
      head.y < 0 ||
      head.y >= this.grid.rows
    );
  }

  update() {
    let head = this.getHead().copy();
    head.add(this.speed);

    this.body.push(head);
    this.body.shift();
    if(this.isColliding()) {
      this.setup(); // Reset the snake if it collides with wall or itself
      return;
    }
    // if (!this.growing) {
    //   // TODO: change this to DLL instead of array for O(1) shift
    //   this.body.shift();
    // }
    // this.growing = false;
  }

  drawUSBCPlug() {
    // Outer metal shell
    this.p5.fill(80);
    this.p5.stroke(30);
    this.p5.strokeWeight(2);
    this.p5.rect(20, 15, 60, 30, 10);

    // Inner black insulation
    this.p5.fill(20);
    this.p5.noStroke();
    this.p5.rect(30, 23, 40, 14, 3);

    // Pins
    this.p5.fill(250, 204, 0); // gold pins
    for (let i = 0; i < 4; i++) {
      this.p5.rect(32 + i * 10, 25, 4, 10);
    }
  }

  myUSBCPlug(x, y) {
    this.p5.fill(255);
    this.p5.rect(100, 100, 30, 20, 0, 0, 5, 5);
    this.p5.rect(90, 60, 50, 40, 0, 0, 5, 5);
    this.p5.rect(90, 50, 50, 20, 10, 10, 10, 10);
    this.p5.rect(92, 35, 45, 30, 10, 10, 10, 10);
  }

  eat(pos) {
    let head = this.body[this.body.length - 1];
    if (head.x === pos.x && head.y == pos.y) {
      this.growing = true;
      // this.mode = "usb-b"
      return true;
    }
    return false;
  }

  render() {
    this.p5.fill(0);
    this.p5.stroke(96, 255, 64);
    // this.p5.beginShape();
    for (let segment of this.body) {
      this.p5.rect(segment.x*this.grid.cellSize, segment.y*this.grid.cellSize, this.grid.cellSize, this.grid.cellSize);
    }
    // this.p5.endShape();
    // this.myUSBCPlug(100, 100);
    // for (let i = 0; i < this.body.length; i++) {
    //   let seg = this.body[i];
    //   let isHead = i === this.body.length - 1;
    //   if (this.mode === "usb-c") {
    //     this.drawUSBCPlug();
    //     // this.drawUSBC(seg.x,seg.y,isHead)
    //   }
    // }
  }

  drawUSBC(x, y, isHead) {
    this.p5.fill(150);
    this.p5.rect(x + 4, y + 6, 12, 8, 4);
    this.p5.fill(80);
    this.p5.rect(x + 8, y + 8, 4, 4);
  }
}

export default SnakeBoard;
