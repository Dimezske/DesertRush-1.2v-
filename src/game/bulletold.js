import Phaser from "../lib/phaser.js";

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  /**
   * @param {Phaser.Scene} scene
   * @param {number} x
   * @param {number} y
   * @param {string} texture
   */
  constructor(scene, x, y, texture = "p90-bullet-sprite") {
    super(scene, x, y, texture);
    this.bulletHit = false;
    this.setScale(1);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.allowGravity = false;
    this.start;
    this.damage = 1.5;
    /*
    this.scene.physics.add.collider(this, this.scene.monsters, function(bullet, monsters){ 
      this.scene.monsters.health -= this.damage;
      this.scene.sound.play('plunger-hurt');
      this.active=false;
      },null,this);*/
      this.scene.physics.add.overlap(this, this.scene.monsters, function(bullet, monster) {

          monster.health -= bullet.damage;
            this.scene.sound.play('plunger-hurt');
           
                let dtext = this.scene.add.text(this.x,this.y,`${bullet.damage}`).setTint(0xfc4903);
                //this.scene.time.delayedCall(1200, () => {this.dtext.destroy();/*this.scene.player.exp+=this.exp*/})
                this.scene.time.addEvent({
                    delay: 1200,
                    callback: () => dtext.destroy(),
                    callbackScope: this,
                    loop: false
                  });
            
            
                  this.timer = this.scene.time.addEvent({
                    delay:100,
                    repeat:-1,
                    callback:function(){
                      bullet.setActive(false);
                  },
                  callbackscope:this,
                })
        }, null,this);
      this.scene.physics.add.overlap(this,this.scene.ground_sand, function(bullet, ground_sand){ 
        this.bulletHit = true;
        bullet.active=false;
        this.scene.add.image(bullet.x, bullet.y, "bullet-hole-sprite")
      },function(){if(this.bulletHit==false){return true}else{return false}},this);
      this.scene.physics.add.overlap(this,this.scene.platform, function(bullet, platform){ 
        this.bulletHit = true;
        bullet.active = false;
        this.scene.add.image(bullet.x, bullet.y, "bullet-hole-sprite")
      },function(){if(this.bulletHit==false){return true}else{return false}},this);
      this.scene.physics.add.overlap(this,this.scene.mPlatform, function(bullet, mPlatform){ 
        this.bulletHit = true;
        bullet.active = false;
        this.scene.add.image(bullet.x, bullet.y, "bullet-hole-sprite")
      },function(){if(this.bulletHit==false){return true}else{return false}},this);
      
      this.scene.physics.add.overlap(this,this.scene.crate, function(bullet, crate){ 
        this.bulletHit = true;
        crate.health -= this.damage;
        this.scene.sound.play('crate_hit');
        this.scene.add.image(bullet.x, bullet.y, "bullet-hole-sprite")
        bullet.active=false;
      },function(){if(this.bulletHit==false){return true}else{return false}},this);
  }

  fire() {
    //create starting point for use in killing bullet
    this.start = { x: this.x, y: this.y };
    //access pointer
    let pointer = this.scene.input.activePointer;
    //get angle between bullet and pointer
    let angle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      pointer.worldX,
      pointer.worldY
    );
    //set angle of bullet and create trajectory, second
    //parameter is the speed of the bullet
    this.rotation = angle;
    this.scene.physics.velocityFromRotation(angle, 600, this.body.velocity);
  }

  update() {
    if (this.active == true) {
      if (Phaser.Math.Distance.BetweenPoints(this.start, this) > 2000) {
        this.active = false;
      }
    }
  }
}
