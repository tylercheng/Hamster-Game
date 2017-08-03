(function (window) {

    window.game = window.game || {}

    const SPACE_KEY = 32;
    const levelOne = 10;
    const levelTwo = 20;
    const levelThree = 30;

    function Game() {
        this.initialize();
    }

    var p = Game.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;
    p.msgTxt = null;
    p.obstacleContainer;
    p.level = 1;
    p.die = false;
    p.obstacleCount = 0;
    p.starsCount = 0;
    p.obstacleUp;
    p.obstacleDown;
    p.hamster;
    p.jumpStart = false;
    p.rotationDelta;


    const gap = 250;
    const masterPipeDelay = 78; // delay between pipes
    p.pipeDelay = masterPipeDelay; //counter used to monitor delay
    const jumpHeight = 120;
    const jumpTime = 266;

    p.initialize = () => {
        this.Container_initialize();
        this.addBG();
        this.addButton();
        this.obstacleContainer = new createjs.Container();
        this.addChild(this.obstacleContainer);
        this.addHamster();
    }
    p.addBG = () => {
        // var bg = new RollingBackground(window.ui.queue.getResult('gameBg'));
        var bg = new createjs.Bitmap(window.ui.queue.getResult('gameBg'));
        bg.width = canvas.width;
        bg.scaleY = 1.2;
        this.addChild(bg);
    }

    p.addButton = () => {
        var btn;
        btn = new ui.SimpleButton('Main Menu');
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 4;
        btn.y = 550;
        btn.setButton({ upColor: 'FF0000', color: '#99CC00', borderColor: '#000', overColor: '#900' });
        btn.on('click', this.mainMenu, this);
        this.addChild(btn);
        btn = new ui.SimpleButton('View Controls');
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 4 * 3;
        btn.y = 550;
        btn.setButton({ upColor: 'FF0000', color: '#99CC00', borderColor: '#000', overColor: '#900' });
        btn.on('click', this.gameGuide, this);
        this.addChild(btn);
    }

    p.addHamster = () => {
        this.hamster = new FlyingHamster();
        this.hamster.x = canvas.width / 4;
        this.hamster.y = canvas.width / 3;
        this.hamster.rotation = 0;
        this.addChild(this.hamster);
        document.onkeydown = this.handleKeyDown;
    }

    p.handleKeyDown =  (e) => {
        e = !e ? window.event : e;
        if (e.keyCode == SPACE_KEY) {
            this.handleJumpStart();
        }
    }

    p.handleJumpStart = () => {
        if (!this.die) {
            createjs.Tween.removeTweens(this.hamster);
            this.hamster.gotoAndPlay("jump");
            this.jumpStart = true;
        }
    }

    p.mainMenu = () => {
        this.dispatchEvent(game.GameStateEvents.MAIN_MENU);
    }
    p.gameGuide = () => {
        this.dispatchEvent(game.GameStateEvents.GAME_GUIDE);
    }

    p.update = () => {
        if (!this.die) {
            if (this.pipeDelay == 0) {
                this.obstacleDown = new createjs.Bitmap(window.ui.queue.getResult("obstacle"));
                this.obstacleDown.x = canvas.width + 600
                this.obstacleDown.y = (canvas.height - gap * 2) * Math.random() + gap * 1.5
                this.obstacleContainer.addChild(this.obstacleDown);
                // createjs.Tween.get(pipe).to({x:0 - pipe.image.width}, 5100)
                this.obstacleUp = new createjs.Bitmap(window.ui.queue.getResult("obstacle"));
                this.obstacleUp.scaleX = -1
                this.obstacleUp.rotation = 180
                this.obstacleUp.x = this.obstacleDown.x //+ pipe.image.width
                this.obstacleUp.y = this.obstacleDown.y - gap
                // createjs.Tween.get(pipe2).to({x:0 - pipe.image.width}, 5100)
                this.obstacleContainer.addChild(this.obstacleUp);
                this.pipeDelay = masterPipeDelay
            } else {
                this.pipeDelay = this.pipeDelay - 1
            }
            for (var i = 0; i < this.obstacleContainer.getNumChildren(); i++) {
                var obstacle = this.obstacleContainer.getChildAt(i);
                if (obstacle) {
                    if (true) { // tried replacing true with this, but it's off: pipe.x < bird.x + 92 && pipe.x > bird.x
                        var collision = ndgmr.checkRectCollision(obstacle, this.hamster, 1, true)
                        if (collision) {
                            if (collision.width > 8 && collision.height > 8) {
                                this.die = true;
                            }
                        }
                    }
                    obstacle.x = (obstacle.x - 60 * 300);
                    if (obstacle.x <= 338 && obstacle.rotation == 0 && obstacle.name != "counted") {
                        obstacle.name = "counted" //using the pipe name to count pipes
                    }
                    if (obstacle.x + obstacle.image.width <= -obstacle.w) {
                        this.obstacleContainer.removeChild(obstacle)
                    }
                }
            }
        }

        if (this.jumpStart == true) {
            this.jumpStart = false
            if (this.hamster.rotation < 0) {
                this.rotationDelta = (-this.hamster.rotation - 20)/5
            } else {
                this.rotationDelta = (this.hamster.rotation + 20)/5
            }
            if (this.hamster.y < -200) {
                this.hamster.y = -200
            }
            createjs.Tween.get(this.hamster)
                .to({y:this.hamster.y - this.rotationDelta, rotation: -20}, this.rotationDelta, createjs.Ease.linear) //rotate to jump position and jump bird
                .to({y:this.hamster.y - jumpHeight, rotation: -20}, jumpTime - this.rotationDelta, createjs.Ease.quadOut) //rotate to jump position and jump bird
                .to({y:this.hamster.y}, jumpTime, createjs.Ease.quadIn) //reverse jump for smooth arch
                .to({y:this.hamster.y + 200, rotation: 90}, (380)/1.5, createjs.Ease.linear) //rotate back/
                .to({y:canvas.height - 30}, (canvas.height - (this.hamster.y+200))/1.5, createjs.Ease.linear); //drop to the bedrock
        }
    }

    p.render = () => {

    }

    p.checkGame = () => {
        if (this.die) {
            this.dispatchEvent(game.GameStateEvents.GAME_OVER);
        }
        if(this.level == 1 && this.obstacleCount == levelOne) {

        }
        if(this.level == 2 && this.obstacleCount == levelTwo) {

        }
        if(this.level == 3 && this.obstacleCount == levelThree) {

        }
    }

    p.run = () => {
        this.update();
        this.render();
        this.checkGame();
    }

    window.game.Game = Game;

}(window));