'use strict';

var Dinamico = require('./dinamico.js');

var Goomba = function (game, x, y, velX, velY, name, puntos)
{
  Dinamico.call(this, game, x, y, velX, velY, name);

  this.puntos = puntos;
}

Goomba.prototype = Object.create(Dinamico.prototype);
Goomba.prototype.constructor = Goomba;

module.exports = Goomba;
