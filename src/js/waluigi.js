'use strict';


var Waluigi = function (game, x, y, name, cursors)
{
  Phaser.Sprite.call(this, game, x, y, name);

  this.cursors = cursors;
  this.canJump = true;
  this.anchor.setTo(0.5, 0.5);

}

Waluigi.prototype = Object.create(Phaser.Sprite.prototype);
Waluigi.prototype.constructor = Waluigi;

Waluigi.prototype.update = function () {

  if (this.cursors.left.isDown ){
    this.body.velocity.x = -150;
    this.animations.play('walkLeft');
    this.goesRight = false;
  }
  else if (this.cursors.right.isDown){
    this.body.velocity.x = 150;
    this.animations.play('walkRight');
    this.goesRight = true;
  }
  else {
    if(this.body.velocity.x > 0)     //derrape derecha
      this.body.velocity.x -= 5;
    else if(this.body.velocity.x < 0)//derrape izq
      this.body.velocity.x += 5;
    else{}                           //this.body.velocity.x == 0
    this.animations.stop();
    if(this.goesRight) this.frame = 0;
    else this.frame = 6;
  }
};

Waluigi.prototype.grounded = function (){
  this.canJump = true;
}
