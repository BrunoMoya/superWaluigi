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
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    // TODO: load here the assets for the game
    this.game.load.tilemap('tilemapWa', 'images/planoFisico7.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('super_mario', 'images/super_mario.png',16,16 );
    this.game.load.spritesheet('waluigi', 'images/Waluigisheet15-12.png',56 ,88);
    this.game.load.image('ground', 'images/platform.png');
    this.game.load.image('goomba', 'images/goombat.png');
    this.game.load.image('wall', 'images/wall.png');

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
