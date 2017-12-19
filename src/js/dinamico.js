'use strict'

var Dinamico = function (game, x, y, velX, velY, name)
{
  Phaser.Sprite.call(this, game, x, y, name);
  this.anchor.setTo(0.5, 0.5);

  this.posX = x;
  this.posY = y;
  this.velX = velX;
  this.velY = velY;
}

Dinamico.prototype = Object.create(Phaser.Sprite.prototype);
Dinamico.prototype.constructor = Dinamico;

Dinamico.prototype.update = function(){
  this.body.velocity.x = this.velocity * this.scale.x;
}

module.exports = Dinamico;
