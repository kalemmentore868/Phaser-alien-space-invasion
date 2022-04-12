import Phaser from "./lib/phaser.js";
import GameLv1 from "./scenes/Game.js";
import GameOver from "./scenes/GameOver.js";
import GameLv2 from "./scenes/GameLv2.js";

export default new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 640,

  scene: [GameLv1, GameLv2, GameOver],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
});
