"use strict";

var game = game || {};

// CONSTANTS
game.KEYBOARD = {
	"KEY_LEFT": 37, 
	"KEY_UP": 38, 
	"KEY_RIGHT": 39, 
	"KEY_DOWN": 40,
	"KEY_SPACE": 32
};

game.IMAGES = 
{
	harmonImg : "js/imgs/harmon_spritesheet.png", 
	jellyImg : "js/imgs/jelly.png"
};



Modernizr.load(
	{
		load: 
		[
			'http://code.createjs.com/soundjs-0.5.2.min.js',
			'js/SoundLoader.js',
			'js/harmon.js',
			'js/draw.js',
			'js/utilities.js',
			'js/lazersquid.js',		
			
			game.IMAGES['harmonImg'],
			game.IMAGES['jellyImg']
		],
			
		complete: function()
		{
			console.log("Loading complete with Modernizr.");
			// and other stuff you might need upon everything having been loaded
			
			window.onblur = function()
			{
				game.paused = true;
				game.keydown = []; // clear key demon
				game.lazersquid.update(); // fAILS
			};
			
			window.onfocus = function()
			{
				game.paused = false;
				game.lazersquid.update();
			};
			
			// event listeners
			window.addEventListener("keydown",function(e){
				console.log("keydown=" + e.keyCode);
				game.keydown[e.keyCode] = true;
			});
				
			window.addEventListener("keyup",function(e){
				console.log("keyup=" + e.keyCode);
				game.keydown[e.keyCode] = false;
			});
			
			
			// init game
			game.lazersquid.init(); // fails
		},
		
		
	
	}
);