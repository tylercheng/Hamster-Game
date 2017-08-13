(function (window) {

    window.game = window.game || {}

    function GameWin() {
        this.initialize();
    }

    var p = GameWin.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
        this.addBG();
        this.addTitle();
        this.addButton();
        this.addGamewin();
        createjs.Sound.stop();
        createjs.Sound.play("gameWinSound");
    }


    p.addBG = function () {
        var bg = new createjs.Bitmap(window.ui.queue.getResult('guideBg'));
        bg.width = canvas.width;
        bg.height = canvas.height;
        this.addChild(bg);
    }

    p.addTitle = function () {
        var text = "Your score: " + game.score;
        this.titleTxt = new createjs.Text(text, 'bold 42px cursive', '#fff');
        this.titleTxt.x = canvas.width / 2;
        this.titleTxt.y = 140;
        this.titleTxt.textAlign = 'center';
        this.addChild(this.titleTxt);
    }
    p.addGamewin = function () {
        var gw = new createjs.Bitmap(window.ui.queue.getResult('gameWin'));
        gw.x = 190;
        gw.y = 170;
        this.addChild(gw);
    }
    p.addButton = function () {
        var btn, event;
        btn = new ui.SimpleButton('> Back to Main Menu <');
        btn.on('click', this.mainMenu, this);
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 2;
        btn.y = 450;
        btn.setButton({ upColor: 'FF0000', color: '#99CC00', borderColor: '#000', overColor: '#900' });
        this.addChild(btn);

        btn = new ui.SimpleButton('> Play again <');
        btn.on('click', this.playGame, this);
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 2;
        btn.y = 520;
        btn.setButton({ upColor: 'FF0000', color: '#99CC00', borderColor: '#000', overColor: '#900' });
        this.addChild(btn);
    }

    p.mainMenu = function (e) {
        this.dispatchEvent(game.GameStateEvents.MAIN_MENU);
    }
    p.playGame = function (e) {
        this.dispatchEvent(game.GameStateEvents.GAME);
    }

    window.game.GameWin = GameWin;

}(window));