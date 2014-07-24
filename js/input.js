(function (global) {
    "use strict";
    
    var clickEventSubjects = [];
    
    function listenForInput(canvas) {
        canvas.canvasElm.addEventListener('mousedown', function (evt) {            
            raiseClickEvent(evt, canvas);
            evt.preventDefault();
            return false;
        }, false);
        
        canvas.canvasElm.addEventListener('touchstart', function (evt) {
            raiseClickEvent(evt, canvas);
            evt.preventDefault();       
            return false;
        }, false);
        
        canvas.canvasElm.addEventListener('touchmove', function (evt) {
            evt.preventDefault();
            return false;
        }, false);
        canvas.canvasElm.addEventListener('touchend', function (evt) {
            evt.preventDefault();
            return false;
        }, false);
    }
    
    function raiseClickEvent(evt, canvas) {
        var clickEvent = {
            x: (evt.pageX - canvas.offset.left) / canvas.scale,
            y: (evt.pageY - canvas.offset.top) / canvas.scale
        };

        for (var i=0, len=clickEventSubjects.length; i < len; i++) {
            clickEventSubjects[i](clickEvent);
        }
    }
    
    var input = {
        initialize: function (canvas) {
            listenForInput(canvas);          
        },
        registerForClickEvent: function (cb) {
            clickEventSubjects.push(cb);
        }
    };
        
    global.Input = input;
}(window));