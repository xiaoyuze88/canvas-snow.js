/**
 *   Code modified from http://thecodeplayer.com/walkthrough/html5-canvas-snow-effect
 *   
 *   Xiao Yuze(https://github.com/xiaoyuze88/canvas-snow.js)
 */

;(function(factory) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
        module.exports = factory();
    else if (typeof define == "function" && define.amd) // AMD
        return define([], factory);
    else // Plain browser env
        this.Snow = factory();
})(function() {

    function snow(options) {

        if (!(this instanceof snow)) return new snow(options);

        if (!_initOptions.call(this, options)) {
            throw new Error("Param error");
        }

        _initCanvas.call(this);
    }

    function _initOptions(options) {
        var defaultOptions = {
            selector: null,
            canvas: null,
            num: 20,
            height: null,
            width: null
        };

        for (var i in defaultOptions) {
            if (defaultOptions.hasOwnProperty(i)) {
                if (i in options) {
                    this[i] = options[i];
                } else {
                    this[i] = defaultOptions[i];
                }
            }
        }

        if (!(this.selector || this.canvas) || !this.height || !this.width) return false;

        this.snows = [];

        this.rAF;
        this.cancel = false;

        return true;
    }

    function _initCanvas() {

        var canvas, container;

        if (this.canvas) {
            canvas = document.querySelector(this.canvas);
        } else if (this.selector) {
            var container = document.querySelector(this.selector);
            if (!container) {
                throw new Error("Can't find container with selector " + this.selector);
            }
            canvas = document.createElement('canvas');
            container.appendChild(canvas);
        }

        this.canvas = canvas;
        if (!this.canvas) {
            throw new Error("canvas element is not initilized");
        }
        this.ctx = this.canvas.getContext("2d");
        if (!this.ctx) {
            throw new Error("might no support canvas");
        }

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        // 雪点属性
        for (var i = 0, l = this.num; i < l; i++) {
            this.snows.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                r: Math.random() * 4 + 1,
                d: Math.random() * this.num
            });
        }
    }

    snow.prototype.start = function() {
        this.cancel = false;
        var func = _draw.call(this);
        this.rAF = requestAnimationFrame(func);
    }

    snow.prototype.stop = function() {
        this.cancel = true;
        cancelAnimationFrame(this.raf);
        setTimeout(function() {
            this.ctx.clearRect(0, 0, this.width, this.height);
        }.bind(this), 50);
    }

    function _draw() {
        var position, position2,
            angle = 0;

        return (function _inner() {

            this.ctx.clearRect(0, 0, this.width, this.height);

            this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            this.ctx.beginPath();

            for (var i = 0; i < this.num; i++) {
                position = this.snows[i];
                this.ctx.moveTo(position.x, position.y);
                this.ctx.arc(position.x, position.y, position.r, 0, Math.PI * 2, true);
            }
            this.ctx.fill();
            update.call(this);

            function update() {
                angle += 0.01;
                
                for (var i = 0; i < this.num; i++) {
                    position2 = this.snows[i];
                    position2.y += Math.cos(angle + position2.d) + 1 + position2.r / 2;
                    position2.x += Math.sin(angle) * 2;

                    if (position2.x > this.width + 5 || position2.x < -5 || position2.y > this.height) {
                        if (i % 3 > 0) {
                            this.snows[i] = {
                                x: Math.random() * this.width,
                                y: -10,
                                r: position2.r,
                                d: position2.d
                            };
                        } else {
                            if (Math.sin(angle) > 0) {
                                this.snows[i] = {
                                    x: -5,
                                    y: Math.random() * this.height,
                                    r: position2.r,
                                    d: position2.d
                                };
                            } else {
                                this.snows[i] = {
                                    x: this.width + 5,
                                    y: Math.random() * this.height,
                                    r: position2.r,
                                    d: position2.d
                                };
                            }
                        }
                    }
                }
                if (!this.cancel) {
                    requestAnimationFrame(_inner.bind(this));
                }
            }
        }).bind(this);
    }
    
    // polyfill for requestAnimationFrame
    ;(function() {
        var prefix = ['ms', 'moz', 'webkit', 'o'];
        for (var i = 0, l = prefix.length; i < l && !window.requestAnimationFrame; i++) {
            window.requestAnimationFrame = window[prefix[i] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[prefix[i] + 'CancelAnimationFrame'] || window[prefix[i] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback) {

                if (!(typeof callback === 'function')) return;

                return window.setTimeout(function() {
                    callback();
                }, 100 / 6);
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    })();

    return snow;
});
