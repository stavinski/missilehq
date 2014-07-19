(function (global) {
    "use strict";
    
    var currentState,
        nextState;
    
    function checkChangeState() {
        if (nextState !== states.NO_CHANGE) {
            switch (nextState) {
                case states.START:
                    currentState = new StartGameState();
                    break;
                case states.RUNNING:
                    currentState = new RunningGameState();
                    break;
                case states.GAME_OVER:
                    currentState = new GameoverGameState();
                    break;
            }
                    
            nextState = states.NO_CHANGE;        
        }
    }
    
    var game = {
        initialize: function () { 
            var ctx = Canvas.initialize(640, 320);
            currentState = null;
            nextState = states.RUNNING;
                        
            Canvas.animate(function (ts) {
                checkChangeState();
                              
                currentState.update(ts);
                currentState.render(ctx);
            });
        }
    };
            
    var states = {
        NO_CHANGE: 0,
        START: 1,
        RUNNING: 2,
        GAME_OVER: 3
    };
    
    global.Game = game;
    global.GameStates = states; 
}(window));