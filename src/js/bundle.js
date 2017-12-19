(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){'use strict'

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

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"./dinamico.js":1}],4:[function(require,module,exports){
'use strict';

var PlayScene = require('./play_scene.js');


var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
  },

  create: function () {

    this.game.state.start('preloader');
  }
};

var PreloaderScene = {
  preload: function () {
    this.game.load.baseURL = 'https://BrunoMoya.github.io/superWaluigi/src';

    this.game.load.crossOrigin = 'anonymous';

    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    // TODO: load here the assets for the game
    this.game.load.tilemap('tilemapWa', '../images/planoFisico8.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('super_mario', '../images/super_mario.png',16,16 );
    this.game.load.spritesheet('waluigi', '../images/Waluigisheet15-12.png',56 ,88);
    this.game.load.image('ground', '../images/platform.png');
    this.game.load.image('goomba', '../images/goombat.png');
    this.game.load.image('wall', '../images/wall.png');

  },

  create: function () {
    this.game.state.start('play');
  }
};

window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);

  game.state.start('boot');
};

},{"./play_scene.js":5}],5:[function(require,module,exports){
'use strict';

var waluigi;
var goombas;
var platforms;
var cursors;
var canJump;
var map;
var suelo;
var bloques;
var cielo;
var bandera;
var bloquesInt;

var Waluigi = require ('./waluigi.js');
var Goomba = require ('./goomba.js');
var Dinamico = require ('./dinamico.js');
var Estatico = require ('./estatico.js');


var PlayScene = {
  create: function () {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = '#787878';
    this.map = this.game.add.tilemap('tilemapWa');
    this.map.addTilesetImage('super_mario','super_mario');//

    this.cielo = this.map.createLayer(0);
    //this.cielo.fixedToCamera = true;

    this.suelo = this.map.createLayer(1);
    //this.suelo.debug = true;
    this.map.setCollisionByExclusion([0],true,this.suelo);
    this.suelo.resizeWorld();

    this.bloques = this.map.createLayer(2);
    //this.bloques.debug = true;
    this.map.setCollisionByExclusion([0],true,this.bloques);

    this.bloquesInt = this.map.createLayer(3);
    this.map.setCollisionByExclusion([0],true,this.bloquesInt);

    cursors = this.game.input.keyboard.createCursorKeys();

    waluigi = new Waluigi(this.game, 100, this.game.world.CenterY, 'waluigi', cursors);
    this.game.add.existing(waluigi);
    this.game.physics.enable(waluigi, Phaser.Physics.ARCADE);
    waluigi.body.collideWorldBounds = true;
    waluigi.animations.add('walkRight', [0, 1, 2, 3, 4], 10, true);
    waluigi.animations.add('walkLeft', [6, 7, 8, 9, 10], 10, true);
    waluigi.animations.add('entrando',[12, 13, 14,15,16],4,true);
    waluigi.body.gravity.y = 370;
    waluigi.goesRight =true;
    waluigi.scale.setTo(0.5);

    this.game.camera.follow(waluigi);
    this.game.camera.view
  },

  update:  function () {
    this.game.physics.arcade.collide(waluigi,this.suelo);
    this.game.physics.arcade.collide(waluigi,this.bloques);
    this.game.physics.arcade.collide(waluigi,this.bloquesInt);

  },

 render: function () {
       this.game.debug.bodyInfo(waluigi, 32, 32);
       this.game.debug.body(waluigi);
     }
   };

   var colisionControl = function(game, waluigi, platforms, goombas)
   {
        game.physics.arcade.collide(waluigi, platforms);
          if(waluigi.body.touching.down) waluigi.grounded();

          goombas.forEach(function(goomba)
          {
           game.physics.arcade.collide(goomba, platforms, function(goomba, platforms){

            if(goomba.body.touching.right && goomba.body.touching.down)
              goomba.scale.x = 1;

            if(goomba.body.touching.left && goomba.body.touching.down)
               goomba.scale.x = -1;
           }, null, this);


           game.physics.arcade.collide(waluigi, goomba, function(waluigi, enemy){

             if(goomba.body.touching.up && waluigi.body.touching.down){
                   goomba.kill();
               }
               else
               {
                 game.state.start('play');
               }
             }, null, this);
       })
   }

module.exports = PlayScene;

},{"./dinamico.js":1,"./estatico.js":2,"./goomba.js":3,"./waluigi.js":6}],6:[function(require,module,exports){
'use strict';


var Waluigi = function (game, x, y, name, cursors)
{
  Phaser.Sprite.call(this, game, x, y, name);

  this.cursors = cursors;
  this.canJump = true;
  this.anchor.setTo(0.5, 0.5);

}

Waluigi.prototype = Object.create(Phaser.Sprite.prototype);
Waluigi.prototype.constructor = Waluigi;

Waluigi.prototype.update = function () {

  if (this.cursors.left.isDown ){
    this.body.velocity.x = -150;
    this.animations.play('walkLeft');
    this.goesRight = false;
  }
  else if (this.cursors.right.isDown){
    this.body.velocity.x = 150;
    this.animations.play('walkRight');
    this.goesRight = true;
  }
  else {
    if(this.body.velocity.x > 0)     //derrape derecha
      this.body.velocity.x -= 10;
    else if(this.body.velocity.x < 0)//derrape izq
      this.body.velocity.x += 10;
    else{}                           //this.body.velocity.x == 0
    this.animations.stop();
    if(this.goesRight) this.frame = 0;
    else this.frame = 6;
  }
  if(this.cursors.up.isDown && this.body.onFloor()){
    this.body.velocity.y = -250;
    this.animations.stop();
  }

  if(this.body.velocity.y != 0){
    if(this.goesRight) this.frame = 5;
    else this.frame = 11;
  }
};

module.exports = Waluigi;

},{}]},{},[4]);
