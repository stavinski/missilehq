(function (global) {
    "use strict";
    
    function handleClick(evt) {
        
    }
    
    var ctor = function () {
        Input.registerForClickEvent(handleClick);
    };
    
    var startState = ctor,
        p = startState.prototype;
        
    p.update = function (ts) {
    
    };
    
    p.render = function () {
        
    };
    
    global.StartGameState = startState;
}(window));