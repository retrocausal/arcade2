import { layoutGrid } from "./view-utils.js";
import Enemy from "./enemy.js";
import { shuffle } from "./utils.js";
import Mushroom from "./mushroom.js";
const Game = (function ArcadeGame() {
  let state = new Map();
  return {
    set won(bool) {
      if (bool === true) {
        this.lives = 3;
        this.reset();
        this.protagonist.interval -= 100;
        if (this.protagonist.interval < 500) {
          this.protagonist.interval = 501;
        }
        this.start();
      }
    },
    set lost(bool) {
      if (bool === true) {
        this.lives--;
        if (this.lives > 0) {
          this.protagonist.slot = { row: 0, col: 0 };
          this.protagonist.interval = 1000;
          this.reset();
          this.start();
        } else {
          //end game
        }
      }
    },

    reset() {
      this.protagonist.direction = false;
      this.enemies.forEach((e) => e.vanish());
      this.food.vanish();
    },

    render(root) {
      root.innerHTML = "";
      root.appendChild(this.layout);
      root.classList.add("show");
    },
    configure(protagonist, grid) {
      const [layout, slots] = layoutGrid(grid);
      this.layout = layout;
      this.slots = slots;
      this.protagonist = protagonist;
      this.maxXCoordinate = grid.cols - 1;
      this.maxYCoordinate = grid.rows - 1;
      this.minXCoordinate = 0;
      this.minYCoordinate = 0;
      this.numberOfEnemies = Math.max(grid.rows, grid.cols);
      this.lives = 3;
    },
    start() {
      const { row, col } = this.protagonist.slot;
      this.unavailableSlots = [
        `${row + 1}-${col}`,
        `${row + 2}-${col}`,
        `${row}-${col + 1}`,
        `${row}-${col + 2}`,
        `${row + 1}-${col + 1}`,
        `${row + 2}-${col + 1}`,
      ];

      this.food = false;
      this.enemies = [];
      this.protagonist.render();
      this.addMushroom();
      this.makeEnemies();
      this.protagonist.play();
    },

    makeEnemies() {
      for (let i = 0; i < this.numberOfEnemies; i++) {
        const availableSlots = this.slots.filter((slot) => {
          return this.unavailableSlots.indexOf(slot.id) === -1;
        });
        const index = shuffle(availableSlots.length - 1, 1);
        const slot = availableSlots[index];
        this.unavailableSlots.push(`${slot.id}`);
        this.enemies.push(new Enemy(slot));
      }
    },
    addMushroom() {
      const availableSlots = this.slots.filter((slot) => {
        return this.unavailableSlots.indexOf(slot.id) === -1;
      });
      const index = shuffle(availableSlots.length, 1);
      const slot = availableSlots[index];
      this.unavailableSlots.push(`${slot.id}`);
      this.food = new Mushroom(slot);
    },

    getSlot(id) {
      return (
        this.slots.filter((s) => s.id === `${id.row}-${id.col}`)[0] || false
      );
    },
    state,
  };
})();

export function useReducer(initialState, reducer) {
  const hasReduction = Game.state.has(reducer) || false;
  if (!hasReduction) {
    let mutatableState = JSON.parse(JSON.stringify(initialState));
    const dispatch = async function (action) {
      const newState = await new Promise((resolve) =>
        resolve(reducer(mutatableState, action))
      );
      Game.state.set(reducer, { state: newState });
      return newState;
    };
    Object.assign(Game.state.get(reducer), { dispatch });
  }
  return [Game.state.get(reducer).state, Game.state.get(reducer).dispatch];
}

export default Game;
