(function (global) {
    "use strict";
    
    var endState = function () {},
        p = endState.prototype,
        points = [0,-3,2,-2,3,0,2,2,0,3,-2,2,-3,0,-2,-2,0,-3],
        currentRatio = 10,
        maxRatio = 100,
        elapsed = 0;
        
    p.update = function (ts) {
        elapsed += ts;
        
        if ((elapsed > 2000) && (currentRatio < maxRatio)) {
            elapsed = 0;
            var frameRate = ts / 1000;
            currentRatio += 2 * frameRate;
        }
    };
    
    p.render = function (ctx) {
        ctx.clearAll();
        
        // draw red background
        ctx.fillStyle = '#f00';
        ctx.fillRect(0, 0, Canvas.width, Canvas.height);
        
        ctx.save();
                
        // draw octogon
        ctx.fillStyle = '#ffff00';
        var ratioPoints = points.map(function (p) { return p * currentRatio; });
        ctx.drawPolygon(ratioPoints, Canvas.width*0.5, Canvas.height*0.5);
        
        ctx.restore();
        
        // draw text
        ctx.fillStyle = '#f00';
        ctx.font = currentRatio + 'px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('THE END', Canvas.width*0.5, Canvas.height*0.5);
    };
        
    global.EndGameState = endState;
}(window));