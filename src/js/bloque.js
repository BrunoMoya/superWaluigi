'use strict';

var Bloque = function (game, x, y, name)
{
  Phaser.Sprite.call(this, game, x, y, name);
  this.anchor.setTo(0.5, 0.5);
}

Goomba.prototype = Object.create(Phaser.Sprite.prototype);
Goomba.prototype.constructor = Bloque;
