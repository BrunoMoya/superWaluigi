'use strict';


var Waluigi = function (game, x, y, name)
{
  Phaser.Sprite.call(this, game, x, y, name);

  this.canJump = true;
  this.anchor.setTo(0.5, 0.5);

}

Waluigi.prototype = Object.create(Phaser.Sprite.prototype);
Waluigi.prototype.constructor = Waluigi;

Waluigi.prototype.input = function (cursors) {

  if (cursors.left.isDown && this.body.velocity.x > -100){
    if(this.body.velocity.x > 0)
      this.body.velocity.x /= 1.1;
    this.body.velocity.x -= 10;
  }
  else if (cursors.right.isDown && this.body.velocity.x < 100){
    if(this.body.velocity.x < 0)
      this.body.velocity.x /= 1.1;
    this.body.velocity.x += 10;
  }
  else if (!cursors.right.isDown && !cursors.left.isDown){
      this.body.velocity.x /= 1.1;
  }
  if (cursors.up.isDown && this.canJump){
    if(this.body.velocity.y < -300) this.canJump = false;
    this.body.velocity.y -= 20;
  }
};

Waluigi.prototype.grounded = function (){
  this.canJump = true;
}
