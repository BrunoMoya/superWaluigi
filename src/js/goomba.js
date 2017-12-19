var Goomba = function (game, x, y, name)
{
  Phaser.Sprite.call(this, game, x, y, name);
  this.anchor.setTo(0.5, 0.5);

  this.velocity = -100;


  Goomba.prototype = Object.create(Phaser.Sprite.prototype);
  Goomba.prototype.constructor = Goomba;

  Goomba.prototype.update = function(){
  this.body.velocity.x = this.velocity * this.scale.x;
  }
}
module.exports = Goomba;