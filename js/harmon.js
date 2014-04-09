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
	
	friction : 0,
	
	BOOST_AMT_HORZ : 1, // amount that Harmon will move at a time in the X
	BOOST_AMT_VERT : 2, // amount that Harmon will move at a time in the Y (shoom!)
	
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
	
	frame : 0,
	
	NUM_FRAMES : 2,
	
	frameDelay : 1/5,
	
	frameDelayInc : 1/5,
	
	init : function(_x,_y)
	{
		this.width = 100;
		this.x = _x;
		this.y = _y;
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
		// Handles animation 
		if(this.SQUIDSTATE == this.STATE_IDLE)
		{
			console.log("Idling");
			
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
		}
		else if(this.SQUIDSTATE == this.STATE_STRAFE_LEFT || this.STATE_STRAFE_RIGHT == this.SQUIDSTATE)
		{
			this.frame = 0;
		}
		else if(this.SQUIDSTATE == this.STATE_DRAG)
		{
			this.frame = 2;
		}
		else if(this.SQUIDSTATE == this.STATE_POWERUP)
		{
			this.frame = 3;
		}
	}
	

	
	
};