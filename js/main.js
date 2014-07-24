(function (global) {
    "use strict";
        
    global.addEventListener('load', function () {
        FastClick.attach(document.body);
        
        Sounds.initialize(function () {
            Game.initialize();
        });
    });
}(window));