

Modernizr.load(
	{
		load: [
			'http://code.createjs.com/soundjs-0.5.2.min.js',
			'js/SoundLoader.js',
			'js/lazersquid.js',
			'js/draw.js'
			],
			
		complete: function()
		{
			console.log("Loading complete with Modernizr.");
			// and other stuff you might need upon everything having been loaded
			// init game
			game.lazersquid.init();
		}
	
	}
);