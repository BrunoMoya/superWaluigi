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
var spawn;

var Waluigi = require ('./waluigi.js');
var Goomba = require ('./goomba.js');
var Dinamico = require ('./dinamico.js');
var Estatico = require ('./estatico.js');


var PlayScene = {
  create: function () {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = '#787878';
    map = this.game.add.tilemap('tilemapWa');
    map.addTilesetImage('Tilesheet','super_mario');

    cielo = map.createLayer('fondo');
    //this.cielo.fixedToCamera = true;

    suelo = map.createLayer('suelo');
    //this.suelo.debug = true;
    map.setCollisionByExclusion([0],true,suelo);
    suelo.resizeWorld();

    //bloques = map.createLayer(2);
    //this.bloques.debug = true;
    //map.setCollisionByExclusion([0],true,bloques);

    //bloquesInt = map.createLayer(3);
    //map.setCollisionByExclusion([0],true,bloquesInt);

    cursors = this.game.input.keyboard.createCursorKeys();

    var iniX;
    var iniY;

    if(map.objects.items)
    {
      spawn = map.objects.items;
      spawn.forEach(item => {
        iniX = item.x;
        iniY = item.y;
        console.log(item);
      });
    }


    waluigi = new Waluigi(this.game, iniX, iniY, 150, 250, 640, 'waluigi', cursors);
    this.game.add.existing(waluigi);
    this.game.physics.enable(waluigi, Phaser.Physics.ARCADE);
    waluigi.body.collideWorldBounds = true;
    waluigi.animations.add('walkRight', [0, 1, 2, 3, 4], 10, true);
    waluigi.animations.add('walkLeft', [6, 7, 8, 9, 10], 10, true);
    waluigi.animations.add('entrando',[12, 13, 14,15,16],4,true);
    waluigi.goesRight = true;
    waluigi.scale.setTo(0.5);

    goombas = this.game.add.group();

    for (var i = 0; i < 3; i++)
    {
      var goomba = new Goomba(this.game, 100 + i * 100, this.game.world.CenterY, 80, 120, 'goomba', 100);
      this.game.physics.enable(goomba, Phaser.Physics.ARCADE);
      goomba.body.gravity.y = 400;
      goomba.scale.setTo(0.5);
      goomba.body.colliderWorldBounds = true;
      goombas.add(goomba);
    }

    this.game.camera.follow(waluigi);
    this.game.camera.view

  },

  update:  function () {

      collisionControl(this.game, waluigi, goombas, this);

  },

 render: function () {
       this.game.debug.bodyInfo(waluigi, 32, 32);
       this.game.debug.body(waluigi);
     }
   };

   var collisionControl = function(game, waluigi, goombas, mapa)
   {

       game.physics.arcade.collide(waluigi, suelo);
       game.physics.arcade.collide(waluigi, bloques);
       game.physics.arcade.collide(waluigi, bloquesInt);


       game.physics.arcade.collide(goombas, suelo);
       game.physics.arcade.collide(goombas, bloques);
       game.physics.arcade.collide(goombas, bloquesInt);
       game.physics.arcade.collide(goombas);


   }


module.exports = PlayScene;
