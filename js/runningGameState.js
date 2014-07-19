(function (global) {
    "use strict";
    
    var missiles = [],
        blasts = [],
        lastMissileFired = 0;
        
    function handleClick(evt) {
        var m = new Missile(Canvas.width*0.5, Canvas.height -10, evt.x, evt.y, MissileTypes.FRIENDLY, 1.3);
        missiles.push(m);
    }
    
    var ctor = function () {
        Input.registerForClickEvent(handleClick);
    };
    
    var runningState = ctor,
        p = runningState.prototype;
        
    p.update = function (ts) {
        lastMissileFired++;
        
        if (lastMissileFired > 100) {
            lastMissileFired = 0;
            var m = new Missile(Math.random()*Canvas.width, 1, Math.random()*Canvas.width, Canvas.height - 10, MissileTypes.ENEMY, 0.8);
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
        
        for (var i=0, len = missiles.length; i < len; i++) {
            missiles[i].render(ctx);
        }
        
        for (var j=0, len2 = blasts.length; j < len2; j++) {
            blasts[j].render(ctx);
        }
    };
    
    global.RunningGameState = runningState;
}(window));