(function (window) {

    window.game = window.game || {}

    function LifeBox(numLives) {
        this.numLives = numLives;
        this.initialize();
    }

    var data = {
        images:["image/heart.png"],
        frames:[
            [0, 0, 50, 47]
        ],
        animations:{
            life: {frames: [0], speed: 1},
        }
    }

    var p = LifeBox.prototype = new createjs.Container();

    p.numLives = null;

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
        this.buildSprites();
        this.positionBox();
    }
    p.buildSprites = function () {
        var i, life;
        var xPos = 0;
        for (i = 0; i < this.numLives; i++) {
            var spritesheet = new createjs.SpriteSheet(data);
            life = new createjs.Sprite(spritesheet, 'life');
            life.paused = true;
            life.x = xPos;
            this.addChild(life);
            xPos += life.getBounds().width;
        }
    }
    p.positionBox = function () {
        this.x = canvas.width - this.getBounds().width;
        this.y = canvas.height - this.getBounds().height;
    }
    p.removeLife = function () {
        var life = this.getChildAt(0);
        life.on('animationend', function (e) {
            e.target.stop();
            this.removeChild(e.target);
        }, this);
        life.play();
    }

    p.reset = function () {
        this.numLives = 3;
        this.buildSprites();
        this.positionBox();
    }

    window.game.LifeBox = LifeBox;

}(window));