(function (window) {

    window.game = window.game || {}

    const SPACE_KEY = 32;
    const S_KEY = 83;
    const levelOne = 10;
    const levelTwo = 15;
    const levelThree = 20;

    function Game() {
        this.initialize();
    }

    var p = Game.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;
    p.scoreboard = null;
    p.level = 1;
    p.numLives = 3;
    p.lifeBox = null;
    p.menuContainer = null;
    p.isMenuDisplayed = false;

    p.jumpStart = false;
    p.betweenLevels = false;
    p.spaceKeyDown = false;
    p.sKeyDown = false;

    p.hamster = null;
    p.jumpSpeed =  300;
    p.diveSpeed = 200;

    p.obstacleContainer = null;
    p.obstaclesDown = null;
    p.obstaclesUp = null;
    p.obstacleDownPool = null;
    p.obstacleUpPool = null;
    p.gap = 220;

    p.obstacleSpawnWaiter = 3000;
    p.obstacleLastSpawnTime = null;

    p.floor = null;
    p.ceiling = null;
    p.count = 0;
    p.score = 0;

    p.levelUp = null;

    p.initialize = function(){
        this.Container_initialize();
        this.setProperties();
        this.addBG();
        this.buildSprites();
        this.setControl();
        this.setWalls();
        this.addButton();
        this.addLevelUp();
        createjs.Sound.stop();
        createjs.Sound.play("gameInSound");
    }

    p.setProperties = function () {
        this.obstacleDownPool = [];
        this.obstacleUpPool = [];
        this.obstaclesDown = [];
        this.obstaclesUp = [];
        this.betweenLevels = false;
        this.obstacleContainer = new createjs.Container();
        this.levelUp = new createjs.Container();
    }

    p.addBG = function() {
        var bg = new createjs.Bitmap(window.ui.queue.getResult('gameBg'));
        bg.width = canvas.width;
        bg.scaleY = 1.2;
        this.addChild(bg);
    }

    p.addButton = function() {
        var btn;
        this.menuContainer = new createjs.Container();
        btn = new ui.SimpleButton('Main Menu');
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 4;
        btn.y = 550;
        btn.setButton({ upColor: 'FF0000', color: '#99CC00', borderColor: '#000', overColor: '#900' });
        btn.on('click', this.mainMenu, this);
        this.menuContainer.addChild(btn);
        btn = new ui.SimpleButton('View Controls');
        btn.regX = btn.width / 2;
        btn.x = canvas.width / 4 * 3;
        btn.y = 550;
        btn.setButton({ upColor: 'FF0000', color: '#99CC00', borderColor: '#000', overColor: '#900' });
        btn.on('click', this.gameGuide, this);
        this.menuContainer.addChild(btn);
    }

    p.buildSprites = function () {
        this.hamster = new Hamster();
        this.hamster.on(this.hamster.FALL_COMPLETE, this.checkGame, this);
        this.obstacleDownPool = new game.SpritePool(Obstacle, 10);
        this.obstacleUpPool = new game.SpritePool(Obstacle, 10);
        this.scoreboard = new game.Scoreboard();
        this.lifeBox = new game.LifeBox(this.numLives);
        this.addChild(this.scoreboard, this.obstacleContainer, this.hamster, this.lifeBox, this.levelUp);
    }

    p.setWalls = function () {
        this.floor = canvas.height - 50;
        this.ceiling = this.hamster.getBounds().height;
    }

    p.setControl = function () {
        document.onkeydown = (e) => { this.handleKeyDown(e); };
        document.onkeyup = (e) => { this.handleKeyUp(e); };
        //      document.onkeydown = this.handleKeyDown.bind(this);
    }

    p.addLevelUp = function(){
        var highlight = new createjs.Shape();
        highlight.graphics.beginFill("#FFFF66").drawRect(0, 0, 150, 50);

        var txt = new createjs.Text("level up", "bold 35px Arial");
        txt.x = highlight.x = -50;
        txt.y = highlight.y = canvas.width/3;

        this.levelUp.addChild(highlight, txt);

        this.levelUp.visible = false;
    }

    p.handleKeyDown = function(e) {
        e = !e ? window.event : e;
        switch (e.keyCode) {
            case SPACE_KEY:
                this.spaceKeyDown = true;
                break;
            case S_KEY:
                this.showMenu();
                break;
        }
    }

    p.handleKeyUp = function (e) {
        e = !e ? window.event : e;
        switch (e.keyCode) {
            case SPACE_KEY:
                this.spaceKeyDown = false;
                break;
        }
    }

    p.showMenu = function() {
        if(!this.isMenuDisplayed) {
            createjs.Ticker.paused = true;
            this.isMenuDisplayed = true;
            this.addChild(this.menuContainer);
        }
        else {
            createjs.Ticker.paused = false;
            this.isMenuDisplayed = false;
            this.removeChild(this.menuContainer);
        }
    }


    p.updateHamster = function() {
        var nextY = this.hamster.y;
        if (this.spaceKeyDown){
            if(!this.jumpStart) {
                this.jumpStart = true;
            }
            nextY -= this.jumpSpeed * this.delta / 1000 ;
            if (nextY < this.ceiling) {
                nextY = this.ceiling;
            }
        }
        else {
            if(this.jumpStart) {
                nextY += this.diveSpeed * this.delta / 1000;
                if (nextY > this.floor) {
                    nextY = this.floor;
                    this.hamster.shouldDie = true;
                }
            }
        }
        this.hamster.nextY = nextY;
    }


    p.updateObstacles = function() {
        var obstacleDown, obstacleUp, i, velX;
        var len = this.obstaclesDown.length - 1;
        if(!this.hamster.shouldDie) {
            for (i = len; i >= 0; i--) {
                obstacleDown = this.obstaclesDown[i];
                obstacleUp = this.obstaclesUp[i];
                velX = obstacleDown.speed * this.delta / 1000;
                obstacleDown.nextX = obstacleUp.nextX = obstacleDown.x - velX;
                if(obstacleDown.shouldCount && obstacleUp.shouldCount && obstacleDown.x + obstacleDown.getBounds().width <= this.hamster.x){
                    ++this.count;
                    ++this.score;
                    obstacleDown.shouldCount = false;
                    obstacleUp.shouldCount = false;
                   // this.scoreboard.updateScore(this.count);
                }

                if (obstacleDown.nextX < - obstacleDown.getBounds().width) {
                    obstacleDown.reset();
                    obstacleUp.reset();
                    this.obstacleDownPool.returnSprite(obstacleDown);
                    this.obstacleUpPool.returnSprite(obstacleUp);
                    //this.removeChild(obstacleDown);
                    //this.removeChild(obstacleUp);
                    this.obstacleContainer.removeChild(obstacleDown, obstacleUp);
                    this.obstaclesDown.splice(i, 1);
                    this.obstaclesUp.splice(i, 1);
                }
            }
        }
    }

    p.updateScore = function () {
        this.scoreboard.updateScore(this.score);
    }

    p.renderHamster = function () {
        this.hamster.y = this.hamster.nextY;
    }

    p.renderObstacles = function() {
        var obstacleDown, obstacleUp, i;
        var len = this.obstaclesDown.length - 1;
        for (i = len; i >= 0; i--) {
            obstacleDown = this.obstaclesDown[i];
            obstacleUp = this.obstaclesUp[i];
                obstacleDown.x = obstacleDown.nextX;
                obstacleUp.x = obstacleUp.nextX;
        }
    }

    p.checkForObstacleSpawn = function (time) {
        if (time - this.obstacleLastSpawnTime > this.obstacleSpawnWaiter) {
            this.spawnObstacle();
            this.obstacleLastSpawnTime = time;
        }
    }

    p.spawnObstacle = function () {
        if(this.jumpStart) {
            var obstacleDown = this.obstacleDownPool.getSprite();
            var obstacleUp = this.obstacleUpPool.getSprite();
            obstacleUp.rotation = 180;
            obstacleDown.scaleX = -1;
            obstacleDown.x = obstacleUp.x = canvas.width + obstacleDown.getBounds().width;
            obstacleDown.y = Utils.getRandomNumber(canvas.height - obstacleDown.getBounds().height + 50, canvas.height - 120);
            obstacleUp.y = obstacleDown.y - this.gap;
            //this.addChild(obstacleDown, obstacleUp);
            this.obstacleContainer.addChild(obstacleDown, obstacleUp);
            this.obstaclesDown.push(obstacleDown);
            this.obstaclesUp.push(obstacleUp);
        }

    }

    p.mainMenu = function() {
        this.dispatchEvent(game.GameStateEvents.MAIN_MENU);
    }
    p.gameGuide = function() {
        this.dispatchEvent(game.GameStateEvents.GAME_GUIDE);
    }

    p.update = function() {
        this.updateHamster();
        this.updateObstacles();
        this.updateScore();
    }

    p.render = function() {
        this.renderHamster();
        this.renderObstacles();
    }

    p.checkBump = function() {
        var obstacleDown, obstacleUp, i;
        var len = this.obstaclesDown.length - 1;
        for (i = len; i >= 0; i--) {
            obstacleDown = this.obstaclesDown[i];
            obstacleUp = this.obstaclesUp[i];
            if (obstacleDown.x < this.hamster.x + this.hamster.getBounds().width && obstacleDown.x + obstacleDown.getBounds().width > this.hamster.x) {
                var collision1 = ndgmr.checkPixelCollision(this.hamster, obstacleDown);
                var collision2 = ndgmr.checkPixelCollision(this.hamster, obstacleUp);
                if (collision1 || collision2) {
                    this.hamster.shouldDie = true;
                    createjs.Sound.play("bumpSound");
                    break;
                }
                else {
                    obstacleDown.shouldCount = true;
                    obstacleUp.shouldCount = true;
                    break;
                }
            }
        }
    }

    p.checkHamster = function(){
        if (this.hamster.shouldDie) {
            this.numLives--;
            this.hamster.goDie();
            this.lifeBox.removeLife();
            this.betweenLevels = true;
        }
    }

    p.checkGame = function() {
        if (this.numLives > 0) {
            this.obstacleDownPool = new game.SpritePool(Obstacle, 10);
            this.obstacleUpPool = new game.SpritePool(Obstacle, 10);
            this.obstacleContainer.removeAllChildren();
            this.hamster.reset();
            this.obstaclesDown = [];
            this.obstaclesUp = [];
            this.count = 0;
            this.jumpStart = false;
            this.betweenLevels = false;
        }
        else {
            game.score = this.scoreboard.getScore();
            this.dispose();
            this.dispatchEvent(game.GameStateEvents.GAME_OVER);
        }
    }


    p.checkLevel = function () {
        if(this.level == 1 && this.count == levelOne) {
            this.betweenLevels = true;
            this.level = 2;
            this.count = 0;
            this.obstacleSpawnWaiter -= 500;
            this.gap -= 20;
            //this.numLives = 3;
           //this.lifeBox.reset();
            this.showLevelUp();
        }
        if(this.level == 2 && this.count == levelTwo) {
            this.betweenLevels = true;
            this.level = 3;
            this.count = 0;
            this.obstacleSpawnWaiter -= 500;
            this.gap -= 20;
            //this.numLives = 3;
            //this.lifeBox.reset();
            this.showLevelUp();
        }
        if(this.level == 3 && this.count == levelThree) {
            switch(this.numLives){
                case 3:
                    this.score += 40;

                    break;
                case 2:
                    this.score += 20;
                    break;
                case 1:
                    break;
            }
            this.scoreboard.updateScore(this.score);
            game.score = this.scoreboard.getScore();
            this.dispose();
            this.dispatchEvent(game.GameStateEvents.GAME_WIN);
        }

    }


    p.showLevelUp = function () {

        this.levelUp.visible = true;
        this.levelUp.x = -50;
           createjs.Tween.get(this.levelUp, {loop: false})
            .to({x: canvas.width/2 }, 2000, createjs.Ease.bounceOut)
               .to({x: canvas.width}, 2000)
               .call(function () {
                   this.levelUp.visible = false;
                   this.betweenLevels = false;
               }.bind(this))
    }

    p.run = function(tickEvent) {
        this.delta = tickEvent.delta;
        if(!this.isMenuDisplayed) {
            if (!this.betweenLevels) {
                this.update();
                this.render();
                this.checkForObstacleSpawn(tickEvent.time);
                this.checkBump();
                this.checkHamster();
                this.checkLevel();
            }
        }
    }

    p.dispose = function () {
        document.onkeydown = null;
        document.onkeyup = null;
    }

    window.game.Game = Game;

}(window));