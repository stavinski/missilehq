(function (global) {
    "use strict";
    
    var points = {
        ACTIVE: [-30, 18, 30, 18, 28, 14, 24, 14, 22, 12, 14, -10, 12, -12, 10, -12, 8, -8, -8, -8, -10, -10, -14, -12, -18, -10, -24, 2, -26, 2, -28, 4, -30, 18],
        DESTROYED: [-30, 18, 30, 18, 28, 14, 24, 12, 20, 10, 14, 12, 12, 12, 8, 8, 6, 8, 2, 6, 0, 8, 0, 12, -2, 14, -6, 12, -8, 8, -8, 4, -12, 0, -16, 2, -18, 10, -20, 10, -22, 12, -24, 8, -26, 6, -28, 6, -30, 18]
    };
    
    var launcher = ctor,
        p = launcher.prototype;
    
    function ctor(x, y) {
        this.width = 60;
        this.height = 30;
        this.pos = {
            x: x,
            y: y
        };
        
        this.reset();
    }
    
    p.destroyed = function() {
        this.active = false;
        this.missilesLeft = 0;
    };
    
    p.reset = function() {
        this.active = true;
        this.missilesLeft = 10;
    };
    
    p.update = function(ts) {
        
    };
    
    p.render = function(ctx) {
        var p = (this.active) ? points.ACTIVE : points.DESTROYED;
        
        ctx.save();
        ctx.fillStyle = '#ffff00';
        ctx.drawPolygon(p, this.pos.x, this.pos.y);
        
        if (this.active) {
            ctx.fillStyle = (this.missilesLeft <= 5) ? '#f00' : '#000';
            ctx.font = '14px monospace';
            ctx.textAlign = 'center';

            var msg = (this.missilesLeft === 0) ? 'OUT' : this.missilesLeft;
            ctx.fillText(msg, this.pos.x, this.pos.y + 10);
        }
        
        ctx.restore();
    };
    
    global.Launcher = launcher;
}(window));