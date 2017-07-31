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
        this.addOrbs();
        this.addButton();
    }
    p.addBG = function () {
        var bg = new createjs.Shape();
        bg.graphics.beginFill('#006633').drawRect(0, 0, canvas.width, canvas.height);
        this.addChild(bg);
        //var bitmap = new createjs.bitmap("jungle-bg.jpg");
        //this.addChild(bitmap);
    }
    p.addTitle = function () {
        this.titleTxt = new createjs.Text("Mr. Hamster's Adventure!", 'bold 46px Arial', '#000');
        this.titleTxt.x = canvas.width / 2;
        this.titleTxt.y = 200;
        this.titleTxt.textAlign = 'center';
        this.addChild(this.titleTxt);
    }
    p.addOrbs = function () {
        //var i, orb;
        //var orbContainer = new createjs.Container();
        //var numOrbs = 5;
        //var orbSize = 20;
        //var orbPadding = 10;
        //var orbsPosition = 300;
        //for (i = 0; i < numOrbs; i++) {
        //    orb = new PulsingOrb('#99CC00', orbSize);
        //    orb.x = i * ((orbSize * 2) + orbPadding);
        //    orbContainer.addChild(orb);
        //}
        //orbContainer.x = orbContainer.y = orbsPosition;
        //this.addChild(orbContainer);
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