'use strict'

//var Dinamico = require('./dinamico.js');

var Goomba = function (game, x, y, velX, velY, name)
{
  Dinamico.call(this, game, x, y, velX, velY, name);
}

Goomba.prototype = Object.create(Dinamico.prototype);
Goomba.prototype.constructor = Goomba;

Goomba.prototype.update = function()
{
  Dinamico.prototype.update.call(this);
};
