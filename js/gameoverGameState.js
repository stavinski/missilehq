(function (global) {
    "use strict";
    
    var gameOverState = function () {},
        p = gameOverState.prototype;
    
    p.handleInputs = function () {};
    p.update = function (ts) {};
    p.render = function () {};
        
    global.GameoverGameState = gameOverState;
}(window));