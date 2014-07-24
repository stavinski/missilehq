(function (global) {
    "use strict";
    
    var Canvas = ctor,
        p = Canvas.prototype;
    
    function ctor(width, height) {
        this._rAF = null;
                
        this.RATIO = null;
        this.width = width;
        this.height = height;
        
        this.canvasElm = null;
        this.ctx = null;
        this.currentHeight = null;
        this.currentWidth = null;
        this.scale = 1;
        this.offset = null;
    }
    
    p.initialize = function () {
        this.RATIO = this.width / this.height;
        
        this.canvasElm = document.createElement('canvas');
        this.canvasElm.height = this.height;
        this.canvasElm.width = this.width;

        this.canvasElm.setAttribute('id', 'game');        
        this.ctx = (function (canvas, ctx) { 
            ctx.width = canvas.width;
            ctx.height = canvas.height;

            mixinClear(ctx);
            mixinDrawPolygon(ctx);

            return ctx;
        })(this, this.canvasElm.getContext('2d'));

        document.body.appendChild(this.canvasElm);
        
        this.resize();
    };
    
    p.animate = function (loop) {
        var requestAnimFrame = (function () {
            return global.requestAnimationFrame ||
                global.webkitRequestAnimationFrame ||
                global.mozRequestAnimationFrame ||
                global.oRequestAnimationFrame ||
                global.msRequestAnimationFrame ||
                function (cb) { global.setTimeout(cb, 1000 / 60); };
        })();

        var l = function (ts) {
            loop(ts);
            this._rAF = requestAnimFrame(l);
        };

        this._rAF = requestAnimFrame(l);
    };
    
    p.resize = function () {        
        this.currentHeight = global.innerHeight;
        this.currentWidth = this.currentHeight * this.RATIO;
        this.scale = this.currentWidth / this.width;
                
        this.canvasElm.style.width = this.currentWidth + 'px';
        this.canvasElm.style.height = this.currentHeight + 'px';

        this.offset = {
            left: this.canvasElm.offsetLeft,
            top: this.canvasElm.offsetTop
        };
        
        global.addEventListener('resize', this.resize.bind(this), false);
        global.addEventListener('orientation', this.resize.bind(this), false);
    };
        
    function mixinClear(ctx) {
        ctx.clearAll = function () {
            ctx.clearRect(0, 0, this.width, this.height);
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
        
    global.Canvas = Canvas;
}(window));