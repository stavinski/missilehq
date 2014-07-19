(function (global) {
    "use strict";
    
    var clickEventSubjects = [];
    
    function listenForInput(canvasElm) {
        canvasElm.addEventListener('mousedown', function (evt) {
            raiseClickEvent(evt);
            evt.preventDefault();
            return false;
        });
    }
    
    function raiseClickEvent(evt) {
        var clickEvent = {
            x: evt.offsetX,
            y: evt.offsetY
        };

        for (var i=0, len=clickEventSubjects.length; i < len; i++) {
            clickEventSubjects[i](clickEvent);
        }
    }
    
    var input = {
        initialize: function (canvasElm) {
            listenForInput(canvasElm);          
        },
        registerForClickEvent: function (cb) {
            clickEventSubjects.push(cb);
        }
    };
        
    global.Input = input;
}(window));