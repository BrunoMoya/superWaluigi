'use strict'

var Estatico = require ('./estatico.js');

var Coin = function (game, x, y, name)
{
  Estatico.call(this, game, x, y, name);
  this.animations.add('coin', [188, 189, 190], 5, true);
  this.animations.add('taken', [188], 1, true);
  this.game = game;
  this.active = true;
  this.timer = 0;
  this.puntuacion = 100;
}

Coin.prototype = Object.create(Estatico.prototype);
Coin.prototype.constructor = Coin;

Coin.prototype.update = function(){

  if(this.active)
    this.animations.play('coin');

  if(this.timer != 0 && this.timer + 70 < this.game.time.now)
  {
    console.log(this.game.time.now);
    this.destroy();
  }
}

Coin.prototype.taken = function(){

  this.active = false;
  this.animations.play('taken');
  this.body.velocity.y = -400;
  if(this.timer == 0)
    this.timer = this.game.time.now;
  console.log('este' + this.timer);

}

module.exports = Coin;
