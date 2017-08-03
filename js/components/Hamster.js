(function (window) {
    FlyingHamster = function () {
        this.initialize();
    }

    var data = {
        images:["image/hamsters.png"],
        frames:[
            [0, 0, 120, 119, 0, 60, 60],
            [120, 0, 120, 119, 0, 60, 60],
            [240, 0, 120, 119, 0, 60, 60],
            [360, 0, 120, 119, 0, 60, 60],
            [480, 0, 120, 119, 0, 60, 60],
            [600, 0, 120, 119, 0, 60, 60],
            [720, 0, 120, 119, 0, 60, 60],
            [840, 0, 120, 119, 0, 60, 60],
            [960, 0, 120, 119, 0, 60, 60],
            [1080, 0, 120, 119, 0, 60, 60]
        ],
        animations:{
            fly:{
                frames:[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                speed: 0.1
            },
            dive:{
                frames: [3],
                speed: 0.1
            }
        }
    }

    FlyingHamster._SpriteSheet = new createjs.SpriteSheet(data);
    var FlyingHamster_p = FlyingHamster.prototype = new createjs.Sprite(FlyingHamster._SpriteSheet, 'fly');
    FlyingHamster_p.Sprite_initialize = FlyingHamster_p.initialize;
    FlyingHamster_p.initialize = function () {
        this.Sprite_initialize(FlyingHamster._SpriteSheet);
        this.paused = false;
    }
    window.FlyingHamster = FlyingHamster;
}(window));

