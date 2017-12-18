'use strict'

var Dinamico = function (game, x, y, velX, velY, name)
{
  this.posX = x;
  this.posY = y;
  this.velX = velX;
  this.velY = velY;
  Phaser.Sprite.call(this, game, x, y, name);
  this.anchor.setTo(0.5, 0.5);

};

Dinamico.prototype = Object.create(Phaser.Sprite.prototype);
Dinamico.prototype.constructor = Dinamico;

Dinamico.prototype.update = function(){
  var deltatime = (this.game.time.elapsedMS * this.game.time.fps)/1000
  this.body.velocity.x = this.velX * this.scale.x * deltatime;
};

module.exports = Dinamico;
