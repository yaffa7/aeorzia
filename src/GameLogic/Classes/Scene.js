
export default class Scene {
    name;
    enemies = []
    heroes = []
    objects = []
    background_image;
    active_actor;
    active_index = 0
    isBattleScene = false
    isDefeatScene = false
    isVictoryScene = false
    constructor() {
    }

}