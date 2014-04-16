// Harmon.js - represents the playable character of Lazersquid

"use strict";

var game = game || {};

game.harmon = 
{
	x : game.WIDTH/2,
	y : game.HEIGHT/2,
	width : 100, 
	height : 100,
	lives: 1,
	
	// physics stuff
	velocx : 0,
	velocy : 0,
	accelx : 0,
	accely : 0,
	
	BOOST_AMT_HORZ : 3, // amount that Harmon will move at a time in the X
	BOOST_AMT_VERT : 6, // amount that Harmon will move at a time in the Y (shoom!)
	
	image : undefined,
	
	lazer : undefined, // the type of lazer
	
	STATE_IDLE : 0,
	STATE_SHOOM : 1,
	STATE_DRAG : 2,
	STATE_STRAFE_LEFT : 3, 
	STATE_STRAFE_RIGHT : 4,
	STATE_POWERUP : 5,
	STATE_FIRE : 6,
	
	SQUIDSTATE: 0,
	
	lazers : [], 
	
	LAZER_SPEED : 5,
	
	LAZER_WIDTH : 10,
	
	fireDelay : 3,
	
	curFireDelay : 0,
	
	powerupIndex : 0,
	
	frame : 0,
	
	friction: .8,
	
	NUM_FRAMES : 2,
	
	frameDelay : 1/5,
	
	frameDelayInc : 1/5,
	
	deathCooldown : 100,
	
	MAX_DEATH_COOLDOWN : 100,
	
	init : function(_x,_y)
	{
		this.lazers = new Array();
		this.width = 100;
		this.x = _x;
		this.y = _y;
		this.friction = .99;
		this.frame = 0;
		this.frameDelay = 0;
		this.frameDelayInc = 1/32;
		this.velocx = this.velocy = this.accelx = this.accely = this.friction = 0;
		console.log("New Harmon created at " + this.x + ", " + this.y);
	},
	
	reset : function()
	{
		this.x = 300;
		this.y = 200;
		this.lazers = new Array();
		this.width = 100;
		this.lives = 5;
		this.friction = .99;
		this.frame = 0;
		this.frameDelay = 0;
		this.frameDelayInc = 1/32;
		this.velocx = this.velocy = this.accelx = this.accely = this.friction = 0;
		console.log("New Harmon created at " + this.x + ", " + this.y);
	},
	
	draw : function(ctx)
	{
		var half = this.width/2;
		
		if(this.image == undefined)
		{
			//filler rect
			game.draw.rect(ctx , 0, 0, 100, 100,this.x - half, this.y - half, this.width, this.width, "white");
		}
		else
		{
			//console.log("Image {" + this.image + "} " + this.x+", " + this.y);
			ctx.drawImage(this.image,0, 0  + (this.frame * this.width),100,100, this.x - half, this.y - half, this.width, this.width);
		}
		
		this.drawBullets(ctx);
		// draw bullets

		//update death cooldown
		if(this.deathCooldown < this.MAX_DEATH_COOLDOWN && this.deathCooldown > 0)
		{
			this.deathCooldown --;
		}
		else if(this.deathCooldown == 0)
		{
			this.deathCooldown = this.MAX_DEATH_COOLDOWN;
		}
		
	},
	
	// Makes a bullet and adds it to the bullets array (private)
	createBullet : function(x_, y_, width_, speed_) 
	{
		var b_ = {x: x_, y:y_, width : width_, speed: speed_};
		
		this.lazers.push(b_);
	},
	
	drawBullets : function(ctx)
	{
	
		if(this.lazers.length == 0){ //no lazers 
		}
		else
		{
			for(var i = 0; i< this.lazers.length; i++)
			{
				//console.log("Drawing lazer " + i);
				game.draw.rect(ctx, this.lazers[i].x - this.lazers[i].width/2, this.lazers[i].y, this.lazers[i].width, this.LAZER_WIDTH, "red");	
				this.lazers[i].y -= this.lazers[i].speed;
			//game.draw.rect(ctx, this.lazers[i].x, this.lazers[i].y, 20,20, "white");
				
			
				if(this.lazers[i].y <= 0)
				{
					// remove lazers that are off the screen
					this.lazers.splice(i, 1);
				}
				
			}
		}
			
	},
	
	update : function()
	{
		//console.log("velocity: " + this.velocx + ", " + this.velocy + " state: " + this.SQUIDSTATE );


		
		
		// Handles animation 
		if(this.SQUIDSTATE == this.STATE_IDLE)
		{
			//console.log("Idling");
			
			// if we need to rollover
			if(this.frameDelay == 1)
			{
				// Next frame
				if( (this.frame + 1) > this.NUM_FRAMES -1)
				{
					this.frame = 0;
					this.frameDelay = 0;
				}
				else
				{
					// or reset
					this.frame++;
					this.frameDelay = 0;
				}
			}
			// if we don't
			else
			{
				this.frameDelay += this.frameDelayInc;
			}
			
		}
		else if(this.SQUIDSTATE == this.STATE_SHOOM)
		{
			this.frame = 0;
			if(this.velocy >= -.3 && this.velocy !=0)
			{
				this.SQUIDSTATE = this.STATE_IDLE;
				console.log("switching state");
				this.velocx = this.velocy = 0;	
			}
		}
		else if(this.SQUIDSTATE == this.STATE_STRAFE_LEFT || this.STATE_STRAFE_RIGHT == this.SQUIDSTATE)
		{
			this.frame = 0;
			if(this.velocx >= -.3 || this.velocx <= .3)
			{
				this.SQUIDSTATE = this.STATE_IDLE;
			
			}
		}
		else if(this.SQUIDSTATE == this.STATE_DRAG)
		{
			this.frame = 2;
			if(this.velocy <= .3 && this.velocy !=0)
			{
				console.log("switching state");
				this.SQUIDSTATE = this.STATE_IDLE;
				this.velocx = this.velocy = 0;
				
			}
		}
		else if(this.SQUIDSTATE == this.STATE_POWERUP)
		{
			this.frame = 3;
		}
		
		else if(this.SQUIDSTATE == this.STATE_FIRE)
		{
			if(this.curFireDelay < this.fireDelay)
			{
				this.curFireDelay ++;
			}
			else if(this.curFireDelay == this.fireDelay)
			{
				this.curFireDelay = 0;
				this.SQUIDSTATE = this.STATE_IDLE;
			}
		}
		
		
		// physics stuff
		this.friction = .95;
		this.velocx *= this.friction;
		this.velocy *= this.friction;
		
		this.x += this.velocx; 
		this.y += this.velocy;
	},
	
	shoom : function(dt)
	{
		console.log("should play sound");
		if(this.SQUIDSTATE != this.STATE_SHOOM)
		{
			var sh = createjs.Sound.play("shoom", {loop:0, volume:1});
			sh.play();
		}
		this.velocy = -(this.BOOST_AMT_VERT);
		this.SQUIDSTATE = this.STATE_SHOOM;
	},
	
	strafeRight : function(dt)
	{
		if(this.SQUIDSTATE == this.STATE_POWERUP){ return; }
		this.velocx = (this.BOOST_AMT_HORZ);
		this.SQUIDSTATE = this.STATE_STRAFE_RIGHT;
	},
	
	strafeLeft : function(dt)
	{
	if(this.SQUIDSTATE == this.STATE_POWERUP){ return; }
		this.velocx = -(this.BOOST_AMT_HORZ);
		this.SQUIDSTATE = this.STATE_STRAFE_LEFT;
	},
	
	drag : function(dt)
	{
		this.velocy = this.BOOST_AMT_HORZ;
		this.SQUIDSTATE = this.STATE_DRAG;
	},
	

	charge : function(dt)
	{
		console.log("Chargin....");
		this.powerupIndex++;
		this.SQUIDSTATE = this.STATE_POWERUP; 
	},
	
	fire : function(dt)
	{
		// release the kraken -- err, lazer.
		console.log("Fire: " + this.powerupIndex);
		var sh = createjs.Sound.play("l1", {loop:0, volume:1});
		this.SQUIDSTATE = this.STATE_FIRE;
		this.frame = 0;
		
		// add a lazer to the lazers
		var half = this.width/2;
		if(this.powerupIndex > this.LAZER_WIDTH)
		{
			this.createBullet(this.x, this.y-half, this.powerupIndex, this.LAZER_SPEED)
		}
		else
		{
			this.createBullet(this.x, this.y-half, this.LAZER_WIDTH, this.LAZER_SPEED);
		}
		this.powerupIndex = 0;
	},
	
	takehit : function()
	{
		if(this.lives <= 0) { this.die(); }
		if(this.deathCooldown < this.MAX_DEATH_COOLDOWN)
		{
			// don't take the hit, we're still recovering
			console.log("still recovering: " + this.deathCooldown + "/ "  + this.MAX_DEATH_COOLDOWN);
		}
		
		else if(this.deathCooldown == this.MAX_DEATH_COOLDOWN)
		{
			var d= createjs.Sound.play("death", {loop:0, volume:1});
			d.play();
			console.log("Took the hit.");
			this.lives--;
			
			if(this.lives == 0)
			{ 
				this.die(); 
			}
			
			else{
			
				this.deathCooldown--; // start timer
			}
		}
	},
	
	die : function()
	{
		game.lazersquid.gameover = true;
		console.log("dead");
		
	}
	
};