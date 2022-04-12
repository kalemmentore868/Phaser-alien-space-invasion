import Phaser from "./lib/phaser.js";

export default class Spaceship extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, level) {
    super(scene, x, y, texture);
    this.rotation = 3.15;
    this.num1 = Math.floor(Math.random() * 26);
    this.num2 = Math.floor(Math.random() * 9);
    level === 1
      ? (this.expression = `${this.num1} + ${this.num2}`)
      : (this.expression = `${this.num1} - ${this.num2}`);

    level === 1
      ? (this.answer = this.num1 + this.num2)
      : (this.answer = this.num1 - this.num2);

    this.speed = Math.random() / 2 + 0.3;
  }

  switchNumbers() {
    if (this.num1 <= this.num2) {
      const smallerNum = this.num1;
      this.num1 = this.num2;
      this.num2 = smallerNum;
    }
  }

  getExpression(operation) {
    if (operation === "+") {
      this.expression = `${this.num1} + ${this.num2}`;
    } else if (operation === "-") {
      this.switchNumbers();

      this.expression = `${this.num1} - ${this.num2}`;
    }
  }

  getAnswer(level) {
    level === 1
      ? (this.answer = this.num1 + this.num2)
      : (this.answer = this.num1 - this.num2);
  }

  newNumber() {
    this.num1 = Math.floor(Math.random() * 26);
    this.num2 = Math.floor(Math.random() * 9);
    this.switchNumbers();
  }

  newSpeed() {
    this.speed = Math.random() / 2 + 0.3;
  }

  resetShipHit(level) {
    this.newNumber();
    this.getAnswer(level);
    this.newSpeed();
    level === 1 ? this.getExpression("+") : this.getExpression("-");
    this.y = 10;
  }

  resetShipMiss(level) {
    this.newNumber();
    this.newSpeed();
    this.getAnswer();
    level === 1 ? this.getExpression("+") : this.getExpression("-");
  }
}
