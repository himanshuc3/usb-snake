import { DIRECTION } from "../helper/constants";

class SnakeBoard {
  constructor(p5) {
    this.p5 = p5;

    const defaultCellSize = 15;
    this.grid = {
      rows: this.p5.height / defaultCellSize,
      cols: this.p5.width / defaultCellSize,
      cellSize: defaultCellSize,
    };

    this.snake = new Snake(this.p5, this.grid);
  }

  update() {
    this.snake.update();
  }

  render() {
    this.p5.stroke(14,17,23);
    this.p5.strokeWeight(3);

    for (let i = 0; i < this.grid.cols; i++) {
      for (let j = 0; j < this.grid.rows; j++) {
        this.p5.fill(21, 27, 35);
        this.p5.rect(
          i * this.grid.cellSize,
          j * this.grid.cellSize,
          this.grid.cellSize,
          this.grid.cellSize,
          3
        );
      }
    }

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
  }

  setDirection(direction) {
    // Collision with itself
    switch (direction) {
      case DIRECTION.UP:
        if (
          this.direction === DIRECTION.DOWN ||
          this.direction === DIRECTION.UP
        )
          return; // Prevent reversing
        this.speed.set(0, -1);
        this.direction = DIRECTION.UP;
        break;
      case DIRECTION.DOWN:
        if (
          this.direction === DIRECTION.UP ||
          this.direction === DIRECTION.DOWN
        )
          return; // Prevent reversing
        this.speed.set(0, 1);
        this.direction = DIRECTION.DOWN;
        break;
      case DIRECTION.LEFT:
        if (
          this.direction === DIRECTION.RIGHT ||
          this.direction === DIRECTION.LEFT
        )
          return; // Prevent reversing
        this.speed.set(-1, 0);
        this.direction = DIRECTION.LEFT;
        break;
      case DIRECTION.RIGHT:
        if (
          this.direction === DIRECTION.LEFT ||
          this.direction === DIRECTION.RIGHT
        )
          return; // Prevent reversing
        this.speed.set(1, 0);
        this.direction = DIRECTION.RIGHT;
        break;
    }
  }

  setup() {
    this.body = Array.apply(null, Array(10)).map((el, id) =>
      this.p5.createVector(id, this.grid.rows / 2)
    );

    this.speed = this.p5.createVector(1, 0);
    this.direction = DIRECTION.RIGHT;
  }

  isColliding() {
    return this.isCollidingWithWall() || this.isCollidingWithSelf();
  }

  isCollidingWithSelf() {
    let head = this.getHead();

    let segmentsAfterHead = this.body.slice(0, this.body.length - 1);
    for (let segment of segmentsAfterHead) {
      if (segment.equals(head)) {
        return true;
      }
    }
    return false;
  }

  getHead() {
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
    if (this.isColliding()) {
      this.setup(); // Reset the snake if it collides with wall or itself
      return;
    }
    // if (!this.growing) {
    //   // TODO: change this to DLL instead of array for O(1) shift
    //   this.body.shift();
    // }
    // this.growing = false;
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
    this.p5.stroke(30, 41, 59);
    this.p5.strokeWeight(3);
    
    this.body.forEach((segment, i) => {
      this.p5.fill(255, 204, 0)
        this.p5.rect(
          segment.x * this.grid.cellSize ,
          segment.y * this.grid.cellSize - 5,
          this.grid.cellSize,
          this.grid.cellSize,
          3
        );
    });
  }
}

export default SnakeBoard;
