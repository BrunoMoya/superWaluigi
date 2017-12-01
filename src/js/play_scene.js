'use strict';

var waluigi;
var platforms;
var cursors;
var canJump;

var PlayScene = {
  create: function () {

  this.game.physics.startSystem(Phaser.Physics.ARCADE);

    platforms = this.game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, this.game.world.height - 64, 'ground');

   ground.scale.setTo(2, 2);

   ground.body.immovable = true;

   var ledge = platforms.create(400, 400, 'ground');

   ledge.body.immovable = true;

   ledge = platforms.create(-150, 250, 'ground');

   ledge.body.immovable = true;

    waluigi = this.game.add.sprite(
    this.game.world.centerX, this.game.world.centerY, 'waluigi');
    waluigi.anchor.setTo(0.5, 0.5);

    this.game.physics.enable(waluigi, Phaser.Physics.ARCADE);

    waluigi.body.collideWorldBounds = true;
    waluigi.body.gravity.y = 500;
    waluigi.body.bounce.y = 0.2;

    cursors = this.game.input.keyboard.createCursorKeys();
    canJump = true;

  },

  update:  function () {

    var hitPlatform = this.game.physics.arcade.collide(waluigi, platforms);
    if(waluigi.body.touching.down) canJump = true;

    if (cursors.left.isDown){
      if(waluigi.body.velocity.x > 0)
        waluigi.body.velocity.x /= 1.1;
      waluigi.body.velocity.x -= 10;
    }
    else if (cursors.right.isDown){
      if(waluigi.body.velocity.x < 0)
        waluigi.body.velocity.x /= 1.1;
      waluigi.body.velocity.x += 10;
    }
    else if (!cursors.right.isDown && !cursors.left.isDown){
        waluigi.body.velocity.x /= 1.1;
    }
    if (cursors.up.isDown && canJump){
      if(waluigi.body.velocity.y < -300) canJump = false;
      waluigi.body.velocity.y -= 20;
    }
  },

 render: function () {
       this.game.debug.bodyInfo(waluigi, 32, 32);
       this.game.debug.body(waluigi);
     }
   };

module.exports = PlayScene;
