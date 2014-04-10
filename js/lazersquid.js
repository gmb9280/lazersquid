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
	
	bgimg : undefined,
	paused : false,
	
	fixed : false,
	
	score : 0,
	init : function()
	{
		this.canvas = document.querySelector('canvas');
		
		this.canvas.width = this.WIDTH; 
		this.canvas.height = this.HEIGHT; 
		
		this.ctx = this.canvas.getContext('2d');
		this.score = 0;
		// set up Harmon
		var img = new Image();
		
		img.src = game.IMAGES['harmonImg'];
		
		this.harmon = game.harmon;
		this.harmon.image = img;
		this.harmon.init(this.WIDTH/2, this.HEIGHT/2);
		
		var bgimg = new Image();
		bgimg.src = game.IMAGES['bg'];
		this.bgimg = bgimg;
		
		// set up Lazer
		
		// Draw the screen
		this.update();
	},
	
	update : function()
	{
		if(this.fixed == false){ this.paused =true;}
		
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
		//game.draw.backgroundGradient(this.ctx, this.WIDTH, this.HEIGHT);
		this.drawBG();
		//console.log("Drawing");
		game.animationID = requestAnimationFrame(this.update.bind(this));
		
		this.drawSprites();
		this.moveSprites() ;
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
		if(game.keydown[game.KEYBOARD.KEY_LEFT])
		{
			this.harmon.strafeLeft(this.dt);
		}
		if(game.keydown[game.KEYBOARD.KEY_RIGHT])
		{
			this.harmon.strafeRight(this.dt);
		}
		if(game.keydown[game.KEYBOARD.KEY_UP])
		{
			this.harmon.shoom(this.dt);
		}
		if(game.keydown[game.KEYBOARD.KEY_DOWN])
		{
			this.harmon.drag(this.dt);
		}
		if(game.keydown[game.KEYBOARD.KEY_SPACE])
		{
			this.harmon.charge(this.dt);
		}
		if(this.harmon.SQUIDSTATE == this.harmon.STATE_POWERUP && (!game.keydown[game.KEYBOARD.KEY_SPACE]))
		{
			// fire
			this.harmon.fire(this.dt);
		}

		
		//keep Harmon on screen
		// clamp(val, min, max);
		var paddingX = this.harmon.width/2;
		this.harmon.x = game.utilities.clamp(this.harmon.x, paddingX, this.WIDTH - paddingX);
		
		var paddingY = this.harmon.height/2;
		this.harmon.y = game.utilities.clamp(this.harmon.y, paddingY, this.HEIGHT - paddingY);

	
	
		this.harmon.update();
	},
	
	drawBG : function()
	{
		if(!this.bgimg)
		{
			this.game.draw.backgroundGradient(this.ctx, this.WIDTH, this.HEIGHT);
		}
		else{
		this.ctx.drawImage(this.bgimg, 0,0, this.WIDTH, this.HEIGHT); }
	},
	
	drawHUD : function()
	{
		this.ctx.textAlign = "left";
		game.draw.text(this.ctx, "Lives: " + this.harmon.lives, 5, 20, 20, "black");
		
		this.ctx.textAlign = "right"; 
		game.draw.text(this.ctx, "Score: " +this.score, this.WIDTH - 5, 20,20, "black");
	}
};