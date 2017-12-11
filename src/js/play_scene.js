'use strict';

var waluigi;
var goombas;
var platforms;
var cursors;
var canJump;

var PlayScene = {
  create: function () {

  this.game.physics.startSystem(Phaser.Physics.ARCADE);

    goombas = this.game.add.group();
    goombas.enableBody = true;

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

    cursors = this.game.input.keyboard.createCursorKeys();

    waluigi = new Waluigi(this.game, 100, this.game.world.CenterY, 'waluigi', cursors);
    this.game.add.existing(waluigi);
    this.game.physics.enable(waluigi, Phaser.Physics.ARCADE);

    waluigi.body.collideWorldBounds = true;
    waluigi.body.gravity.y = 500;
    waluigi.body.bounce.y = 0.2;

    for (var i = 0; i < 4; i++) {
      var goomba = new Goomba(this.game, this.game.world.centerX + i*100, this.game.world.CenterY, 'goomba');
      goombas.add(goomba);
      this.game.physics.enable(goomba, Phaser.Physics.ARCADE);
      goomba.body.gravity.y = 500;
      goomba.body.bounce.y = 0.2;
    }
  },

  update:  function () {

    colisionControl(this.game, waluigi, platforms, goombas)

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
