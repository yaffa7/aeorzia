
export default class Scene {
    name;
    enemies = []
    heroes = []
    objects = []
    background_image;
    active_actor;
    active_index = 0
    setStateCallbacks = [];
    sceneManager;
    isBattleScene = false
    isDefeatScene = false

    constructor(heroes = [], sceneManager) {
        this.heroes = heroes
        this.sceneManager = sceneManager
    }

    // if called from react component, then component will recieve state updates
    registerCallback(callback) {
        this.setStateCallbacks.push(callback)
    }

    invokeCallbacks() {
        this.setStateCallbacks.forEach(cb =>  {
            cb()   
        });
    }
}