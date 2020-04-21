export default function createKeyboardListener(document) {

    const state = {
        observers: []
    }

    function subscribe(update) {
        state.observers.push(update);
    }

    function notifyAll(command) {
        for(let obs of state.observers) {
            obs(command);
        }
    }

    document.addEventListener('keydown', handleKeyDown);

    function handleKeyDown(event) {
        const keyPressed = event.key;
        const command = {
            playerId: 'player1',
            keyPressed
        }

        notifyAll(command);
    }

    return {
        subscribe
    }
}