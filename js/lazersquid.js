"use strict";

var game = game || {};

game.lazersquid = 
{
	// Constant properties
	WIDTH: 640,
	HEIGHT: 760,
	
	// variable properties
	canvas : undefined,
	ctx : undefined,
	dt : 1/60.0,
	harmon : undefined,
	
	lazer : undefined,
	
	paused : false,
	
	init : function()
	{
		this.canvas = document.querySelector('canvas');
		
		this.canvas.width = this.WIDTH; 
		this.canvas.height = this.HEIGHT; 
		
		this.ctx = this.canvas.getContext('2d');
		
		// set up Harmon
		var img = new Image();
		
		img.src = game.IMAGES['harmonImg'];
		
		this.harmon = game.harmon;
		this.harmon.image = img;
		this.harmon.init();
		
		// set up Lazer
		
		// Draw the screen
		this.update();
	},
	
	update : function()
	{
		
		game.draw.clear(this.ctx, 0,0, this.WIDTH, this.HEIGHT);
		
		if (game.paused)
		{
			console.log("paused");
			this.drawPauseScreen(this.ctx);
			return;
		}


		/*
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
		
		this.drawSprites();
		
		this.drawHUD();
	},
	
	drawPauseScreen : function(ctx)
	{
		ctx.save();
		game.draw.backgroundGradient(this.ctx, this.WIDTH, this.HEIGHT);
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		game.draw.text(this.ctx, "PAUSED", this.WIDTH/2, this.HEIGHT/2, 60, "white");
		ctx.restore();
	},
	
	drawSprites : function()
	{
		this.harmon.draw(this.ctx);
	},
	
	moveSprites : function()
	{
	},
	
	drawHUD : function()
	{
	
	}
};