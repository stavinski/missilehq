(function (global) {
    "use strict";
        
    var blast = ctor,
        p = blast.prototype;   
    
    function ctor(x, y, type) {
        this.radius = 1;
        this.maxRadius = 50;
        this.radIncrease = 1;
        this.pos = {
            x: x,
            y: y
        };
        this.type = type;
        this.remove = false;
    }
    
    p.update = function(ts) {
        if (this.radius >= this.maxRadius) {
            this.remove = true;
            return;
        }
        
        this.radius += this.radIncrease;
    };
    
    p.render = function(ctx) {
        ctx.save();
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    };
    
    p.intersects = function (x, y) {
        var vx = x - this.pos.x,
            vy = y - this.pos.y,
            distance = Math.sqrt(vx*vx + vy*vy);
                
        return (distance <= this.radius);
    };
    
    global.Blast = blast;
}(window));