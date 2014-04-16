//jellyfish.js
// Describes all enemies
"use strict";

var game = game || {};

game.jellyfishes = 
{

	// properties go here
	image: undefined,
	
	enemies : [],
	
	speed : 1, 

	MAX_JELLIES : 3,
	
	cooldown : 30,
	MAX_COOLDOWN : 100,
	width: 70,
	
	// initializes
	init : function()
	{
		this.enemies = new Array();
		//console.log("Jellyfishes initialized. Ready to rumble!");
	},
	
	// reset (not used for now)
	reset : function()
	{
		this.speed = 1;
		this.MAX_JELLIES = 3;
		this.enemies = new Array();
		//console.log("jellies reset");
	},
	
	// draws all jellies and updates
	draw : function(ctx)
	{
		for(var i = 0; i<this.enemies.length; i++)
		{
			// delete those that are not alive or 
			// are past the height of the screen
			if(this.enemies[i].alive == false || this.enemies[i].y > game.lazersquid.HEIGHT)
			{
				this.enemies.splice(i, 1);
			}
			else
			{
				// Draw, you fools!! </Gandalf>
				if(this.image == undefined)
				{
					// filler rect
					game.draw.rect(ctx, this.enemies[i].x, this.enemies[i].y, this.width, this.width, "black");
				}
				else
				{
					var half = this.width/2;
					ctx.drawImage(this.image, this.enemies[i].x - half, this.enemies[i].y - half, this.width, this.width);
				}
				
				this.enemies[i].y += this.speed;
			}
		}
		
		// Spawn? 
		// update cooldown
		if(this.cooldown <= 0 && this.enemies.length < this.MAX_JELLIES)
		{
			this.cooldown = this.MAX_COOLDOWN;
			// spawn
			
			this.spawn(game.utilities.getRandom(this.width/2, game.lazersquid.WIDTH - (this.width/2)), 0);
			
		}
		else this.cooldown --;
		
	},
	
	// create new jelly-jelly :3
	spawn : function(x_, y_)
	{
		// create var
		var newjelly = { x: x_, y: y_ , alive : true};
		
		// add to array
		this.enemies.push(newjelly);
	}
	
	
};