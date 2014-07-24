(function (global) {
    "use strict";
    
    var currentState,
        nextState,
        canvas = new Canvas(640, 320);
    
    function checkChangeState() {
        if (nextState !== states.NO_CHANGE) {
            switch (nextState) {
                case states.START:
                    currentState = new StartGameState(game);
                    break;
                case states.RUNNING:
                    currentState = new RunningGameState(game);
                    break;
                case states.END:
                    currentState = new EndGameState(game);
                    break;
            }
                    
            nextState = states.NO_CHANGE;        
        }
    }
    
    var game = {
        initialize: function () {
            canvas.initialize();
            Input.initialize(canvas);
            
            currentState = null;
            nextState = states.RUNNING;
                        
            canvas.animate(function (ts) {
                checkChangeState();
                              
                currentState.update(ts);
                currentState.render(canvas.ctx);
            });
        },
        changeState: function (state) {
            nextState = state;
        },
        canvas: canvas
    };
            
    var states = {
        NO_CHANGE: 0,
        START: 1,
        RUNNING: 2,
        END: 3
    };
    
    global.Game = game;
    global.GameStates = states; 
}(window));