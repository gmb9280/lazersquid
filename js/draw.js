// DRAW

"use strict";

var game = game || {};

game.draw = 
{ 
	clear: function(ctx, x,y,w,h)
	{
		ctx.clearRect(x,y,w,h);
	},
	
	rect: function(ctx,x,y,w,h,col)
	{
		ctx.fillStyle = col;
		ctx.fillRect(x,y,w,h);
	},
	
	text: function(ctx, string, x,y,size, col)
	{
		ctx.font = size+'px Verdana';
		ctx.fillStyle = col;
		ctx.fillText(string, x,y);
	},
	
	backgroundGradient: function(ctx, width, height)
	{
		// Create gradient
		//var grd = ctx.createLinearGradient(width/2, 0, width/2, height);
		
		//grd.addColorStop(0, '#48cfa9'); 
		//grd.addColorStop(1, '#134045');
		
		//ctx.fillStyle= "black";
		//ctx.fillRect(0,0,width,height);
	}
}