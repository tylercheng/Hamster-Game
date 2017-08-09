(function (window) {

    window.game = window.game || {}

    function GameMenu() {
        this.initialize();
    }

    var p = GameMenu.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.titleTxt = null;
    p.count = 0;

    p.initialize = function () {
        this.Container_initialize();
        this.addBG();
        this.addTitle();
        this.addHamster();
        this.addButton();
    }

    p.addBG = function () {
        // var bg = new createjs.Shape();
        // bg.graphics.beginFill('#006633').drawRect(0, 0, canvas.width, canvas.height);
        // this.addChild(bg);
        var bg = new createjs.Bitmap(window.ui.queue.getResult('menuBg'));
        bg.width = canvas.width;
        bg.height = canvas.height;
        this.addChild(bg);

    }
    p.addTitle = function () {
        this.titleTxt = new createjs.Text("Mr. Hamster's Adventure!", 'bold 46px Arial', '#000');
        this.titleTxt.x = canvas.width / 2;
        this.titleTxt.y = canvas.width / 5;
        this.titleTxt.textAlign = 'center';
        this.addChild(this.titleTxt);
    }
    p.addHamster = function () {
        var hamster = new Hamster();
        hamster.x = canvas.width / 2 + hamster.getBounds().width / 2;
        hamster.y = canvas.width / 2.5;
            this.addChild(hamster);
    }
    p.addButton = function () {
        var btn, event;
        btn = new ui.SimpleButton('Play Game');
        btn.on('click',this.playGame,this);
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 2;
        btn.y = 400;
        btn.setButton({ upColor: 'FF0000', color: '#99CC00', borderColor: '#000', overColor: '#900' });
        this.addChild(btn);

        btn = new ui.SimpleButton('View Controls');
        btn.on('click', this.gameGuide, this);
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 2;
        btn.y = 475;
        btn.setButton({ upColor: 'FF0000', color: '#99CC00', borderColor: '#000', overColor: '#900' });
        this.addChild(btn);
    }
    p.playGame = function (e) {
        this.dispatchEvent(game.GameStateEvents.GAME);
    }
    p.gameGuide = function (e) {
        this.dispatchEvent(game.GameStateEvents.GAME_GUIDE);
    }
    p.run = function () {
        this.titleTxt.alpha = Math.cos(this.count++ * 0.1) * 0.4 + 0.6;
    }
    window.game.GameMenu = GameMenu;

}(window));