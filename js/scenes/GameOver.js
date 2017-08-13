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
        this.addTitle();
        this.addButton();
        this.addGameover();
        createjs.Sound.stop();
        createjs.Sound.play("gameOverSound");
    }

    p.addBG = function () {
        var bg = new createjs.Shape();
        bg.graphics.beginFill('#000').drawRect(0, 0, canvas.width, canvas.height);
        this.addChild(bg);
    }
    p.addTitle = function () {
        var text = "Your score: " + game.score;
        this.titleTxt = new createjs.Text(text, 'bold 30px cursive', '#fff');
        this.titleTxt.x = canvas.width / 8;
        this.titleTxt.y = 100;
        this.titleTxt.textAlign = 'left';
        this.addChild(this.titleTxt);
    }
    p.addGameover = function () {
        var go = new createjs.Bitmap(window.ui.queue.getResult('gameOver'));
        go.x = 90;
        go.y = 200;
        this.addChild(go);
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
        btn.y = 500;
        btn.setButton({ upColor: 'FF0000', color: '#99CC00', borderColor: '#000', overColor: '#900' });
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