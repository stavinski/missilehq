(function (global) {
    "use strict";
    
    var missiles = [],
        blasts = [],
        cities = [],
        launcher = 0,
        lastMissileFired = 0;
        
    function handleClick(evt) {
        var m = new Missile(Canvas.width*0.5, Canvas.height - 20, evt.x, evt.y, MissileTypes.FRIENDLY, 3);
        missiles.push(m);
    }
    
    var ctor = function () {
        Input.registerForClickEvent(handleClick);
    };
    
    var runningState = ctor,
        p = runningState.prototype;
        
    p.update = function (ts) {
        lastMissileFired++;
        
        if (lastMissileFired > Math.floor(Math.random() * (500 - 100 + 1)) + 100) {
            lastMissileFired = 0;
            var m = new Missile(Math.random()*Canvas.width, 1, Math.random()*Canvas.width, Canvas.height - 20, MissileTypes.ENEMY, 0.6);
            missiles.push(m);
        }
        
        for (var i=0, len = missiles.length; i < len; i++) {
            var missile = missiles[i];
            
            blasts.forEach(function (blast) {
                // ignore friendly fire
                if ((blast.type === MissileTypes.FRIENDLY) && (missile.type === MissileTypes.FRIENDLY)) {
                    return;
                }
                    
                // use the center of the missile as the intersect point
                if (blast.intersects(missile.pos.x + missile.width*0.5, missile.pos.y + missile.height*0.5)) {
                    missile.detonated = true;
                }
            });
            
            if ((missile.detonated) || (missile.remove)) {
                missiles.splice(i, 1);
                i--;
                len--;
                
                if (missile.detonated) {
                    var b = new Blast(missile.pos.x, missile.pos.y, missile.type);
                    blasts.push(b);
                }
            } else {
                missile.update(ts);
            }
        }
        
        for (var j=0, len2 = blasts.length; j < len2; j++) {
            var blast = blasts[j];

            if (blast.remove) {
                blasts.splice(j, 1);
                len2--;
                j--;
            } else {
                blast.update(ts);
            }
        }
        
    };
    
    p.render = function (ctx) {
        ctx.clearAll();
        
        // draw landscape
        ctx.save();
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(0, Canvas.height - 20, Canvas.width, 20);
        ctx.fill();
        ctx.restore();
        
        for (var i=0, len = missiles.length; i < len; i++) {
            missiles[i].render(ctx);
        }
        
        for (var j=0, len2 = blasts.length; j < len2; j++) {
            blasts[j].render(ctx);
        }
    };
    
    global.RunningGameState = runningState;
}(window));