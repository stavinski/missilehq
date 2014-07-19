(function (global) {
    "use strict";
        
    var launcher = ctor,
        p = launcher.prototype;
    
    function ctor(x, y) {
        this.pos = {
            x: x,
            y: y
        };
        this.missilesLeft = 10;
    }
    
    p.update = function(ts) {
        
    };
    
    p.render = function(ctx) {
       
    };
    
    global.Launcher = launcher;
}(window));