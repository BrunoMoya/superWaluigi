'use strict';

var Estatico = function (game, x, y, name)
{
  Phaser.Sprite.call(this, game, x, y, name);
  this.anchor.setTo(0.5, 0.5);
  posX = x;
  posY = y;
}

Estatico.prototype = Object.create(Phaser.Sprite.prototype);
Estatico.prototype.constructor = Estatico;

module.exports = Estatico;
