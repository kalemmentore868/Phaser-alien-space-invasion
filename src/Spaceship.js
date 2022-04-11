import Phaser from "./lib/phaser.js";

export default class Spaceship extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.rotation = 3.15;
    this.num1 = Math.floor(Math.random() * 26);
    this.num2 = Math.floor(Math.random() * 9);
    this.expression = `${this.num1} + ${this.num2}`;
    this.answer = this.num1 + this.num2;
    this.speed = Math.random() / 2 + 0.3;
  }

  getExpression(operation) {
    if (operation === "+") {
      this.expression = `${this.num1} + ${this.num2}`;
    } else if (operation === "-") {
      this.num1 >= this.num2
        ? (this.expression = `${this.num1} - ${this.num2}`)
        : (this.expression = `${this.num2} - ${this.num1}`);
    }
  }

  getAnswer() {
    this.answer = this.num1 + this.num2;
  }

  newNumber() {
    this.num1 = Math.floor(Math.random() * 26);
    this.num2 = Math.floor(Math.random() * 9);
  }

  resetShipHit() {
    this.newNumber();
    this.getAnswer();
    this.getExpression("+");
    this.y = 10;
  }

  resetShipMiss() {
    this.newNumber();
    this.getAnswer();
    this.getExpression("+");
  }
}
