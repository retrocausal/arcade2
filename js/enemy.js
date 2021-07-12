class Enemy {
  constructor(slot) {
    this.avatar = "images/enemy-bug.png";
    this.slot = slot;
    this.slot.occupy(this.avatar);
    this.slot.hasEnemy = true;
  }
  vanish() {
    this.slot.hasEnemy = false;
    this.slot.vacate();
  }
}

export default Enemy;
