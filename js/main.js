(function (global) {
    "use strict";
        
    global.addEventListener('load', function () {
        FastClick.attach(document.body);
        Game.initialize();
    });
}(window));