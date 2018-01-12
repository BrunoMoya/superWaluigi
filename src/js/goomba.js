'use strict';

var Dinamico = require('./dinamico.js');

var Goomba = function (game, x, y, velX, velY, name, puntos)
{
  Dinamico.call(this, game, x, y, velX, velY, name);

  this.puntos = puntos;
}

Goomba.prototype = Object.create(Dinamico.prototype);
Goomba.prototype.constructor = Goomba;

Goomba.prototype.update = function(){

  this.body.velocity.x = this.velX * this.scale.x;

}

Goomba.prototype.muerte = function (game, obj) {

  game.puntos += obj.puntos;
  obj.kill();

}

module.exports = Goomba;
