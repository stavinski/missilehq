(function (global) {
    "use strict";
    
    var rAF,
        width = 640,
        height = 320;
    
    function mixinClear(ctx) {
        ctx.clearAll = function () {
            ctx.clearRect(0, 0, width, height);
        };
    }
    
    function mixinDrawPolygon(ctx) {
        ctx.drawPolygon = function (p, x, y) {
            this.beginPath();
            this.moveTo(p[0] + x, p[1] + y);
            for (var i = 2, len = p.length; i < len; i += 2) {
                this.lineTo(p[i] + x, p[i + 1] + y);
            }
            this.fill(); 
            this.closePath();
        };
    }
        
    var canvas = {
        initialize: function () {
            var canvasElm = document.createElement('canvas');
            canvasElm.height = height;
            canvasElm.width = width;
            canvasElm.setAttribute('id', 'game');
            var context = (function (ctx) { 
                ctx.width = width;
                ctx.height = height;
                
                mixinClear(ctx);
                mixinDrawPolygon(ctx);
                
                return ctx;
            })(canvasElm.getContext('2d'));
            
            document.body.appendChild(canvasElm);
            Input.initialize(canvasElm);
            
            return context;
        },
        animate: function (loop) {
            rAF = (function () {
                return global.requestAnimationFrame ||
                    global.webkitRequestAnimationFrame ||
                    global.mozRequestAnimationFrame ||
                    global.oRequestAnimationFrame ||
                    global.msRequestAnimationFrame ||
                    function (cb) { global.setTimeout(cb, 1000 / 60); };
            })();
            
            var l = function (ts) {
                loop(ts);
                rAF(l);
            };
            rAF(l);
        },
        height: height,
        width: width
    };
    
    global.Canvas = canvas;
}(window));