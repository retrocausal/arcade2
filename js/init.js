import Game from "./index.js";
import Mario from "./mario.js";
document.addEventListener(
  "readystatechange",
  (function Arcade() {
    let grid = {
      set cols(v) {
        this._cols = v;
        const num = 100 / v;
        this.unitColWidth = parseFloat(
          (Math.round(num * 100) / 100).toFixed(2)
        );
      },
      set rows(v) {
        this._rows = v;
        const num = 100 / v;
        this.unitRowHeight = parseFloat(
          (Math.round(num * 100) / 100).toFixed(2)
        );
      },
      get rows() {
        return this._rows;
      },
      get cols() {
        return this._cols;
      },
    };
    return function init(e) {
      if (e.target.readyState === "complete") {
        const form = document.querySelector("#params");
        form.onsubmit = (e) => {
          e.preventDefault();
          const data = Object.fromEntries(new FormData(e.target).entries());
          try {
            const { cols, rows } = data;
            if (cols && rows) {
              if (cols > 11 || rows > 11 || cols < 5 || rows < 5) {
                throw new Error("please enter a number between 5 and 11");
              }
            } else {
              throw new Error("Invalid input");
            }
            grid.rows = rows;
            grid.cols = cols;
            form.classList.add("hide");
            const protagonist = new Mario();
            Game.configure(protagonist, grid);
            Game.render(document.querySelector("#game"));
            Game.start();
          } catch (error) {
            document.querySelector("#inputValidationException").innerHTML =
              error.message;
          }
        };
      }
    };
  })()
);
