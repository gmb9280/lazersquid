// Harmon.js - represents the playable character of Lazersquid

"use strict";

var game = game || {};

game.harmon = 
{
	x : game.WIDTH/2,
	y : game.HEIGHT/2,
	width : 100, 
	height : 100,
	lives: 5,
	
	// physics stuff
	velocx : 0,
	velocy : 0,
	accelx : 0,
	accely : 0,
	
	BOOST_AMT_HORZ : 3, // amount that Harmon will move at a time in the X
	BOOST_AMT_VERT : 6, // amount that Harmon will move at a time in the Y (shoom!)
	
	image : undefined,
	
	lazer : undefined, 
	
	STATE_IDLE : 0,
	STATE_SHOOM : 1,
	STATE_DRAG : 2,
	STATE_STRAFE_LEFT : 3, 
	STATE_STRAFE_RIGHT : 4,
	STATE_POWERUP : 5,
	STATE_FIRE : 6,
	
	SQUIDSTATE: 0,
	
	lazers : [],
	
	fireDelay : 3,
	
	curFireDelay : 0,
	frame : 0,
	
	friction: .8,
	
	NUM_FRAMES : 2,
	
	frameDelay : 1/5,
	
	frameDelayInc : 1/5,
	
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
		
	},
	
	update : function()
	{
		//console.log("velocity: " + this.velocx + ", " + this.velocy + " state: " + this.SQUIDSTATE );

		// handles lazers
		if(this.lazers.length == 0){ //no lazers 
		}
		else
		{
			for(var i = 0; i< this.lazers.length; i++)
			{
				console.log(i + "/" + this.lazers.length + " lazers...");
			}
		}
		
		
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
		var sh = createjs.Sound.play("shoom", {loop:0, volume:1});
		sh.play();
		this.velocy = -(this.BOOST_AMT_VERT);
		this.SQUIDSTATE = this.STATE_SHOOM;
	},
	
	strafeRight : function(dt)
	{
		this.velocx = (this.BOOST_AMT_HORZ);
		this.SQUIDSTATE = this.STATE_STRAFE_RIGHT;
	},
	
	strafeLeft : function(dt)
	{
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
		this.SQUIDSTATE = this.STATE_POWERUP; 
	},
	
	fire : function(dt)
	{
		// release the kraken -- err, lazer.
		console.log("Fire");
		var sh = createjs.Sound.play("l1", {loop:0, volume:1});
		this.SQUIDSTATE = this.STATE_FIRE;
		this.frame = 0;
		
		// add a lazer to the lazers
		//this.lazers.add(var 
	}
	
};