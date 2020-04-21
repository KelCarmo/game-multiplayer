export default function renderScreen(context, game) {

    context.fillStyle = 'white';
    context.clearRect(0, 0, screen.width, screen.height);

    for(let playerId in game.stateGame.players) {
        const player = game.stateGame.players[playerId];
        context.fillStyle = 'black';
        context.fillRect(player.x, player.y, 1, 1);
    }

    for(let fruitId in game.stateGame.fruits) {
        const fruit = game.stateGame.fruits[fruitId];
        context.fillStyle = 'green';
        context.fillRect(fruit.x, fruit.y, 1, 1);
    }

    requestAnimationFrame(() => {
        renderScreen(context, game);
    });
}