(function (window) {

    window.game = window.game || {}

    function Scoreboard() {
        this.initialize();
    }

    var data = {
        images:["image/numbers.png"],
        frames:[
            [1, 1, 53, 51],
            [56, 1, 50, 53],
            [111, 1, 53, 51],
            [166, 1, 53, 51],
            [221, 1, 53, 51],
            [276, 1, 53, 51],
            [331, 1, 53, 51],
            [386, 1, 53, 51],
            [441, 1, 53, 51],
            [496, 1, 53, 51]
        ],
        animations:{
            0: {frames: [0], speed: 1},
            1: {frames: [1], speed: 1},
            2: {frames: [2], speed: 1},
            3: {frames: [3], speed: 1},
            4: {frames: [4], speed: 1},
            5: {frames: [5], speed: 1},
            6: {frames: [6], speed: 1},
            7: {frames: [7], speed: 1},
            8: {frames: [8], speed: 1},
            9: {frames: [9], speed: 1}
        }
    }


    var p = Scoreboard.prototype = new createjs.Container();

    p.scoreTxt;
    p.score = 0;

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
        this.regX = this.width / 2 ;
        this.regY = this.height / 2;
        this.x = canvas.width / 2 - 80;
        this.y = canvas.width / 6;
        this.updateScore(0);
    }
    p.updateScore = function (count) {
        this.removeAllChildren();
        this.score = count;
        var spritesheet = new createjs.SpriteSheet(data);
        this.scoreTxt = new createjs.BitmapText(this.score.toString(), spritesheet);
        this.addChild(this.scoreTxt);
    }

    p.getScore = function () {
        return this.score;
    }

    window.game.Scoreboard = Scoreboard;

}(window));