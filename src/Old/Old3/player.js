import Phaser, { LEFT, RIGHT } from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, "player-sprite", 0);
    this.scene.add.existing(this);
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.setScale(0.5);
    this.setCollideWorldBounds(true);
    //this.scene.cameras.main.startFollow(this);
    this.setVisible(true);
    this.keys = {
      duck: this.scene.input.keyboard.addKey([
        Phaser.Input.Keyboard.KeyCodes.S,
      ]),
      kick: this.scene.input.keyboard.addKey([
        Phaser.Input.Keyboard.KeyCodes.C,
      ]),
      
      push: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
      attackfist: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.X
      ),
      run: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
      clingToggle: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SHIFT
      ),
      walkLeft: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.A
      ),
      walkRight: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.D
      ),
      jump: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      crawl: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
      attachmentToggle: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.G
      ),
      primary: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.ONE
      ),
      secondary: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.TWO
      ),
      melee: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.THREE
      ),
      shinja1: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.FOUR
      ),
      shinja2: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.FIVE
      ),
      shinja3: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SIX
      ),
      shinja4: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SEVEN
      ),
      shinja5: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.EIGHT
      ),
      shinja6: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.NINE
      ),
      shinja7: this.scene.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.ZERO
      ),
    };
    this.canAttack = true;
    this.health = 22.5;
    this.exp = 0;
    this.isClinging = false;
    this.depth = 1.2;
    this.__ani_setup();
    this.experiancePoints();
    this.dir = ["left", "right"];
    this.spawnID = null;
    this.attackbox = this.scene.add.rectangle(this.x, this.y, 30, 10);
    this.scene.physics.add.existing(this.attackbox);
    this.attackbox.body.allowGravity = false;
    this.attackbox.setPosition(this.x, this.y);
    this.attackbox.body.setEnable(false);
    this.gunEquipped = true;
    this.damage = 0.5;
    this.hasMeleeWeapon = false;
    this.isPushing = false;
    this.hasDied = false;
    this.respawnPoint = { x: null, y: null };
  }
  experiancePoints() {
    this.text = this.scene.add.text(500, 500);
    this.text.setFill(0x6600ff);
  }
  __ani_setup() {
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player-sprite", {
        start: 0,
        end: 0,
      }),
      frameRate: 15,
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player-sprite", {
        start: 1,
        end: 3,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player-sprite", {
        start: 4,
        end: 6,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "punch",
      frames: this.anims.generateFrameNumbers("player-punch-sprite", {
        start: 1,
        end: 0,
      }),
      frameRate: 10,
    });
    /*this.anims.create({
        key: 'right-punch',
        frames: this.anims.generateFrameNumbers('player-punch-sprite', { start: 2, end: 3 }),
        frameRate: 10
    });*/
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("player-sprite", {
        start: 0,
        end: 0,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "duck-left",
      frames: this.anims.generateFrameNumbers("player-sprite", {
        start: 8,
        end: 8,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "duck",
      frames: this.anims.generateFrameNumbers("player-sprite", {
        start: 7,
        end: 7,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "duck-right",
      frames: this.anims.generateFrameNumbers("player-sprite", {
        start: 9,
        end: 9,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "cling-left",
      frames: this.anims.generateFrameNumbers("player-sprite", {
        start: 10,
        end: 10,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "cling-right",
      frames: this.anims.generateFrameNumbers("player-sprite", {
        start: 11,
        end: 11,
      }),
      frameRate: 10,
    });
  }
  controls_body_attack() {
    if (this.cursors.left.isDown || this.keys.walkLeft.isDown) {
      this.flipX = false;
    }
    if (this.cursors.right.isDown || this.keys.walkRight.isDown) {
      this.flipX = true;
    }
    if (
      Phaser.Input.Keyboard.JustDown(this.keys["attackfist"]) &&
      this.scene.player.canAttack == true
    ) {
      this.startTimer = this.scene.time.addEvent({
        delay: 200,
        repeat: 0,
        callback: function () {
          this.scene.player.canAttack = true;
          this.setFrame(0);
          this.attackbox.body.setEnable(false);
          this.attackbox.setVisible(false);
        },
        callbackScope: this,
      });
      this.attackbox.body.setEnable(true);
      this.attackbox.setPosition(this.x + 10, this.y);
      if (this.flipX == false) {
        this.attackbox.setPosition(this.x - 10, this.y);
      }
      this.anims.play("punch");
      this.scene.sound.play("sword-swosh");
      this.scene.player.canAttack = false;
    }
  }

  control_handler() {
    this.body.setVelocityX(0);

    if (this.cursors.left.isDown || this.keys["walkLeft"].isDown) {
      this.body.setVelocityX(-160);
      this.anims.play("left", true);
    }
    if (this.cursors.right.isDown || this.keys["walkRight"].isDown) {
      this.body.setVelocityX(160);
      this.anims.play("left", true);
    }
    if (this.cursors.down.isDown || this.keys.duck.isDown) {
      this.body.setVelocityX(0);
      this.anims.play("duck");
    }
    if (
      this.keys["push"].isDown &&
      (this.body.touching.right || this.body.touching.left)
    ) {
      this.isPushing = true;
    }
    if (this.isPushing && this.keys["push"].isDown) {
      this.play("cling-left");
    } else {
      this.isPushing = false;
    }
    if (
      (this.cursors.up.isDown && this.body.touching.down) ||
      (this.keys["jump"].isDown && this.body.touching.down)
    ) {
      this.scene.sound.play("jump");
      this.anims.play("idle");
      this.body.setVelocityY(-330);
    }
    if (
      (this.cursors.down.isDown || this.keys.duck.isDown) &&
      this.cursors.left.isDown
    ) {
      this.body.setVelocityX(-80);
      this.anims.play("duck-left", true);
    }
    if (
      (this.cursors.down.isDown || this.keys.duck.isDown) &&
      this.cursors.right.isDown
    ) {
      this.body.setVelocityX(80);
      this.anims.play("duck-left", true);
    }

    //----------------Clinging Cliff Hang------------------------------
    if (Phaser.Input.Keyboard.JustDown(this.keys["clingToggle"])) {
      console.log("is clinging");
      this.body.setAcceleration(0, 0);
      this.scene.sound.play("cling");
    }
    if (Phaser.Input.Keyboard.JustDown(this.keys["clingToggle"])) {
      console.log("is not clinging");
      this.body.setAcceleration(0, 0);
    }
    if (
      Phaser.Input.Keyboard.JustDown(this.keys["clingToggle"]) &&
      this.body.touching.left
    ) {
      this.isClinging = true;
      this.body.setVelocityY(0, 0),
        this.body.setVelocityX(0, 0),
        this.anims.play("cling-left");
      if (this.isClinging) {
        if (this.cursors.left.isDown && this.keys["clingToggle"].isDown) {
          this.body.setVelocityX(-160);
          this.anims.play("left", false);
          this.anims.play("cling-left", true);
          this.scene.sound.play("cling");
        }
        if (
          Phaser.Input.Keyboard.JustDown(this.keys["clingToggle"]) &&
          this.cursors.up.isDown
        ) {
          this.body.setVelocityY(-50);
        }
      }
    }
    if (
      Phaser.Input.Keyboard.JustDown(this.keys["clingToggle"]) &&
      this.body.touching.right
    ) {
      this.isClinging = true;
      this.body.setVelocityY(0, 0),
        this.body.setVelocityX(0, 0),
        this.anims.play("cling-left");
      if (this.isClinging) {
        if (
          this.cursors.right.isDown &&
          Phaser.Input.Keyboard.JustDown(this.keys["clingToggle"])
        ) {
          this.body.setVelocityX(160);
          this.anims.play("right", false);
          this.anims.play("cling-left", true);
          this.scene.sound.play("cling");
        }
        if (
          Phaser.Input.Keyboard.JustDown(this.keys["clingToggle"]) &&
          this.cursors.up.isDown
        ) {
          this.body.setVelocityY(-50);
        }
      }
    }
  }
}
