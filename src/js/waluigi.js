'use strict';

var Dinamico = require('./dinamico.js');

var Waluigi = function (game, x, y, velX, velY, gravity, name, cursors)
{
  Dinamico.call(this, game, x, y, velX, velY, name);

  this.cursors = cursors;
  this.jumping = false;
  this.canFloat = false;
  this.anchor.setTo(0.5, 0.5);
  this.velX = velX
  this.velY = velY
  this.gravity = gravity;
}

Waluigi.prototype = Object.create(Phaser.Sprite.prototype);
Waluigi.prototype.constructor = Waluigi;

Waluigi.prototype.update = function () {

var deltaTime = (this.game.time.elapsedMS * this.game.time.fps)/1000;

this.body.gravity.y = this.gravity * 2;

  if (this.cursors.left.isDown){
    if(this.body.velocity.x > -this.velX)
    {
      if(this.body.velocity.x < 0)
      {
        if(this.body.onFloor())
        {
          if(this.body.velocity.x > -this.velX/4)
          {
            this.body.velocity.x -= 3 * deltaTime;
            this.animations.play('walkLeft');
            this.animations.currentAnim.speed = 7;
            this.goesRight = false;
          }
          else
          {
            this.body.velocity.x -= 2.5 * deltaTime;
            this.animations.play('walkLeft');
            this.animations.currentAnim.speed = 15 * -this.body.velocity.x/this.velX;
            this.goesRight = false;
          }
        }
        else
        {
          if(this.body.velocity.x > 0)
          {
            this.body.velocity.x -= 4.5 * deltaTime;
          }
          else
          {
          this.body.velocity.x -= 2.5 * deltaTime;
          }
        }
      }
      else
      {
        if(this.body.onFloor())
        {
          this.body.velocity.x -= 8.5 * deltaTime;
          if(this.body.velocity.x > this.velX)
          this.body.velocity.x -= 17 * deltaTime;
        }
        else
          this.body.velocity.x -= 5 * deltaTime;
      }
    }
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.X) && this.body.velocity.x > -this.velX * 7/3)
    {
      if(this.body.onFloor())
      {
        if(this.body.velocity.x > -this.velX/4)
        {
          this.body.velocity.x -= 4 * deltaTime;
          this.animations.play('walkLeft');
          this.animations.currentAnim.speed = 7;
          this.goesRight = false;
        }
        else
        {
          this.body.velocity.x -= 4.5 * deltaTime;
          this.animations.play('walkLeft');
          this.animations.currentAnim.speed = 15 * -this.body.velocity.x/this.velX;
          this.goesRight = false;
        }
      }
    }

    else if (!this.game.input.keyboard.isDown(Phaser.Keyboard.X) && this.body.velocity.x < -this.velX)
    {
      this.body.velocity.x += 4.5 * deltaTime;
      this.animations.play('walkLeft');
      this.animations.currentAnim.speed = 15 * -this.body.velocity.x/this.velX;
      this.goesRight = false;

    }
  }

  else if (this.cursors.right.isDown){
    if(this.body.velocity.x < this.velX)
    {
      if(this.body.velocity.x > 0)
      {
        if(this.body.onFloor())
        {
          if(this.body.velocity.x < this.velX/4)
          {
            this.body.velocity.x += 3 * deltaTime;
            this.animations.play('walkRight');
            this.animations.currentAnim.speed = 7;
            this.goesRight = true;
          }
          else
          {
            this.body.velocity.x += 2.5 * deltaTime;
            this.animations.play('walkRight');
            this.animations.currentAnim.speed = 15 * this.body.velocity.x/this.velX;
            this.goesRight = true;
          }
        }
        else
        {
          if(this.body.velocity.x < 0)
          {
            this.body.velocity.x += 4.5 * deltaTime;
          }
          else
          {
            this.body.velocity.x += 2.5 * deltaTime;
          }
        }
      }
      else {
        if(this.body.onFloor())
        {
          this.body.velocity.x += 8.5 * deltaTime;
          if(this.body.velocity.x < -this.velX)
          this.body.velocity.x += 17 * deltaTime;
        }
        else
          this.body.velocity.x += 5 * deltaTime;
      }
    }

    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.X) && this.body.velocity.x < this.velX * 7/3)
    {
      if(this.body.onFloor())
      {
        if(this.body.velocity.x < this.velX/4)
        {
          this.body.velocity.x += 4 * deltaTime;
          this.animations.play('walkRight');
          this.animations.currentAnim.speed = 7;
          this.goesRight = true;
        }
        else
        {
          this.body.velocity.x += 4.5 * deltaTime;
          this.animations.play('walkRight');
          this.animations.currentAnim.speed = 15 * this.body.velocity.x/this.velX;
          this.goesRight = true;
        }
      }
    }

    else if (!this.game.input.keyboard.isDown(Phaser.Keyboard.X) && this.body.velocity.x > this.velX)
    {
      this.body.velocity.x -= 4.5 * deltaTime;
      this.animations.play('walkRight');
      this.animations.currentAnim.speed = 15 * this.body.velocity.x/this.velX;
      this.goesRight = true;

    }
  }

  else {
    if(this.body.onFloor())
    {
      if(this.body.velocity.x > 0)
      {     //derrape derecha
        this.body.velocity.x -= 8 * deltaTime;
        if(this.body.velocity.x > this.velX)
        this.body.velocity.x -= 16 * deltaTime;
      }
      else if(this.body.velocity.x < 0)
      {//derrape izq
        this.body.velocity.x += 8 * deltaTime;
        if(this.body.velocity.x < -this.velX)
        this.body.velocity.x += 16 * deltaTime;
      }

      if(this.body.velocity.x > -8 && this.body.velocity.x < 8)
      this.body.velocity.x = 0;

      this.animations.stop();
      if(this.goesRight) this.frame = 0;
      else this.frame = 6;
  }
}

  if(this.body.onFloor())
  {
    this.jumping = false;
    this.canFloat = false;
  }

  if(this.cursors.up.isDown || this.game.input.keyboard.isDown(Phaser.Keyboard.Z))
  {
    if(!this.jumping && this.body.onFloor())
    {
        this.body.velocity.y = -this.velY;
        this.jumping = true;
        this.canFloat = true;
        this.animations.stop();
    }
    else if(this.jumping && this.canFloat)
    {
      this.body.gravity.y = this.gravity/2;
    }
  }

  if(this.body.velocity.y >= 0 && this.jumping)
    this.canFloat = false;

  if(this.body.velocity.y != 0){
    if(this.goesRight) this.frame = 5;
    else this.frame = 11;
  }
};

Waluigi.prototype.rebound = function (waluigi) {

waluigi.body.velocity.y = waluigi.velY/3;

}

module.exports = Waluigi;
