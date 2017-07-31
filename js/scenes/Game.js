(function (window) {

    window.game = window.game || {}

    function Game() {
        this.initialize();
    }

    var p = Game.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
        this.addBG();
        this.addButton();
    }
    p.addBG = function () {
        //var bg = new Image();
        //bg.src = "jungle-bg.jpg";
        //bg.x = 0;
        //bg.y = 0;
        //var bitmap = new createjs.Bitmap(bg);
        //this.addChild(bitmap);

        var bg = new createjs.Shape();
        bg.graphics.beginFill('#006633').drawRect(0, 0, canvas.width, canvas.height);
        this.addChild(bg);
    }
    p.addButton = function () {
        var btn;
        btn = new ui.SimpleButton('Main Menu');
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 4;
        btn.y = 500;
        btn.setButton({ upColor: 'FF0000', color: '#99CC00', borderColor: '#000', overColor: '#900' });
        btn.on('click', this.mainMenu, this);
        this.addChild(btn);
        btn = new ui.SimpleButton('View Controls');
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 4 * 3;
        btn.y = 500;
        btn.setButton({ upColor: 'FF0000', color: '#99CC00', borderColor: '#000', overColor: '#900' });
        btn.on('click', this.gameGuide, this);
        this.addChild(btn);
    }
    p.mainMenu = function (e) {
        this.dispatchEvent(game.GameStateEvents.MAIN_MENU);
    }
    p.gameGuide = function (e) {
        this.dispatchEvent(game.GameStateEvents.GAME_GUIDE);
    }

    window.game.Game = Game;

}(window));