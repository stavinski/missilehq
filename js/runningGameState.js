(function (global) {
    "use strict";
    
    var missiles = [];
        
    function handleClick(evt) {
        var m = new Missile(Canvas.width*0.5, Canvas.height -10, evt.x, evt.y, MissileTypes.FRIENDLY, 2);
        missiles.push(m);
    }
    
    var ctor = function () {
        Input.registerForClickEvent(handleClick);
    };
    
    var runningState = ctor,
        p = runningState.prototype;
        
    p.update = function (ts) {
        
        for (var i=0, len = missiles.length; i < len; i++) {
            var missile = missiles[i];
            
            if ((missile.detonated) || (missile.remove)) {
                missiles.splice(i, 1);
                i--;
                len--;
            } else {
                missile.update(ts);
            }
        }
    };
    
    p.render = function (ctx) {
        ctx.clearAll();
        
        for (var i=0, len = missiles.length; i < len; i++) {
            missiles[i].render(ctx);
        }
    };
    
    global.RunningGameState = runningState;
}(window));