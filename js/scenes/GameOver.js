(function (window) {

    window.game = window.game || {}

    function GameOver() {
        this.initialize();
    }

    var p = GameOver.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
        this.addBG();
        this.addMessage();
        this.addButton();
    }
    p.addBG = function () {
        var bg = new createjs.Shape();
        bg.graphics.beginFill('#006633').drawRect(0, 0, canvas.width, canvas.height);
        this.addChild(bg);
    }
    p.addMessage = function () {
        this.titleTxt = new createjs.Text("CONGRATULATION!", 'bold 46px Arial', '#99CC00');
        this.titleTxt.x = canvas.width / 2;
        this.titleTxt.y = 150;
        this.titleTxt.textAlign = 'center';
        this.addChild(this.titleTxt);

        this.titleTxt = new createjs.Text("Mr. Hamster Passed All Abstacles!", '34px Arial', '#000');
        this.titleTxt.x = canvas.width / 2;
        this.titleTxt.y = 240;
        this.titleTxt.textAlign = 'center';
        this.addChild(this.titleTxt);
    }
    p.addButton = function () {
        var btn;
        btn = new ui.SimpleButton('Main Menu');
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 2;
        btn.y = 320;
        btn.setButton({ upColor: 'FF0000', color: '#99CC00', borderColor: '#000', overColor: '#900' });
        btn.on('click', this.mainMenu, this);
        this.addChild(btn);
        btn = new ui.SimpleButton('Play Again');
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 2;
        btn.y = 390;
        btn.setButton({ upColor: 'FF0000', color: '#99CC00', borderColor: '#000', overColor: '#900' });
        btn.on('click', this.playGame, this);
        this.addChild(btn);
    }
    p.mainMenu = function (e) {
        this.dispatchEvent(game.GameStateEvents.MAIN_MENU);
    }
    p.playGame = function (e) {
        this.dispatchEvent(game.GameStateEvents.GAME);
    }

    window.game.GameOver = GameOver;

}(window));