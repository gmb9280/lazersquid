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
	
	jellyfishes : undefined, 
	
	bgimg : undefined,
	paused : true,
	gameover : false,
	score : 0,
	
	stage : 0,
	
	curSong : "bgm1",
	
	stageCounter : 1000, 
	
	curStageCtr : 0,
	
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
		this.gameover = false;



		this.jellyfishes = game.jellyfishes;
		
		var jimg = new Image();
		jimg.src = game.IMAGES['jellyImg'];
		this.jellyfishes.image = jimg;
		this.jellyfishes.init();
		// bgm
		
		this.doBGM(this.curSong);
		// Draw the screen
		this.update();
	},
	
	
	checkCollisions : function()
	{
		// check all jellies 
		for(var i = 0; i < this.jellyfishes.enemies.length; i++)
		{
			// vs bullets
			for(var j = 0; j < this.harmon.lazers.length; j++)
			{
				
				if( this.harmon.lazers[j].x - (this.harmon.lazers[j].width/2) >
					this.jellyfishes.enemies[i].x - (this.jellyfishes.width/2)  &&
					this.harmon.lazers[j].x + (this.harmon.lazers[j].width/2) <
					this.jellyfishes.enemies[i].x + (this.jellyfishes.width/2) )
					{
						// check y
						if( this.harmon.lazers[j].y - (this.harmon.lazers[j].width/2) >
						this.jellyfishes.enemies[i].y - (this.jellyfishes.width/2)  &&
						this.harmon.lazers[j].y + (this.harmon.lazers[j].width/2) <
						this.jellyfishes.enemies[i].y + (this.jellyfishes.width/2) )
						{
							this.jellyfishes.enemies[i].alive = false; // bullet collided
							this.score += 5;
							var s= createjs.Sound.play("pow", {loop:0, volume:1});
							s.play();
							console.log("HIT!");
						}
						
					} // end check for bullet
			} // end check all bullets
			
			// check jellyfish vs. harmon
			
			if(this.harmon.x -  this.jellyfishes.enemies[i].x < this.harmon.width/2 
				&& this.harmon.x -  this.jellyfishes.enemies[i].x > -(this.harmon.width/2) )
					{
						if(this.harmon.y -  this.jellyfishes.enemies[i].y < this.harmon.width/2 
							&& this.harmon.y - this.jellyfishes.enemies[i].y > - (this.harmon.width/2))
						{
							this.harmon.takehit();							
						}
					}
			
		}
	},
	
	update : function()
	{
		game.draw.clear(this.ctx, 0,0, this.WIDTH, this.HEIGHT);
		
		if(this.gameover == true)
		{
			//console.log("Drawing gameoverscreen?");
			this.drawGameOverScreen(this.ctx);
			return;
		}
		if (game.paused)
		{
			console.log("paused");
			this.drawPauseScreen(this.ctx);
			return;
		}
		this.curStageCtr ++;
		if(this.curStageCtr == this.stageCounter)
		{
			this.stage ++;
			this.jellyfishes.MAX_JELLIES += 2;
			this.jellyfishes.speed += .2;
			//console.log("Advanced to stage: " + this.stage);
			
			if(this.stage == 3)
			{
				this.endBGM();
				this.doBGM("bgm2");
			}
			else if(this.stage == 8)
			{
				this.endBGM();
				this.doBGM("bgm3");
			}
			this.curStageCtr = 0;
		}
		this.checkCollisions();
		this.drawBG();
		this.jellyfishes.draw(this.ctx);
		this.drawSprites();
		this.moveSprites() ; 
		this.drawHUD();
		game.animationID = requestAnimationFrame(this.update.bind(this));
	},
	
	reset : function(ctx)
	{
		this.endBGM();
		this.doBGM("bgm1");
		this.stage = 0;
		console.log("reset called");
		this.harmon.reset();
		this.jellyfishes.reset();
		this.gameover = false;
		this.drawPauseScreen(this.ctx);
	},
	
	drawPauseScreen : function(ctx)
	{
		ctx.save();
		this.drawBG();
		//game.draw.backgroundGradient(this.ctx, this.WIDTH, this.HEIGHT);
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		game.draw.text(this.ctx, "PAUSED", this.WIDTH/2, this.HEIGHT/2, 60, "white");
		ctx.restore();
	},
	
	drawGameOverScreen : function(ctx)
	{
		// no need to save ctx
		
		this.drawBG();
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		game.draw.text(this.ctx, "Game Over! Score: " + this.score , this.WIDTH/2, this.HEIGHT/2, 30, "white");
		game.draw.text(this.ctx, "too bad, you can't play again!" , this.WIDTH/2, this.HEIGHT/2 + 70, 20, "white");
		
		if(game.keydown)
		{
				//this.reset();
		}
	},
	
	drawSprites : function()
	{
		this.harmon.draw(this.ctx); // some problem here
	},
	
	
	doBGM : function(songname)
	{
		createjs.Sound.play(songname, {loop:-1, volume:0.3});
		this.curSong = songname;
	},
	
	endBGM : function()
	{
		createjs.Sound.stop(this.curSong);
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
			this.ctx.drawImage(this.bgimg, 0,0, this.WIDTH, this.HEIGHT); 
			//this.game.draw.backgroundGradient(this.ctx, this.WIDTH, this.HEIGHT);
			}
	},
	
	drawHUD : function()
	{
		// draw HUD bg
		
		game.draw.rect(this.ctx, 0,0,this.WIDTH, 30, "white");
	
		this.ctx.textAlign = "left";
		game.draw.text(this.ctx, "Lives: " + this.harmon.lives, 5, 20, 20, "black");
		
		this.ctx.textAlign = "center";
		game.draw.text(this.ctx, "Stage: " + this.stage, this.WIDTH/2, 20, 20, "black");
		
		this.ctx.textAlign = "right"; 
		game.draw.text(this.ctx, "Score: " +this.score, this.WIDTH - 5, 20,20, "black");
	}
};