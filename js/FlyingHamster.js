(function (window) {

    window.game = window.game || {}

    function FlyingHamster() {
        this.initialize();
    }

    var p = FlyingHamster.prototype;

    p.currentGameStateFunction;
    p.currentGameState;
    p.currentScene;

    p.initialize = function () {
        canvas = document.getElementById('canvas');
        stage = new createjs.Stage(canvas);
        createjs.Ticker.setFPS(60);
        createjs.Ticker.on('tick', this.onTick, this);
        this.changeState(game.GameStates.MAIN_MENU);
    }

    p.changeState = function (state) {
        this.currentGameState = state;
        switch (this.currentGameState) {
            case game.GameStates.MAIN_MENU:
                this.currentGameStateFunction = this.gameStateMainMenu;
                break;
            case game.GameStates.GAME:
                this.currentGameStateFunction = this.gameStateGame;
                break;
            case game.GameStates.RUN_SCENE:
                this.currentGameStateFunction = this.gameStateRunScene;
                break;
            case game.GameStates.GAME_OVER:
                this.currentGameStateFunction = this.gameStateGameOver;
                break;
            case game.GameStates.GAME_GUIDE:
                this.currentGameStateFunction = this.gameStateGameGuide;
                break;
            case game.GameStates.GAME_WIN:
                this.currentGameStateFunction = this.gameStateGameWin();
        }
    }

    p.onStateEvent = function (e, data) {
        this.changeState(data.state);
    }

    p.disposeCurrentScene = function () {
        if (this.currentScene != null) {
            stage.removeChild(this.currentScene);
            if(this.currentScene.dispose){
                // this.currentScene.dispose();
            }
            this.currentScene = null;
        }
    }

    p.gameStateMainMenu = function () {
        var scene = new game.GameMenu();
        scene.on(game.GameStateEvents.GAME, this.onStateEvent, this, false, { state: game.GameStates.GAME });
        scene.on(game.GameStateEvents.GAME_GUIDE, this.onStateEvent, this, false, { state: game.GameStates.GAME_GUIDE });
        stage.addChild(scene);
        this.disposeCurrentScene();
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }

    p.gameStateGameGuide = function () {
        var scene = new game.GameGuide();
        stage.addChild(scene);
        scene.on(game.GameStateEvents.MAIN_MENU, this.onStateEvent, this, false, { state: game.GameStates.MAIN_MENU });
        this.disposeCurrentScene();
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }

    p.gameStateGame = function () {
        var scene = new game.Game();
        scene.on(game.GameStateEvents.GAME_OVER, this.onStateEvent, this, false, { state: game.GameStates.GAME_OVER });
        scene.on(game.GameStateEvents.GAME_WIN, this.onStateEvent, this, false, { state: game.GameStates.GAME_WIN });
        scene.on(game.GameStateEvents.MAIN_MENU, this.onStateEvent, this, false, { state: game.GameStates.MAIN_MENU });
        scene.on(game.GameStateEvents.GAME_GUIDE, this.onStateEvent, this, false, { state: game.GameStates.GAME_GUIDE });
        stage.addChild(scene);
        this.disposeCurrentScene();
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }

    p.gameStateGameOver = function () {
        var scene = new game.GameOver();
        stage.addChild(scene);
        scene.on(game.GameStateEvents.MAIN_MENU, this.onStateEvent, this, false, {state:game.GameStates.MAIN_MENU});
        scene.on(game.GameStateEvents.GAME, this.onStateEvent, this, false, {state:game.GameStates.GAME});
        this.disposeCurrentScene();
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }

    p.gameStateGameWin = function () {
        var scene = new game.GameWin();
        stage.addChild(scene);
        scene.on(game.GameStateEvents.MAIN_MENU, this.onStateEvent, this, false, {state:game.GameStates.MAIN_MENU});
        scene.on(game.GameStateEvents.GAME, this.onStateEvent, this, false, {state:game.GameStates.GAME});
        this.disposeCurrentScene();
        this.currentScene = scene;
        this.changeState(game.GameStates.RUN_SCENE);
    }

    p.gameStateRunScene = function (tickEvent) {
        if (this.currentScene.run) {
            this.currentScene.run(tickEvent);
        }
    }

    p.run = function (e) {
        if (this.currentGameStateFunction != null) {
            this.currentGameStateFunction(e);
        }
    }

    p.onTick = function (e) {
        this.run(e);
        stage.update();
    }

    window.game.FlyingHamster = FlyingHamster;

}(window));