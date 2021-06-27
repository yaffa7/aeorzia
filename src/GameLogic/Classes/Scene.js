
export default class Scene {
    gameStore = window.store
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
}