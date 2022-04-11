import Phaser from "./lib/phaser.js";

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    this.isFired = false;
    this.visible = false;
  }

  shootBullet(x, y) {
    if (this.isFired === false) {
      this.isFired = true;
      this.visible = true;
      this.setPosition(x, y);
      this.setVelocityY(-250);
    }
  }

  resetBullet() {
    this.isFired = false;
    this.visible = false;
    this.setVelocityY(0);
    this.setPosition(0, 0);
  }
}
