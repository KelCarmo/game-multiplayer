export default function createGame() {
    const stateGame = {
        players: {
            // 'player1': {x: 1, y: 1},
            // 'player2': {x: 9, y: 9}
        },
        fruits: {
            // 'fruit1': {x: 3, y: 1}
        },
        screen: {
            width: 10,
            height: 10
        }
    }

    function addPlayer(command) {
        const playerId = command.playerId;
        const x = command.x;
        const y = command.y;

        stateGame.players[playerId] = {
            x,
            y
        }
    }

    function removePlayer(command) {
        const playerId = command.playerId;

        delete stateGame.players[playerId];
    }

    function addFruit(command) {
        const fruitId = command.fruitId;
        const x = command.x;
        const y = command.y;

        stateGame.fruits[fruitId] = {
            x,
            y
        }
    }

    function removeFruit(command) {
        const fruitId = command.fruitId;

        delete stateGame.fruits[fruitId];
    }

    function movePlayer(command) {

        console.log(`Moved ${command.playerId} for ${command.keyPressed}`)
        const player = stateGame.players[command.playerId];

        function ArrowUp(player) {
            if(player.y > 0) player.y = player.y - 1; 
            return;
        }

        function ArrowRight(player) {
            if(player.x < stateGame.screen.width-1) player.x = player.x + 1; 
            return;
        }

        function ArrowLeft(player) {
            if(player.x > 0) player.x = player.x - 1; 
            return;
        }

        function ArrowDown(player) {
            if(player.y < stateGame.screen.height-1) player.y = player.y + 1; 
            return;
        }

        const inputs = {
            ArrowUp,
            ArrowRight,
            ArrowLeft,
            ArrowDown
        }

        function verifyCollision(player) {
            for(let fruitId in stateGame.fruits) {
                const fruit = stateGame.fruits[fruitId];
                if(player.x === fruit.x && player.y === fruit.y){
                    console.log('Achei a frutinha!!', fruit);
                    return {fruitId: fruitId};
                }
            }
            
            return undefined;
        }

        if(player && typeof inputs[command.keyPressed] === 'function') {
            inputs[command.keyPressed](player);
            let fruit = verifyCollision(player);
            if(fruit) removeFruit(fruit); 
        }

        return;
        
    }

    return {
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        stateGame
    }
}