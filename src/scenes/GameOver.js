import Phaser from "../lib/phaser.js";

export default class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  create() {
    this.add.text(150, 300, "Game Over", {
      font: "80px Arial",
      fill: "#ffffff",
      backgroundColor: "black",
      align: "center",
    });

    this.playAgain = this.add.text(100, 150, "Press Spacebar to Start Again", {
      font: "40px Arial",
      fill: "#ffffff",
      backgroundColor: "Black",
      align: "center",
    });

    this.input.keyboard.on(
      "keydown-SPACE",
      function () {
        this.scene.start("GameLv1");
      },
      this
    );
  }
}
