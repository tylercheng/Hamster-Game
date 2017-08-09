(function (window) {
    window.game = window.game || {}

    Obstacle = function () {
        this.initialize();
    }

    var data = {
        images:["image/obstacle.png"],
        frames:[
            [0, 0, 100, 400],
            [0, 0, 100, 400]
        ],
        animations:{
            obstacle:[0, 1]
        }
    }

    Obstacle._SpriteSheet = new createjs.SpriteSheet(data);
    var p = Obstacle.prototype = new createjs.Sprite(Obstacle._SpriteSheet, 'obstacle');

    p.Sprite_initialize = p.initialize;

    p.speed = 150;
    p.nextX = 0;
    p.shouldCount = false;

    p.initialize = function () {
        this.Sprite_initialize(Obstacle._SpriteSheet);
        //this.nextX = this.getBounds().width + canvas.width;

    }

    p.pass = function () {
        this.shouldCount = true;
    }

    p.reset = function () {
        this.shouldCount = false;
    }

    window.Obstacle = Obstacle;

}(window));