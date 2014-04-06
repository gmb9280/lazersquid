"use strict";

var game = game || {};

game.lazersquid = 
{
	// Constant properties
	WIDTH: 640,
	HEIGHT: 860,
	
	// variable properties
	canvas : undefined,
	ctx : undefined,
	dt : 1/60.0,
	harmon : undefined,
	
	lazer : undefined,
	
	init : function()
	{
		this.canvas = document.querySelector('canvas');
		
		this.canvas.width = this.WIDTH; 
		this.canvas.height = this.HEIGHT; 
		
		this.ctx = this.canvas.getContext('2d');
		
		// set up Harmon
		
		// set up Lazer
		
		// Draw the screen
		this.update();
	},
	
	update : function()
	{
		/*
		game.draw.clear(this.ctx, 0,0, this.WIDTH, this.HEIGHT);
		
		// if (paused)
		{
			this.drawPauseScreen(this.ctx);
			return;
		}
		
		// move sprites and such
		this.moveSprites();
		
		this.checkCollisions();
		
		
		// Draw the screen at last 
		
		game.draw.backgroundGradient(this.ctx, this.WIDTH, this.HEIGHT);
		
		this.drawSprites();
		
		// Draw HUD
		drawHUD();
		
		// Loop - calls update at 60fps
		
		
		*/
		game.draw.backgroundGradient(this.ctx, this.WIDTH, this.HEIGHT);
		console.log("Drawing");
		game.animationID = requestAnimationFrame(this.update.bind(this));
		
	},
	
	drawPauseScreen : function(ctx)
	{
	
		ctx.save();
		game.draw.backgroundGradient(this.ctx, this.WIDTH, this.HEIGHT);
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		game.draw.text(this.ctx, "PAUSED", this.WIDTH/2, this.HEIGHT/4, 60, "black");
		ctx.restore();
	},
	
	drawSprites : function()
	{
	},
	
	moveSprites : function()
	{
	}
};