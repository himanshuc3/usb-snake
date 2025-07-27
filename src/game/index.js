import { DIRECTION } from "../helper/constants";
import { githubColors } from "../common/constants";

const SNAKE_STATUS = {
  EATING: "EATING",
  MOVING: "MOVING",
  DEAD: "DEAD",
};

class SnakeBoard {
  constructor(p5, pointsContext) {
    this.p5 = p5;
    this.pointsContext = pointsContext;

    const defaultCellSize = 15;
    this.grid = {
      rows: this.p5.height / defaultCellSize,
      cols: this.p5.width / defaultCellSize,
      cellSize: defaultCellSize,
    };

    this.gameOver = false;

    this.snake = new Snake(this.p5, this.grid);
    this.food = new Food(this.p5, this.grid);
  }

  update() {
    const status = this.snake.update(this.food.getPosition());

    if (status === SNAKE_STATUS.EATING) {
      this.pointsContext.addPoints(this.food.getContributions());
      this.food.update();
    } else if (status === SNAKE_STATUS.DEAD) {
      this.gameOver = true;
    }
  }

  showGameOver() {
    const g = [
      // top horizontal
      this.p5.createVector(4, 5),
      this.p5.createVector(5, 5),
      this.p5.createVector(6, 5),
      // left vertical
      this.p5.createVector(3, 6),
      this.p5.createVector(3, 7),
      this.p5.createVector(3, 8),
      // bottom horizontal
      this.p5.createVector(4, 9),
      this.p5.createVector(5, 9),
      this.p5.createVector(6, 9),
      // right vertical
      this.p5.createVector(7, 8),
      this.p5.createVector(7, 7),
      // middle horizontal
      this.p5.createVector(6, 7),
      this.p5.createVector(5, 7),
    ];

    const a = [
      // left vertical
      this.p5.createVector(9, 5),
      this.p5.createVector(9, 6),
      this.p5.createVector(9, 7),
      this.p5.createVector(9, 8),
      this.p5.createVector(9, 9),
      // right slant
      this.p5.createVector(10, 5),
      this.p5.createVector(11, 5),
      this.p5.createVector(10, 7),
      this.p5.createVector(11, 6),
      this.p5.createVector(11, 7),
      this.p5.createVector(11, 8),
      this.p5.createVector(11, 9),
    ];

    const m = [
      // left vertical
      this.p5.createVector(13, 5),
      this.p5.createVector(13, 6),
      this.p5.createVector(13, 7),
      this.p5.createVector(13, 8),
      // horizontal
      this.p5.createVector(14, 5),
      this.p5.createVector(15, 5),
      this.p5.createVector(16, 5),
      // middle vertical
      this.p5.createVector(15, 6),
      this.p5.createVector(15, 7),
      // right vertical
      this.p5.createVector(17, 5),
      this.p5.createVector(17, 6),
      this.p5.createVector(17, 7),
      this.p5.createVector(17, 8),
    ];

    const e = [
      // left vertical
      this.p5.createVector(19, 5),
      this.p5.createVector(19, 6),
      this.p5.createVector(19, 7),
      this.p5.createVector(19, 8),
      this.p5.createVector(19, 9),
      // horizontal
      this.p5.createVector(20, 5),
      this.p5.createVector(21, 5),
      this.p5.createVector(22, 5),
      // middle vertical
      this.p5.createVector(20, 7),
      this.p5.createVector(21, 7),
      this.p5.createVector(22, 7),
      // right vertical
      this.p5.createVector(20, 9),
      this.p5.createVector(21, 9),
      this.p5.createVector(22, 9),
    ];
    const o = [
      // left vertical
      this.p5.createVector(4, 11),
      this.p5.createVector(5, 11),
      this.p5.createVector(6, 11),

      this.p5.createVector(3, 12),
      this.p5.createVector(3, 13),
      this.p5.createVector(3, 14),

      this.p5.createVector(4, 15),
      this.p5.createVector(5, 15),
      this.p5.createVector(6, 15),

      this.p5.createVector(7, 12),
      this.p5.createVector(7, 13),
      this.p5.createVector(7, 14),
    ];

    const v = [
      // left vertical
      this.p5.createVector(9, 11),
      this.p5.createVector(9, 12),
      this.p5.createVector(9, 13),
      this.p5.createVector(9, 14),
      this.p5.createVector(9, 15),

      this.p5.createVector(10, 15),
      this.p5.createVector(10, 14),
      this.p5.createVector(11, 13),
      this.p5.createVector(12, 12),
      this.p5.createVector(13, 11),
    ];

    const ee = [
      this.p5.createVector(15, 11),
      this.p5.createVector(15, 12),
      this.p5.createVector(15, 13),
      this.p5.createVector(15, 14),
      this.p5.createVector(15, 15),
      // horizontal
      this.p5.createVector(16, 11),
      this.p5.createVector(17, 11),
      // middle vertical
      this.p5.createVector(16, 13),
      this.p5.createVector(17, 13),
      // right vertical
      this.p5.createVector(16, 15),
      this.p5.createVector(17, 15),
    ];
    const r = [
      this.p5.createVector(19, 12),
      this.p5.createVector(19, 13),
      this.p5.createVector(19, 14),
      this.p5.createVector(19, 15),

      this.p5.createVector(20, 11),
      this.p5.createVector(21, 11),

      this.p5.createVector(22, 12),
      this.p5.createVector(22, 13),

      this.p5.createVector(20, 13),
      this.p5.createVector(21, 13),

      this.p5.createVector(21, 14),
      this.p5.createVector(22, 15),
    ];

    const characters = [g, a, m, e, o, v, ee, r];

    for (let character of characters) {
      for (let i = 0; i < character.length; i++) {
        const x = character[i].x,
          y = character[i].y;
        // this.p5.fill(githubColors[Math.floor(Math.random()*githubColors.length)]);
        this.p5.fill(githubColors[(x + y) % githubColors.length]);
        this.p5.rect(
          (x+8) * this.grid.cellSize,
          (y+2) * this.grid.cellSize ,
          this.grid.cellSize,
          this.grid.cellSize,
          3
        );
      }
    }
  }

  render() {
    this.p5.stroke(14, 17, 23);
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
    if (!this.gameOver) {
      this.food.render();
      this.snake.render();
    } else {
      this.showGameOver();
    }

    // this.p5.scale(
    //   this.p5.width / this.grid.cols,
    //   this.p5.height / this.grid.rows
    // );
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

  grow() {
    this.body.push(this.body[this.body.length - 1].copy());
  }

  setup() {
    this.body = Array.apply(null, Array(10)).map((el, id) =>
      this.p5.createVector(id, Math.floor(this.grid.rows / 2))
    );

    this.speed = this.p5.createVector(1, 0);
    this.direction = DIRECTION.RIGHT;
  }

  isColliding() {
    return this.isCollidingWithWall() || this.isCollidingWithSelf();
  }

  canEat(headPos, foodPos) {
    return headPos.x === foodPos.x && headPos.y == foodPos.y;
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

  update(foodPos) {
    let status = SNAKE_STATUS.MOVING;
    let head = this.getHead().copy();
    head.add(this.speed);

    this.body.push(head);
    if (!this.canEat(head, foodPos)) {
      this.body.shift();
      status = SNAKE_STATUS.MOVING;
    } else {
      status = SNAKE_STATUS.EATING;
    }

    if (this.isColliding()) {
      this.setup(); // Reset the snake if it collides with wall or itself
      return SNAKE_STATUS.DEAD;
    }
    return status;
  }

  render() {
    this.p5.stroke(30, 41, 59);
    this.p5.strokeWeight(2);

    this.body.forEach((segment, i) => {
      // Calculate gradient: head (last segment) = white, tail (first segment) = grey
      const totalSegments = this.body.length;
      const segmentIndex = i; // Reverse index so head is highest
      const intensity = segmentIndex / (totalSegments - 1); // 0 to 1, where 1 is head

      // Create gradient from white (255, 255, 255) to grey (120, 120, 120)
      const whiteValue = 255;
      const greyValue = 120;
      const currentColor = Math.floor(
        greyValue + (whiteValue - greyValue) * intensity
      );

      // Apply gradient color
      this.p5.fill(currentColor, currentColor, currentColor);

      this.p5.rect(
        segment.x * this.grid.cellSize,
        segment.y * this.grid.cellSize,
        this.grid.cellSize,
        this.grid.cellSize,
        3
      );
    });
  }
}

function getFoodColor(contributions) {
  if (contributions < 3) {
    return githubColors[0];
  } else if (contributions < 6) {
    return githubColors[1];
  } else if (contributions < 8) {
    return githubColors[2];
  } else {
    return githubColors[3];
  }
}

class Food {
  constructor(p5, grid) {
    this.p5 = p5;
    this.grid = grid;
    this.position = this.p5.createVector(
      Math.floor(Math.random() * this.grid.cols),
      Math.floor(Math.random() * this.grid.rows)
    );
    this.contributions = Math.floor(Math.random() * 10) + 1;
  }

  update() {
    this.position = this.p5.createVector(
      Math.floor(Math.random() * this.grid.cols),
      Math.floor(Math.random() * this.grid.rows)
    );
    this.contributions = Math.floor(Math.random() * 10) + 1;
  }

  getPosition() {
    return this.position;
  }

  getContributions() {
    return this.contributions;
  }

  render() {
    this.p5.fill(getFoodColor(this.contributions));
    this.p5.rect(
      this.position.x * this.grid.cellSize,
      this.position.y * this.grid.cellSize,
      this.grid.cellSize,
      this.grid.cellSize,
      3
    );
  }
}

export default SnakeBoard;
