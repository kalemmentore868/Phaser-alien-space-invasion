import Phaser from "../lib/phaser.js";
import Spaceship from "../Spaceship.js";
import Bullet from "../Bullet.js";
import GameOver from "./GameOver.js";

export default class GameLv2 extends Phaser.Scene {
  constructor() {
    super("GameLv2");
    this.ships;
    this.cannon;
    this.bullet;
    this.hits = {};
    this.misses = {};
    this.time;
    this.clearTimer;
    this.level;
  }

  init(data) {
    this.hits = { hitScore: data.hits1 };
    this.misses = { hitScore: data.miss1 };
  }

  preload() {
    this.load.image("background", "assets/stars.jpg");
    this.load.image("ships", "assets/spaceship.png");
    this.load.image("tank", "assets/tank.png");
    this.load.image("bullet", "assets/bullet-2.png");
  }

  create() {
    this.add.image(240, 320, "background");

    this.level = 2;
    this.add.text(700, 600, `Level${this.level}`, {
      font: "16px Arial",
      fill: "#ffffff",
      backgroundColor: "black",
      align: "center",
      fixedWidth: "60",
    });

    this.time.timeLeft = 30;
    this.time.text = this.add.text(350, 300, this.time.timeLeft, {
      font: "40px Arial",
      fill: "#ffffff",
      backgroundColor: "black",
      align: "center",
      fixedWidth: "60",
    });

    this.hits.text = this.add.text(50, 50, `Hits: ${this.hits.hitScore}`, {
      font: "32px Arial",
      fill: "#ffffff",
      backgroundColor: "black",
      align: "center",
    });

    this.misses.text = this.add.text(650, 50, `Miss: ${this.misses.hitScore}`, {
      font: "32px Arial",
      fill: "#ffffff",
      backgroundColor: "black",
      align: "center",
    });

    this.cannon = this.add.image(100, 600, "tank");
    this.bullet = new Bullet(this, 0, 0, "bullet");
    this.add.existing(this.bullet);
    this.physics.add.existing(this.bullet);
    const randomIndex = Math.floor(Math.random() * 4);

    this.ships = this.physics.add.group({
      classType: Spaceship,
    });

    for (let i = 0; i < 5; i++) {
      const ship = this.ships.get(100 + 150 * i, 10, "ships", this.level);
      ship.text = this.add.text(ship.x - 35, ship.y - 8, ship.expression, {
        font: "24px Arial",
        fill: "#ffffff",
        backgroundColor: "black",
        align: "center",
        fixedWidth: "80",
      });
    }

    this.cannon.answer = this.ships.children.entries[randomIndex].answer;
    this.cannon.text = this.add.text(
      this.cannon.x - 95,
      this.cannon.y - 15,
      this.cannon.answer,
      {
        font: "32px Arial",
        fill: "#ffffff",
        backgroundColor: "black",
        align: "center",
        fixedWidth: "60",
        fixedHeight: "40",
      }
    );

    this.physics.add.overlap(
      this.ships,
      this.bullet,
      function (bullet, ship) {
        bullet.resetBullet();
        if (ship.answer === this.cannon.answer) {
          this.updateHits();
          this.resetAllShipsHit();
        } else {
          this.updateMiss();
          this.resetAllShipsMiss();
        }
        const randomIndex = Math.floor(Math.random() * 4);
        this.cannon.answer = this.ships.children.entries[randomIndex].answer;
        this.cannon.text.setText(this.cannon.answer);
      },
      undefined,
      this
    );

    this.input.keyboard.on(
      "keydown-SPACE",
      () => {
        this.bullet.shootBullet(this.cannon.x, this.cannon.y);
        setTimeout(() => {
          this.bullet.isFired = false;
        }, 5000);
      },
      this
    );

    this.decrementTimer();
  }

  updateHits() {
    this.hits.hitScore++;
    this.hits.text.setText(`Hits: ${this.hits.hitScore}`);
  }

  updateMiss() {
    this.misses.hitScore++;
    this.misses.text.setText(`Miss: ${this.misses.hitScore}`);
  }

  decrementTimer() {
    this.clearTimer = setInterval(() => {
      this.time.timeLeft--;
      this.time.text.setText(this.time.timeLeft);
    }, 1000);
  }

  update() {
    this.ships.children.iterate((ship) => {
      ship.y += ship.speed;
      ship.text.y += ship.speed;

      if (ship.y >= 600) {
        clearInterval(this.clearTimer);
        this.scene.start("GameOver");
      }
    });

    const cursors = this.input.keyboard.createCursorKeys();

    if (cursors.right.isDown) {
      this.cannon.x += 8;
      this.cannon.text.x += 8;
    } else if (cursors.left.isDown) {
      this.cannon.x -= 8;
      this.cannon.text.x -= 8;
    }
  }

  resetAllShipsHit() {
    this.ships.children.iterate((ship) => {
      ship.resetShipHit(this.level);
      ship.text.y = ship.y;
      ship.text.setText(ship.expression);
    });
  }

  resetAllShipsMiss() {
    this.ships.children.iterate((ship) => {
      ship.resetShipMiss(this.level);
      ship.text.setText(ship.expression);
    });
  }
}
