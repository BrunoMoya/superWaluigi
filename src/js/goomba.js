'use strict';

var Dinamico = require('./dinamico.js');

var Goomba = function (game, x, y, velX, velY, name, puntos)
{
  Dinamico.call(this, game, x, y, velX, velY, name);

  this.puntos = puntos;
  this.active = false;
}

Goomba.prototype = Object.create(Dinamico.prototype);
Goomba.prototype.constructor = Goomba;

Goomba.prototype.update = function(){

  this.body.velocity.x = this.velX * this.scale.x;

}

Goomba.prototype.rebote = function(){

  this.scale.x = -this.scale.x;

}

Goomba.prototype.muerte = function (puntos) {

  puntos += this.puntos;
  this.destroy();

}

module.exports = Goomba;
