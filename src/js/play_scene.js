'use strict';

var waluigi;
var goomba;
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

   var wall = platforms.create(-10, 300, 'wall');

   wall.body.immovable = true;

    waluigi = new Waluigi(this.game, this.game.world.centerX, this.game.world.CenterY, 'waluigi');
    this.game.add.existing(waluigi);
/*
    goomba = this.game.add.sprite(
      750, this.game.world.centerY, 'goomba');
    goomba.anchor.setTo(0.5, 0.5);
*/
    this.game.physics.enable(waluigi, Phaser.Physics.ARCADE);
  //  this.game.physics.enable(goomba, Phaser.Physics.ARCADE);

    waluigi.body.collideWorldBounds = true;
    waluigi.body.gravity.y = 500;
    waluigi.body.bounce.y = 0.2;

  //  goomba.body.gravity.y = 500;
  //goomba.body.bounce.y = 0.2;

    cursors = this.game.input.keyboard.createCursorKeys();

  },

  update:  function () {

    this.game.physics.arcade.collide(waluigi, platforms);
    waluigi.input(cursors);
  //  this.game.physics.arcade.collide(goomba, platforms, function(goomba, platforms){

  //    if(goomba.body.touching.right && goomba.body.touching.down)
  //      goomba.scale.x = 1;

  //    if(goomba.body.touching.left && goomba.body.touching.down)
  //      goomba.scale.x = -1;
  //  }, null, this);

  //    goomba.body.velocity.x = -100 * goomba.scale.x;
/*
    this.game.physics.arcade.collide(waluigi, goomba, function(waluigi, enemy){

      if(goomba.body.touching.up && waluigi.body.touching.down){
            goomba.kill();
        }
        else  this.game.state.start('play');
      }, null, this);
*/
    if(waluigi.body.touching.down) waluigi.grounded();
/*
    if (cursors.left.isDown && waluigi.body.velocity.x > -100){
      if(waluigi.body.velocity.x > 0)
        waluigi.body.velocity.x /= 1.1;
      waluigi.body.velocity.x -= 10;
    }
    else if (cursors.right.isDown && waluigi.body.velocity.x < 100){
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
    */
  },

 render: function () {
       this.game.debug.bodyInfo(waluigi, 32, 32);
       this.game.debug.body(waluigi);
     }
   };

module.exports = PlayScene;
