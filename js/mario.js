import Game, { useReducer } from "./index.js";

class Mario {
  constructor() {
    this.avatar = "images/mario.png";
    this.slot = {
      row: 0,
      col: 0,
    };
    this.direction = false;
    this.interval = 1000;
  }
  render() {
    if (this.home) this.home.vacate();
    this.home = Game.getSlot(this.slot);
    this.home.occupy(this.avatar);
  }
  play() {
    this.won = false;
    this.lost = false;
    document.addEventListener(
      "keydown",
      (e) => {
        switch (e.key) {
          case "ArrowRight":
            this.direction = "right";
            break;
          case "ArrowLeft":
            this.direction = "left";
            break;
          case "ArrowDown":
            this.direction = "down";
            break;
          case "ArrowUp":
            this.direction = "up";
            break;
          default:
            break;
        }
        this.animate();
      },
      true
    );
  }

  move() {
    switch (this.direction) {
      case "right":
        if (this.slot.col < Game.maxXCoordinate) {
          this.slot.col += 1;
        } else {
          this.direction = "left";
          this.elapsed = this.interval;
        }
        break;
      case "left":
        if (this.slot.col > Game.minXCoordinate) {
          this.slot.col -= 1;
        } else {
          this.direction = "right";
          this.elapsed = this.interval;
        }
        break;
      case "down":
        if (this.slot.row < Game.maxYCoordinate) {
          this.slot.row += 1;
        } else {
          this.direction = "up";
          this.elapsed = this.interval;
        }
        break;
      case "up":
        if (this.slot.row > Game.minYCoordinate) {
          this.slot.row -= 1;
        } else {
          this.direction = "down";
          this.elapsed = this.interval;
        }
        break;
      default:
        break;
    }
    this.render();
    if (this.home.hasEnemy) {
      this.lost = true;
    } else {
      if (this.home.hasFood) {
        this.won = true;
      }
    }
  }

  animate() {
    const now = Date.now();
    this.then = this.then || now;
    const elapsed = now - this.then;
    this.elapsed = (this.elapsed || 0) + elapsed;
    this.then = now;
    const frame = () => {
      this.anFrame = window.requestAnimationFrame(() => {
        if (this.elapsed >= this.interval) {
          this.elapsed = 0;
          this.move();
        }
        return this.animate();
      });
    };
    if (this.won || this.lost) {
      this.anFrame = window.cancelAnimationFrame(this.anFrame);
      const finish = this.won ? "won" : "lost";
      Game[finish] = true;
    } else return frame();
  }
}
export default Mario;
