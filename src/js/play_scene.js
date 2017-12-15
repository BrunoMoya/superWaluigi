'use strict';

var layer5;
var layer4;
var layer3;
var bloques;
var layer;
var wa2;
var goomba;
var platforms;
var cursors;
var canJump;
var suelo;
var bloques;

var PlayScene = {
  create: function () {

  this.map = this.game.add.tilemap('tilemap');
  this.map.addTilesetImage("1","patronesTilemap");
  layer4 = this.map.createLayer('cielo');
    //
  wa2 = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY,'wa2');
  wa2.anchor.setTo(0.5, 0.5);
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  this.game.physics.arcade.enable(wa2);
  wa2.body.collideWorldBounds = true;
  wa2.animations.add('walkRight', [0, 1, 2, 3, 4], 10, true);
  wa2.animations.add('walkLeft', [6, 7, 8, 9, 10], 10, true);
  wa2.animations.add('mecachis',[18, 19, 20],7,true);
  wa2.animations.add('tomaBola',[21, 22, 23],4,true);
  wa2.animations.add('entrando',[12, 13, 14,15,16],4,true);
  wa2.goesRight = true;

  ////////////////
  

  
  this.layer3 = this.map.createLayer('?');
  this.bloques = this.map.createLayer('bloques');
  this.suelo = this.map.createLayer('suelo');
  this.layer5 = this.map.createLayer('bandera');
  this.suelo.resizeWorld();
  //bloques.resizeWorld();
  //layer3.resizeWorld();
  //layer4.resizeWorld();
  //suelo.debug = true;
  
    this.game.physics.enable(wa2, Phaser.Physics.ARCADE);

    wa2.body.collideWorldBounds = true;
    wa2.body.gravity.y = 370;
    wa2.body.bounce.y = 0.2;
    this.map.setCollisionBetween(13, 15, true, 'suelo');
    //this.map.setCollision(39);
   // this.map.setCollision(true, 'suelo');
    cursors = this.game.input.keyboard.createCursorKeys();
    canJump = true;
    this.game.camera.follow(wa2);

  },

  update:  function () {

    this.game.physics.arcade.collide(wa2, suelo);
    this.game.physics.arcade.collide(wa2, bloques);
    this.map.setCollision(true, 'suelo');

      if (wa2.body.enable) {
    wa2.body.velocity.x = 0;
    if (cursors.left.isDown) {
      wa2.body.velocity.x = -90;
      wa2.animations.play('walkLeft');
      wa2.goesRight = false;
    } else if (cursors.right.isDown) {
      wa2.body.velocity.x = 90;
      wa2.animations.play('walkRight');
      wa2.goesRight = true;
    } else if(cursors.down.isDown){
       wa2.animations.play('entrando');
    /*
      wa2.animations.stop();
      if (wa2.goesRight) wa2.frame = 0;
      else wa2.frame = 7;*/
    }
/*
    if (cursors.up.isDown && wa2.body.onFloor()) {
      wa2.body.velocity.y = -190;
      wa2.animations.stop();
    }*/
    
/*  //salto
    if (wa2.body.velocity.y != 0) {
      if (wa2.goesRight) wa2.frame = 5;
      else wa2.frame = 12;
    }*/
  }

  },

 render: function () {
       //this.game.debug.bodyInfo(waluigi, 32, 32);
       //this.game.debug.body(waluigi);
       this.game.debug.bodyInfo(wa2, 20, 20);
       this.game.debug.body(wa2);
     }
   };

module.exports = PlayScene;
