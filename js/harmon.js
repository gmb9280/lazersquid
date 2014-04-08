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
	
	init : function()
	{
		this.x = 300;
		this.y = 500;
		this.width = 100;
		this.velocx = this.velocy = this.accelx = this.accely = this.friction = 0;
		console.log("New Harmon created at " + this.x + ", " + this.y);
	},
	
	draw : function(ctx)
	{
		var half = this.width/2;
		
		if(this.image == undefined)
		{
			//filler rect
			game.draw.rect(ctx,0,0,100, 100,this.x - half, this.y - half, this.width, this.width, "white");
		}
		else
		{
		console.log("Image {" + this.image + "} " + this.x+", " + this.y);
			ctx.drawImage(this.image,0,100,100,100, this.x - half, this.y - half, this.width, this.width);
		}
		
	}
	

	
	
};