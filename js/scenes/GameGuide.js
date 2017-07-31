(function (window) {

    window.game = window.game || {}

    function GameGuide() {
        this.initialize();
    }

    var p = GameGuide.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.titleTxt = null;
    p.count = 0;

    p.initialize = function () {
        this.Container_initialize();
        this.addBG();
        this.addTitle();
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
    p.addButton = function () {
        var btn, event;
        btn = new ui.SimpleButton('> Back to Main Menu <');
        btn.on('click',this.mainMenu,this);
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 2;
        btn.y = 400;
        btn.setButton({ upColor: 'FF0000', color: '#99CC00', borderColor: '#000', overColor: '#900' });
        this.addChild(btn);
    }
    p.mainMenu = function (e) {
        this.dispatchEvent(game.GameStateEvents.MAIN_MENU);
    }
    p.run = function () {
        this.titleTxt.alpha = Math.cos(this.count++ * 0.1) * 0.4 + 0.6;
    }
    window.game.GameGuide = GameGuide;

}(window));