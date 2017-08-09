(function (window) {
    window.game = window.game || {}

    function Hamster(){
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
            [720, 0, 120, 119, 0, 60, 60]
        ],
        animations:{
            jump:{
                frames:[0, 1, 2, 3, 4, 5, 6],
                next: "jump",
                speed: 0.1
            },
            fall:{
                frames: [3],
                next: "fall",
                speed: 0.1
            }
        }
    }



    Hamster._SpriteSheet = new createjs.SpriteSheet(data);

    var p = Hamster.prototype = new createjs.Sprite(Hamster._SpriteSheet, 'jump');

    p.Sprite_initialize = p.initialize;

    p.FALL_COMPLETE = 'fall complete';

    p.shouldDie = false;
    p.speed = 500;
    p.nextY = null;

    p.initialize = function () {
        this.Sprite_initialize(Hamster._SpriteSheet);
        this.paused = false;
        this.regX = this.getBounds().width / 2;
        this.regY = this.getBounds().height / 2;
        this.x = canvas.width / 2;
        this.y = canvas.width / 2;
    }

    p.goDie = function () {
        this.gotoAndPlay("fall");
        this.rotation = 0;
        createjs.Tween.get(this).to({y:canvas.height}, 1000).call(this.handleComplete);
        this.shouldDie = true;

    }

    p.handleComplete = function() {
        this.stop();
        this.dispatchEvent(this.FALL_COMPLETE);
    }

    p.reset = function () {
        this.shouldDie = false;
        this.gotoAndStop('fly');
        this.regX = this.getBounds().width / 2;
        this.regY = this.getBounds().height / 2;
        this.x = canvas.width / 2;
        this.y = canvas.width / 2;
    }

    window.Hamster = Hamster;
}(window));

