'use strict'

var Estatico = require('./estatico.js');

var BloqueLadrillos = function (game, x, y, name)
{
  Estatico.call(this, game, x, y, name);
  this.animations.add('block', [0], 1, true);

  this.emitter = game.add.emitter(x, y, 4);
  this.emitter.makeParticles('wallParticle');
  this.emitter.gravity = 600;

  this.emitter.minRotation = 0;
  this.emitter.maxRotation = 0;

  this.emitter.minParticleSpeed.setTo(-300, -300);
  this.emitter.maxParticleSpeed.setTo(300, 300);
}

BloqueLadrillos.prototype = Object.create(Estatico.prototype);
BloqueLadrillos.prototype.constructor = BloqueLadrillos;

BloqueLadrillos.prototype.update = function(){

  this.animations.play('block');

}

BloqueLadrillos.prototype.breakblock = function (puntos)
{
    puntos += 10;
    this.emitter.start(true, 4000, null, 4);
    this.destroy();
}

module.exports = BloqueLadrillos;
