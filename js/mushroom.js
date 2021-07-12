class Mushroom {
  constructor(slot) {
    this.avatar = "images/mushroom.png";
    this.slot = slot;
    this.slot.occupy(this.avatar);
    this.slot.hasFood = true;
  }
  vanish() {
    this.slot.hasFood = false;
    this.slot.vacate();
  }
}

export default Mushroom;
