(function (global) {
    "use strict";
        
    var launcher = ctor,
        p = launcher.prototype,
        points = [-30, 18, 30, 18, 28, 14, 24, 14, 22, 12, 14, -10, 12, -12, 10, -12, 8, -8, -8, -8, -10, -10, -14, -12, -18, -10, -24, 2, -26, 2, -28, 4, -30, 18];
    
    function ctor(x, y) {
        this.width = 60;
        this.height = 30;
        this.pos = {
            x: x,
            y: y
        };
        this.missilesLeft = 10;
    }
    
    p.update = function(ts) {
        
    };
    
    p.render = function(ctx) {
        ctx.save();
        ctx.fillStyle = '#ffff00';
        ctx.drawPolygon(points, this.pos.x, this.pos.y);
        
        ctx.fillStyle = (this.missilesLeft <= 5) ? '#f00' : '#000';
        ctx.font = '14px monospace';
        ctx.textAlign = 'center';
        
        var msg = (this.missilesLeft === 0) ? 'OUT' : this.missilesLeft;
        ctx.fillText(msg, this.pos.x, this.pos.y + 10);
        
        ctx.restore();
        
        
    };
    
    global.Launcher = launcher;
}(window));