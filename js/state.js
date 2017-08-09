(function () {

    window.game = window.game || {};

    var GameStates = {
        MAIN_MENU:0,
        RUN_SCENE: 1,
        GAME_GUIDE: 2,
        GAME_WIN:3,
        GAME:10,
        GAME_OVER: 20
    }

    var GameStateEvents = {
        MAIN_MENU:'main menu event',
        GAME_OVER:'game over event',
        GAME_WIN:'game win event',
        GAME:'game event',
        GAME_GUIDE: 'game guide event'
    }

    window.game.GameStates = GameStates;
    window.game.GameStateEvents = GameStateEvents;

}());
