import SCENE_TYPE from '../Constants/SCENE_TYPE'

export default class Scene {
    name;
    enemies = []
    heroes = []
    objects = []
    background_image;
    get actors() {
        return [...this.enemies,...this.heroes]
    }
    SCENE_TYPE;
    constructor(heroes) {
        this.heroes = heroes
    }
}