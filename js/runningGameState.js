(function (global) {
    "use strict";
    
    var missiles = [],
        blasts = [],
        cities = [],
        launchers = [],
        game = null,
        level = 0,
        score = 0,
        enemyMissiles = (level * 0.5) + 20,
        lastMissileFired = 0,
        launchersDestroyed = 0;
        
    function handleClick(evt) {
        var idx = Math.floor(evt.x / (game.canvas.width / 3)),
            launcher = launchers[idx],
            nextIdx = idx;
        
        for (var i=0; i < 3; i++) {
            if (launcher.missilesLeft > 0) {
                var m = new Missile(launcher.pos.x, game.canvas.height - 50, evt.x, evt.y, MissileTypes.FRIENDLY, 3);
                missiles.push(m);
                launcher.missilesLeft--;
                break;
            }
            
            if (idx === 0) nextIdx++; // left
            if (idx === 2) nextIdx--; // right
            nextIdx = ((idx === 1) && (nextIdx === 1)) ? 0 : 2; // centre
            
            launcher = launchers[nextIdx];
        }
    }
    
    function resetLevel() {
        enemyMissiles = 20;
        level++;
        launchersDestroyed = 0;
        missiles = [];
        blasts = [];
        
        for (var i = 0, len = launchers.length; i < len; i++) {
            launchers[i].reset();
        }
    }
    
    var ctor = function (g) {
        game = g;
        Input.registerForClickEvent(handleClick);
        
        for (var i = 0; i < 3; i++) {
            var idx = i + 1;
            var l = new Launcher(game.canvas.width*(0.33 * idx) - 100, game.canvas.height - 45);
            launchers.push(l);
        }
        
        resetLevel();
    };
    
    var runningState = ctor,
        p = runningState.prototype;
        
    p.update = function (ts) {
        lastMissileFired++;
        
        if (lastMissileFired > Math.floor(Math.random() * (500 - 100 + 1)) + 100) {
            lastMissileFired = 0;
            var enemyTarget = launchers[Math.floor(Math.random()*3)],
                m = new Missile(Math.random()*game.canvas.width, 30, enemyTarget.pos.x, enemyTarget.pos.y - 10, MissileTypes.ENEMY, Math.min((level * 0.1) + 0.6, 2));
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
                    // if its a friendly missile blasting an enemy missile increase score
                    if ((missile.type === MissileTypes.ENEMY) && (blast.type === MissileTypes.FRIENDLY)) {
                        score += 200;
                        enemyMissiles--;
                    }
                    
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
        
        blasts.forEach(function (blast) {
            if (blast.type === MissileTypes.ENEMY) {
                launchers.forEach(function (launcher) {
                    if (blast.intersects(launcher.pos.x, launcher.pos.y - 10)) {
                        launcher.destroyed();
                    }
                });
            }
        });
            
        launchers.forEach(function (launcher) { 
            launcher.update(ts); 
        });
        
        if (enemyMissiles === 0) {
            resetLevel();
        }
    };
    
    p.render = function (ctx) {
        ctx.clearAll();
        
        // draw landscape
        ctx.save();
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(0, game.canvas.height - 30, game.canvas.width, 30);
        ctx.fill();
        ctx.restore();
        
        // draw hud
        ctx.fillStyle = '#0f0';
        ctx.font = '20px monospace';
        
        ctx.fillText('left: ' + enemyMissiles, game.canvas.width - 150, 20);
        ctx.fillText(score, 10, 20);
        ctx.textBaseline = 'middle';
        ctx.fillText('lvl: ' + level, game.canvas.width*0.5, 20);
        
        ctx.restore();   
        
        launchers.forEach(function (launcher) { 
            launcher.render(ctx); 
        });
        
        for (var i=0, len = missiles.length; i < len; i++) {
            missiles[i].render(ctx);
        }
        
        for (var j=0, len2 = blasts.length; j < len2; j++) {
            blasts[j].render(ctx);
        }
    };
    
    global.RunningGameState = runningState;
}(window));