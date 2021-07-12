class Enemy {
  constructor(slot) {
    this.avatar = "images/enemy-bug.png";
    this.slot = slot;
    this.slot.occupy(this.avatar);
    this.slot.isEnemy = true;
  }
  vanish() {
    this.slot.isEnemy = false;
    this.slot.vacate();
  }
}

export default Enemy;
