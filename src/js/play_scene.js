'use strict';

var puntos;
var muro;
var waluigi;
var goombas;
var platforms;
var cursors;
var canJump;
var map;
var suelo;
var bloques;
var ladrillos;
var cielo;
var bandera;
var bloquesInt;
var maxCamera;

var Waluigi = require ('./waluigi.js');
var Goomba = require ('./goomba.js');
var Dinamico = require ('./dinamico.js');
var Estatico = require ('./estatico.js');
var BloqueLadrillos = require ('./bloqueladrillos.js');

var PlayScene = {
  create: function () {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = '#787878';
    map = this.game.add.tilemap('tilemapWa');
    map.addTilesetImage('Tilesheet','super_mario');

    cielo = map.createLayer('fondo');

    suelo = map.createLayer('suelo');

    map.setCollisionByExclusion([0],true,suelo);
    suelo.resizeWorld();

    cursors = this.game.input.keyboard.createCursorKeys();

    var iniX;
    var iniY;

    if(map.objects.items)
    {
      var spawn = map.objects.items;
      spawn.forEach(item => {
        iniX = item.x;
        iniY = item.y;
      });
    }


    waluigi = new Waluigi(this.game, iniX, iniY, 150, 250, 640, 'waluigi', cursors);


    goombas = this.game.add.group();

    for (var i = 0; i < 3; i++)
    {
      var goomba = new Goomba(this.game, 100 + i * 50, this.game.world.CenterY, 80, 120, 'goomba', 100);
      this.game.physics.enable(goomba, Phaser.Physics.ARCADE);
      goomba.body.gravity.y = 400;
      goomba.scale.setTo(0.5);
      goomba.body.colliderWorldBounds = true;
      goombas.add(goomba);
    }

    creaBloques(this.game);

    maxCamera = 0;
    this.game.camera.view

    muro = this.game.add.sprite(-68, -50, 'wall');
    muro.scale.setTo(0.2);
    muro.visible = false;
    this.game.physics.enable(muro, Phaser.Physics.ARCADE);
    muro.body.inmovable = true;
    muro.body.moves = false;


  },

  update:  function () {

      cameraLogic(this.game, muro);
      collisionControl(this.game);

  },

 render: function () {
       this.game.debug.bodyInfo(waluigi, 32, 32);
       this.game.debug.body(waluigi);
       this.game.debug.body(muro);
       bloques.forEach(item => {
         this.game.debug.body(item);
       });
     }
   };

   var collisionControl = function(game)
   {

       game.physics.arcade.collide(waluigi, suelo);
       game.physics.arcade.collide(waluigi, muro);
       bloques.forEach(bloque => {

         game.physics.arcade.collide(waluigi, bloque, compruebaBloque);

       });


       game.physics.arcade.collide(goombas, suelo);
       game.physics.arcade.collide(goombas, bloques);
       game.physics.arcade.collide(goombas, bloquesInt);
       game.physics.arcade.collide(goombas);

       goombas.forEach(function(enemy)
            {
            game.physics.arcade.collide(enemy, waluigi, function(enemy, waluigi){

             if(enemy.body.touching.up && waluigi.body.touching.down)
             {
              waluigi.rebound();
              enemy.muerte();
             }

              else {
                 game.state.start('play');
              }
            }, null, this);

            game.physics.arcade.collide(enemy, suelo, function(enemy, suelo){

              if((enemy.body.touching.right && enemy.body.touching.down) || (enemy.body.touching.left && enemy.body.touching.down))
                enemy.rebote();

              }, null, this);

          });
   }

   var cameraLogic = function(game, wall)
   {
     if(game.camera.x > maxCamera)
       maxCamera = game.camera.x;

     if(game.camera.x < waluigi.body.x - 300){
       game.camera.x = waluigi.body.x - 300;
     }

     else{
       game.camera.x = maxCamera;
     }

     wall.body.x = game.camera.x - 68;

   }

   var creaBloques = function(game)
   {
     if(map.objects.bloques)
     {
       bloques = game.add.group();
       game.physics.enable(bloques, Phaser.Physics.ARCADE);


       var objetos = map.objects.bloques;
       objetos.forEach(item => {
          for(var i = 0; i < item.properties.num; i++)
          {
            var bloque = new BloqueLadrillos(game, item.x + i * 16, item.y, 'general');
            game.physics.enable(bloque, Phaser.Physics.ARCADE);
            bloque.body.immovable = true;
            bloques.add(bloque);
          }
       });
     }
   }

   var compruebaBloque = function (waluigi, bloque, puntos)
   {
     if(waluigi.body.touching.up && bloque.body.touching.down)
     {
       bloque.breakblock(puntos);
       waluigi.breakhit();
     }

      if(waluigi.body.touching.down && bloque.body.touching.up)
        waluigi.plataforma();

      else
        waluigi.noPlataforma();
   }

module.exports = PlayScene;
