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


var PlayScene = {
  create: function () {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.stage.backgroundColor = '#787878';
    this.map = this.game.add.tilemap('tilemapWa');
    this.map.addTilesetImage('super_mario','super_mario');//

    this.cielo = this.map.createLayer(0);
    
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
    waluigi.body.gravity.y = 500;
    waluigi.body.bounce.y = 0.2;
    waluigi.goesRight =true;

    this.game.camera.follow(waluigi);
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
