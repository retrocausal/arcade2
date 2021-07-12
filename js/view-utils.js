class Slot {
  constructor(id, height, width) {
    this.height = height;
    this.width = width;
    this.id = id;
    this.isEnemy = false;
    this.isFood = false;
  }
  set id(id) {
    this._id = id;
    const coordinates = id.split("-").map((c) => parseFloat(c));
    this.row = coordinates[0];
    this.col = coordinates[1];
  }
  get id() {
    return this._id;
  }
  get css() {
    return `
      min-height: ${this.height}%;
      min-width: ${this.width}%;
      width: ${this.width}%;
      height: ${this.height}%;
      max-width: ${this.width}%;
      max-height: ${this.height}%;
    `;
  }
  get resident() {
    return document.getElementById(`${this.id}-resident`);
  }
  render(parent) {
    const layout = document.createElement("DIV");
    layout.setAttribute("id", this.id);
    layout.style.cssText = this.css;
    layout.classList.add("slot");
    const resident = document.createElement("DIV");
    resident.classList.add("resident");
    resident.setAttribute("id", `${this.id}-resident`);
    layout.appendChild(resident);
    parent.appendChild(layout);
  }
  vacate() {
    this.resident.style.cssText = `background-image: none;`;
  }
  occupy(avatar) {
    this.resident.style.cssText = `background-image: url(${avatar})`;
  }
}

export function layoutGrid(dimensions) {
  const { rows, cols, unitRowHeight, unitColWidth } = dimensions;
  const layout = document.createElement("DIV");
  let slots = [];
  layout.classList.add("main");
  for (let i = 0; i < rows; i++) {
    const row = document.createElement("DIV");
    row.classList.add("row");
    row.style.height = `${unitRowHeight}%`;
    row.setAttribute("id", `${i}`);
    for (let j = 0; j < cols; j++) {
      const slot = new Slot(`${i}-${j}`, 100, unitColWidth);
      slot.render(row);
      slots.push(slot);
    }
    layout.appendChild(row);
  }
  return [layout, slots];
}
