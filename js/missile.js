(function (global) {
    "use strict";
    
    var missile = ctor,
        p = missile.prototype;   
   
    function ctor(sourceX, sourceY, destinationX, destinationY, type, speed) {
        this.width = this.height = 4;
        this.speed = speed;
        
        this.pos = {
            x: sourceX,
            y: sourceY
        };
        this.source = {
            x: sourceX,
            y: sourceY
        };
        
        this.destination = {
            x: Math.round(destinationX),
            y: Math.round(destinationY)
        };
        this.type = type;
        this.detonated = false;
        this.remove = false;
                
        var sdx = this.destination.x - this.source.x,
            sdy = this.destination.y - this.source.y,
            distance = Math.floor(Math.sqrt(sdx*sdx + sdy*sdy)),
            vx = sdx / distance,
            vy = sdy / distance;
        
        this.direction = {
            x: vx,
            y: vy,
            dist: distance
        };
    }
        
    p.update = function(ts) {
        // work out the distance that has been travelled
        var tx = Math.abs(this.source.x - this.pos.x),
            ty = Math.abs(this.source.y - this.pos.y),
            td = Math.floor(Math.sqrt(tx*tx + ty*ty));
        
        // reached detonation point
        if (td >= this.direction.dist) {
            this.detonated = true;
            return;
        }
                        
        // reached edge of screen
        if ((this.pos.x < 0) || (this.pos.x > Canvas.width) || (this.pos.y < 0) || (this.pos.y > Canvas.height)) {
            this.remove = true;
            return;
        }
        
        this.pos.x += this.direction.x * this.speed;
        this.pos.y += this.direction.y * this.speed;
    };
    
    p.render = function(ctx) {
        var color = (this.type === types.FRIENDLY) ? '#00f' : '#f00';
        
        ctx.save();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        ctx.beginPath();
        ctx.moveTo(this.source.x, this.source.y);
        ctx.lineTo(this.pos.x + this.width *0.5, this.pos.y + this.height *0.5);
        ctx.stroke();
        ctx.closePath();
        
        if (this.type == types.FRIENDLY) {
            var crosshairSize = 6;
            ctx.strokeStyle = '#fff';
            ctx.beginPath();

            ctx.moveTo(this.destination.x - crosshairSize, this.destination.y - crosshairSize);
            ctx.lineTo(this.destination.x + crosshairSize, this.destination.y + crosshairSize);

            ctx.moveTo(this.destination.x + crosshairSize, this.destination.y - crosshairSize);
            ctx.lineTo(this.destination.x - crosshairSize, this.destination.y + crosshairSize);

            ctx.stroke();
            ctx.closePath();
        }    
            
        ctx.restore();
    };
            
    var types = {
        FRIENDLY: 0,
        ENEMY: 1
    };
    
    global.Missile = missile;
    global.MissileTypes = types;
}(window));