canvas-snow.js
==============

A light (~1.4k gzip), 60FPS ,dependence free snow falling effect made by canvas. Support IE9+, Android 2.3+.

## Live DEMO

[Click here](http://xiaoyuze.com/demo/canvas-snow.js/demo/demo.html)

## Quick start

In AMD:

    require(['snow'],function(snow) {
        var snow = new Snow({
            // selector: '#canvas',
            canvas : "#canvas",
            num: 10,
            width:1000,
            height:500
        });

        snow.start();
    });

Otherwise:
    
The `snow` function will be exploded to global environment, 
so you can use it directly.

    var snow = new Snow({
        // selector: '#canvas',
        canvas : "#canvas",
        num: 10,
        width:1000,
        height:500
    });

    Snow.start();

## Parameters ##

`Snow` function accept one parameter `options`

    options : {
        /**
        *   The container's selector.
        *   We will make a `canvas` element inside your container
        */
        selector: null,

        /**
        *   Your canvas's selector.
        *   If you do not set the `selector` parameter, because you already have a canvas element,
        *   you need to set this parameter instead.
        */
        canvas: null,

        /**
        *   The snows' number.
        *   Decide how many blocks of snow will be shown in the canvas.
        */
        num: 20,

        /**
        *   Your canvas's height. Unit in pixel.
        */
        height: null,

        /**
        *   Your canvas's width. Unit in pixel.
        */
        width: null

## METHOD

### start()

Start falling snow.

### stop()

Stop falling snow.
If you want to remove the snow effect, when you're changing a page in your SPA or some other reasons,
please remember to call this function first, because it will kill the timer of all the animation.

If not, something you don't want to see is going to happen...
Like the timer will keep running, or throw some weird error...kinda stuff.


## NOTICE

Code modified from http://thecodeplayer.com/walkthrough/html5-canvas-snow-effect.
Thanks to the original author.


