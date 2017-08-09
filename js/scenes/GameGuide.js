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
        this.addSpacebar();
        this.addFinger();
    }
    p.addBG = function () {
        //var bg = new createjs.Shape();
        //bg.graphics.beginFill('#006633').drawRect(0, 0, canvas.width, canvas.height);
        //this.addChild(bg);

        var bg = new createjs.Bitmap(window.ui.queue.getResult('guideBg'));
        bg.width = canvas.width;
        bg.height = canvas.height;
        this.addChild(bg);
    }
    p.addTitle = function () {
        this.titleTxt = new createjs.Text("WELCOME!", 'bold 42px cursive', '#000');
        this.titleTxt.x = canvas.width / 2;
        this.titleTxt.y = 100;
        this.titleTxt.textAlign = 'center';
        this.addChild(this.titleTxt);

        this.titleTxt = new createjs.Text("Your task is to help Mr. Hamster fly accross obstacles!", 'bold 24px cursive', '#000');
        this.titleTxt.x = canvas.width / 2;
        this.titleTxt.y = 170;
        this.titleTxt.textAlign = 'center';
        this.addChild(this.titleTxt);

        this.titleTxt = new createjs.Text("Press [SPACE key] to move Hamster up a little bit", 'bold 24px cursive', '#000');
        this.titleTxt.x = canvas.width / 2;
        this.titleTxt.y = 210;
        this.titleTxt.textAlign = 'center';
        this.addChild(this.titleTxt);
    }
    p.addSpacebar = function () {
        var sb = new createjs.Bitmap(window.ui.queue.getResult('guideSpacebar'));
        sb.x = 240;
        sb.y = 300;
        this.addChild(sb);
    }
    p.addFinger = function () {
        var finger = new createjs.Bitmap(window.ui.queue.getResult('guideFinger'));
        finger.x = 500;
        finger.y = 320;
        this.addChild(finger);
    }
    p.addButton = function () {
        var btn, event;
        btn = new ui.SimpleButton('> Back to Main Menu <');
        btn.on('click',this.mainMenu,this);
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 2;
        btn.y = 500;
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