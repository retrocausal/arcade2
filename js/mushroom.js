class Mushroom {
  constructor(slot) {
    this.avatar = "images/mushroom.png";
    this.slot = slot;
    this.slot.occupy(this.avatar);
    this.slot.isFood = true;
  }
  vanish() {
    this.slot.isFood = false;
    this.slot.vacate();
  }
}

export default Mushroom;
